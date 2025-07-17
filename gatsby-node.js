const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// ✅ Add a slug field to MDX nodes
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

// ✅ Create pages for each MDX post
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMdx {
                    nodes {
                        id
                        fields {
                            slug
                    }
                }
            }
        }
    `);

    result.data.allMdx.nodes.forEach((node) => {
        createPage({
        path: `/posts${node.fields.slug}`,
        component: path.resolve(`./src/templates/post.js`),
            context: {
                id: node.id,
            },
        });
    });
};
