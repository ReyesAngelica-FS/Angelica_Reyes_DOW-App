import * as React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { mdx } from "@mdx-js/react"
import { useMDXComponent } from "gatsby-plugin-mdx"

const PostTemplate = ({ data }) => {
    const { frontmatter, body } = data.mdx
    const Content = useMDXComponent(body)

    return (
        <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
            <h1>{frontmatter.title}</h1>
            <p style={{ fontStyle: "italic", color: "#555" }}>{frontmatter.date}</p>
            <hr />
            <article>
                <MDXProvider>
                <Content />
                </MDXProvider>
            </article>
        </main>
    )
}

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
`

export default PostTemplate
