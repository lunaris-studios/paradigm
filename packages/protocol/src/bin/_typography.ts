import * as T from "typography";

import * as Constants from "~/constants";

/**
 * Default typography theme for Neptune.
 */
export const Typography = Object.freeze<T.TypographyOptions>({
	baseFontSize: "21px",
	baseLineHeight: 1.5,
	headerFontFamily: ["Rosario", "sans-serif"],
	bodyFontFamily: ["Crimson Text", "serif"],
	headerColor: Constants.Color.BLACK_1,
	bodyColor: Constants.Color.BLACK_2,
	headerWeight: "700",
	bodyWeight: 400,
	boldWeight: 600,
	overrideStyles: (verticalRythym, options) => {
		const { adjustFontSizeTo, scale, rhythm } = verticalRythym;
		const linkColor = "#ff5700";
		return {
			a: {
				color: linkColor,
				textDecoration: "none",
				textShadow:
					".03em 0 #fff,-.03em 0 #fff,0 .03em #fff,0 -.03em #fff,.06em 0 #fff,-.06em 0 #fff,.09em 0 #fff,-.09em 0 #fff,.12em 0 #fff,-.12em 0 #fff,.15em 0 #fff,-.15em 0 #fff", // eslint-disable-line
				backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
			},
			"a:hover,a:active": {
				textShadow: "none",
				backgroundImage: "none",
			},
			"h1,h2,h3,h4,h5,h6": {
				marginTop: rhythm(1.5),
				marginBottom: rhythm(0.5),
			},
			"ul,ol": {
				marginLeft: rhythm(2 / 3),
			},
			// children ol, ul
			"li>ol,li>ul": {
				marginLeft: rhythm(2 / 3),
				marginBottom: 0,
			},
			// Blockquote styles.
			blockquote: {
				...scale(1 / 5),
				borderLeft: `${rhythm(3 / 16)} solid ${linkColor}`,
				color: Constants.Color.BLACK_1,
				paddingLeft: rhythm(13 / 16),
				fontStyle: "italic",
				marginLeft: 0,
				marginRight: 0,
			},
			"blockquote > :last-child": {
				marginBottom: 0,
			},
			"blockquote cite": {
				...adjustFontSizeTo(options.baseFontSize),
				color: options.bodyColor,
				fontStyle: "normal",
				fontWeight: options.bodyWeight,
			},
			"blockquote cite:before": {
				content: '"— "',
			},
		};
	},
});

export type Typography = typeof Typography;
