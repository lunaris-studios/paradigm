import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";

// re-import `styled-components` development mode DOM classnames.
import styled from "styled-components";

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
	Element: SC.StyledComponent<
		"div",
		any,
		IDividerElementAttrs,
		keyof IDividerElementAttrs
	>;
}

export const Divider = {} as Divider;

/**
 * [Divider.Element]
 */

interface IDividerElementProps extends SC.ThemeProps<SC.DefaultTheme> {
	/**
	 * Should be a [[solid color]], changes in color scheme
	 * are dynamic handled via relative opacity changes.
	 * @default Color.BLACK_0
	 */
	color: Protocol.Color;
}

interface IDividerElementAttrs extends IDividerElementProps {}

const DIVIDER_ELEMENT_OPACITY = Protocol.bind("scheme", {
	[Protocol.Scheme.DARK]: 0.75,
	[Protocol.Scheme.LIGHT]: 0.5,
});

const defaultDividerElementProps = Object.freeze<IDividerElementProps>({
	color: Protocol.Color.BLACK_0,
	// TODO (sam): Fix parent extension of <SC.ThemeProps>
	theme: {} as Protocol.Theme,
});

Divider.Element = styled("div").attrs(
	(props: IDividerElementProps = defaultDividerElementProps): IDividerElementAttrs => ({
		...props,
	}),
)`
	border-color: ${(props) => props.color};
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
