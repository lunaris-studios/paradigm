import * as React from "react";
import * as Spring from "react-spring";

import { default as styled } from "styled-components";

import * as Util from "~/util";

/**
 * [Button]
 * - [Button.Container(WRAPPER)]
 * - - [Components.Spinner(COMPONENT)]
 * - - [Components.Icon(COMPONENT)]
 * - - [Button.Text(ELEMENT)]
 */

interface Button {
	Container: Util.SC.Styled<Spring.AnimatedComponent<"button">, IButtonContainerProps>;
	Text: Util.SC.Styled<Spring.AnimatedComponent<"span">, IButtonTextProps>;
}

export const Button = {} as Button;

/**
 * [Button.Container]
 */

interface IButtonContainerProps {}

/**
 * This is overwritten for `AnchorButton` with a corresponding `Spring.animated.a`
 * via styled-component `as` override.
 */
Button.Container = styled(Spring.animated.button)<IButtonContainerProps>``;

/**
 * [Button.Text]
 */

interface IButtonTextProps {}

Button.Text = styled(Spring.animated.span)<IButtonTextProps>``;
