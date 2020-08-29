import * as Protocol from "@paradigmjs/protocol";

import { default as styled, css } from "styled-components";

import * as Util from "~/util";

import * as Component from "./divider";

/**
 * [Divider]
 * - [Divider.Element(ELEMENT)]
 */

interface Divider {
	Element: Util.SC.Styled<"div", IDividerElementProps>;
}

export const Divider = {} as Divider;

/**
 * [Divider.Element]
 */

interface IDividerElementProps {
	color: Component.IDividerProps["color"];
}

Divider.Element = styled("div")<IDividerElementProps>`
	${Protocol.Snippets.debug()}
	/*  */
	${(props) => {
		const { color, theme } = props;

		const BORDER_COLOR = color || theme.colors.BLACK_0;
		const MARGIN = Protocol.Snippets.px(theme.spaces.ONE);
		const OPACITY = Protocol.bind("scheme", {
			[theme.schemes.DARK]: 0.75,
			[theme.schemes.LIGHT]: 0.5,
		});

		return css`
			border-color: ${BORDER_COLOR};
			margin: ${MARGIN};
			opacity: ${OPACITY};
		`;
	}}
	/*  */
	border-bottom-width: 1px;
	border-bottom-style: solid;
	/**
   * Since the element is empty, it will occupy minimal space and only show
   * the appropriate border based on direction of container.
   */
	border-right-width: 1px;
	border-right-style: solid;
`;
