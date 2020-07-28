import * as React from "react";
import * as Styled from "styled-components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Menu]
 */

/**
 * [Menu]
 * - [Menu.Container(WRAPPER)]
 */

interface Menu {
	Container: Styled.StyledComponent<
		"ul",
		any,
		IMenuContainerAttrs,
		keyof IMenuContainerAttrs
	>;
}

export const Menu = {} as Menu;

/**
 * [Menu.Container]
 */

interface IMenuContainerProps {}

interface IMenuContainerAttrs extends Partial<IMenuContainerProps> {}

Menu.Container = styled("ul").attrs(
	(props: IMenuContainerProps): IMenuContainerAttrs => ({
		...props,
	}),
)`
	/* background: $menu-background-color; */
	/* border-radius: $pt-border-radius; */
	/* color: $pt-text-color; */
	list-style: none;
	margin: 0;
	/* min-width: $menu-min-width; */
	/* padding: $half-grid-size; */
	text-align: left;
`;
