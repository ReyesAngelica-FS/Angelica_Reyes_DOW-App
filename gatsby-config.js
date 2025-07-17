module.exports = {
  siteMetadata: {
    title: "Angelica's Blog",
    siteUrl: "https://reyesangelica-fs.github.io/Angelica_Reyes_DOW-App", 
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
  ],
}
