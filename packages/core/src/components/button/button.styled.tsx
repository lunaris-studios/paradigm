import * as React from "react";
import * as SC from "styled-components";
import * as Spring from "react-spring";

import * as Component from "./button";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Button]
 * - [Button.Element]
 * - [Button.Text]
 */

/**
 * [Button]
 * - [Button.Element(WRAPPER)]
 */

interface Button {
	Element: SC.StyledComponent<
		Spring.AnimatedComponent<"button">,
		any,
		IButtonElementAttrs,
		keyof IButtonElementAttrs
	>;
	Text: SC.StyledComponent<
		Spring.AnimatedComponent<"span">,
		any,
		IButtonTextAttrs,
		keyof IButtonTextAttrs
	>;
}

export const Button = {} as Button;

/**
 * [Button.Element]
 */

interface IButtonElementProps
	extends SC.ThemeProps<SC.DefaultTheme>,
		Component.IButtonProps {}

interface IButtonElementAttrs extends IButtonElementProps {}

/**
 * This is overwritten for `AnchorButton` with a corresponding `Spring.animated("a")`
 * constant.
 */
const AniamtedButtonElement = Spring.animated("button");

Button.Element = styled(AniamtedButtonElement).attrs(
	(props: IButtonElementProps): IButtonElementAttrs => ({
		...props,
	}),
)``;

/**
 * [Button.Text]
 */

interface IButtonTextProps
	extends SC.ThemeProps<SC.DefaultTheme>,
		Component.IButtonProps {}

interface IButtonTextAttrs extends IButtonTextProps {}

const AniamtedButtonText = Spring.animated("span");

Button.Text = styled(AniamtedButtonText).attrs(
	(props: IButtonTextProps): IButtonTextAttrs => ({
		...props,
	}),
)`
	/** default: don't grow to fill but allow shrinking as necessary */
	flex: 0 1 auto;
`;
