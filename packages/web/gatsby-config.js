require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `UiB Video`,
    description: `Oversikt over UiB videoer publisert på YouTube og Vimeo.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#db3f3d`,
        theme_color: `#db3f3d`,
        display: `minimal-ui`,
        icon: `src/images/uib-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-vimeo`,
      options: {
        clientID: process.env.VIMEO_CLIENTID,
        clientSecret: process.env.VIMEO_ACCESSTOKEN,
        userID: 'uib',
        // searchQuery: 'INSERT_SEARCH_QUERY [OPTIONAL]',
        transformer (video) {
          // Transform the video data [OPTIONAL]
          // i.e. Add extra fields or alter existing field
          video.newField = 'value'
          return video
        }
      },
    },
    {
      resolve: `gatsby-source-youtube-v2`,
      options: {
        channelId: ['UCsZUur3SucrmTiECYZvuLlw'],
        apiKey: process.env.YOUTUBE_ACCESSTOKEN,
        maxVideos: 500 // Defaults to 50
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECTID,
        dataset: 'production',
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
