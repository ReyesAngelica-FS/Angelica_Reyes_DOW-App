import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx"; 
import { graphql } from "gatsby";

const PostTemplate = ({ data }) => {
    const { frontmatter, body } = data.mdx;

    return (
        <main style={{ padding: "2rem" }}>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
            <MDXRenderer>{body}</MDXRenderer> 
        </main>
    );
};

export const query = graphql`
    query BlogPostByID($id: String!) {
        mdx(id: { eq: $id }) {
            body
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`;

export default PostTemplate;
