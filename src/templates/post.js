import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

const PostTemplate = ({ data }) => {
    const { frontmatter, body } = data.mdx

    return (
        <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "720px", margin: "0 auto" }}>
            <h1>{frontmatter.title}</h1>
            <p style={{ fontStyle: "italic", color: "#555" }}>{frontmatter.date}</p>
            <hr />
            <MDXRenderer>{body}</MDXRenderer>
        </main>
    )
}

export const query = graphql`
    query ($id: String!) {
            mdx(id: { eq: $id }) {
                frontmatter {
                    title
                    date(formatString: "MMMM D, YYYY")
                }
            body
        }
    }
`

export default PostTemplate
