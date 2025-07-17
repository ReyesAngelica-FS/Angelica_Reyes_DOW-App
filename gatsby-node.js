exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    
    const result = await graphql(`
        query {
            allMdx {
                nodes {
                    id
                    slug
                }
            }
        }
    `)
    
    if (result.errors) {
        console.error(result.errors)
        throw result.errors
    }
    
    const posts = result.data.allMdx.nodes
    
    posts.forEach(post => {
        createPage({
            path: `/posts/${post.slug}`,
            component: require.resolve(`./src/templates/post.js`),
            context: { id: post.id },
        })
    })
}
