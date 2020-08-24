import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";
// re-import `styled-components` development mode DOM classnames.
import styled from "styled-components";

import * as Util from "~/util";

import * as Component from "./divider";

/**
 * Table of Contents
 *
 * [Divider]
 */

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

const DIVIDER_ELEMENT_OPACITY = Protocol.bind("scheme", {
	[Protocol.Scheme.DARK]: 0.75,
	[Protocol.Scheme.LIGHT]: 0.5,
});

Divider.Element = styled("div")`
	border-color: ${(props: IDividerElementProps) => props.color || Protocol.Color.BLACK_0};
	margin: ${Protocol.Snippets.px(Protocol.Space.ONE)};
	opacity: ${DIVIDER_ELEMENT_OPACITY};
	border-bottom-width: 1px;
	border-bottom-style: solid;
	/**
   * Since the element is empty, it will occupy minimal space and only show
   * the appropriate border based on direction of container.
   */
	border-right-width: 1px;
	border-right-style: solid;
`;
