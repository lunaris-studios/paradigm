import * as React from "react";
import * as SC from "styled-components";
import * as Spring from "react-spring";
// re-import `styled-components` development mode DOM classnames.
import styled from "styled-components";

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
 * This is overwritten for `AnchorButton` with a corresponding `Spring.animated("a")`
 * via styled-component `as` override.
 */
const AnimatedButtonContainer = Spring.animated("button");

Button.Container = styled(AnimatedButtonContainer)``;

/**
 * [Button.Text]
 */

interface IButtonTextProps {}

/**
 * This is overwritten for `AnchorButton` with a corresponding `Spring.animated("a")`
 * constant.
 */
const AnimatedButtonText = Spring.animated("span");

Button.Text = styled(AnimatedButtonText)``;
