module.exports = {
	siteMetadata: {
		title: `gatsby`,
		description: `This is a gatsby application created by Nx.`,
	},
	plugins: [
		"gatsby-plugin-styled-components",

		{
			resolve: "gatsby-plugin-svgr",
			options: {
				svgo: false,
				ref: true,
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		{
			resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
			options: {
				path: __dirname,
			},
		},
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/logo.png`,
			},
		},
	],
};
