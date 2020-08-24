import * as React from "react";
import * as SC from "styled-components";
// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

import * as Util from "~/util";

/**
 * [Icon]
 * - [Icon.Container(WRAPPER)]
 * - - [Icon.SVG(ELEMENT)]
 * - - [Icon.Title(ELEMENT)]
 */

interface Icon {
	Container: Util.SC.Styled<"div", IIconContainerProps>;

	SVG: Util.SC.Styled<"svg", IIconSVGProps>;
	Title: Util.SC.Styled<"desc", IIconTitleProps>;
}

export const Icon = {} as Icon;

/**
 * [Icon.Container]
 */

interface IIconContainerProps {}

Icon.Container = styled("div")<IIconContainerProps>`
	/* ensure icons sit inline with text & isolate svg from surrounding elements */
	/* (vertical alignment in flow is usually off due to svg - not an issue with flex.) */
	display: inline-block;
	/* respect dimensions exactly */
	flex: 0 0 auto;
	/* sit nicely with inline text */
	vertical-align: text-bottom;

	&:not(:empty)::before {
		/* clear font icon when there's an <svg> image */
		content: "" !important; // fallback for IE11
		content: unset !important;
	}
`;

/**
 * [Icon.SVG]
 */

interface IIconSVGProps {}

Icon.SVG = styled("svg")<IIconSVGProps>`
	/* prevent extra vertical whitespace */
	display: block;

	/* inherit text color unless explicit fill is set */
	&:not([fill]) {
		fill: currentColor;
	}
`;

/**
 * [Icon.Title]
 */

interface IIconTitleProps {}

Icon.Title = styled("desc")<IIconTitleProps>``;
