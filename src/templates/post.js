import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "@mdx-js/react";

const PostTemplate = ({ data }) => {
    const { frontmatter, body } = data.mdx;

    return (
        <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
            <MDXRenderer>{body}</MDXRenderer>
        </main>
    );
};

export const query = graphql`
    query BlogPostById($id: String!) {
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
