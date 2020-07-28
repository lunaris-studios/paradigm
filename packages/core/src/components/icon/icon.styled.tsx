import * as React from "react";
import * as SC from "styled-components";

import * as Common from "~/common";
import * as Components from "~/components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Icon]
 */

/**
 * [Icon]
 * - [Icon.Container(WRAPPER)]
 * - - [Icon.SVG(ELEMENT)]
 * - - [Icon.Title(ELEMENT)]
 */

interface Icon {
	Container: SC.StyledComponent<
		"div",
		any,
		IIconContainerAttrs,
		keyof IIconContainerAttrs
	>;

	SVG: SC.StyledComponent<"svg", any, IIconSVGAttrs, keyof IIconSVGAttrs>;
	Title: SC.StyledComponent<"desc", any, IIconTitleAttrs, keyof IIconTitleAttrs>;
}

export const Icon = {} as Icon;

/**
 * [Icon.Container]
 */

interface IIconContainerProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IIconContainerAttrs extends IIconContainerProps {}

Icon.Container = styled("div").attrs(
	(props: IIconContainerProps): IIconContainerAttrs => ({
		...props,
	}),
)`
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

interface IIconSVGProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IIconSVGAttrs extends IIconSVGProps {}

Icon.SVG = styled("svg").attrs(
	(props: IIconSVGProps): IIconSVGAttrs => ({
		...props,
	}),
)`
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

interface IIconTitleProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IIconTitleAttrs extends IIconTitleProps {}

Icon.Title = styled("desc").attrs(
	(props: IIconTitleProps): IIconTitleAttrs => ({
		...props,
	}),
)``;
