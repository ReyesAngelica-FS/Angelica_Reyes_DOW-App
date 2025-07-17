const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Add a `slug` field to each MDX node
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === "Mdx") {
        const slug = createFilePath({ node, getNode, basePath: "posts" });

        createNodeField({
            node,
            name: "slug",
            value: slug,
        });
    }
};

// Create a page for each MDX post using its slug
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMdx {
                nodes {
                    frontmatter {
                        title
                        date
                        slug
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panic("🚨 ERROR loading MDX files", result.errors);
        return;
    }

    const posts = result.data.allMdx.nodes;

    posts.forEach((node) => {
        createPage({
            path: `/posts${node.fields.slug}`, // becomes /posts/slug-name/
            component: path.resolve(`./src/templates/post.js`), // uses your MDX template
            context: {
                id: node.id,
            },
        });
    });
};
