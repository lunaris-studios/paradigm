import * as React from "react";
import * as SC from "styled-components";

import * as Common from "~/common";
import * as Components from "~/components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * [HTML]
 * - [HTML.Header(ELEMENT)]
 * - [HTML.Blockquote(ELEMENT)]
 * - [HTML.Code(ELEMENT)]
 * - [HTML.Pre(ELEMENT)]
 * - [HTML.Label(ELEMENT)]
 * - [HTML.OL(ELEMENT)]
 * - [HTML.UL(ELEMENT)]
 */

interface HTML {
	Header: SC.StyledComponent<"h1", any, IHTMLHeaderAttrs, keyof IHTMLHeaderAttrs>;

	Blockquote: SC.StyledComponent<
		"blockquote",
		any,
		IHTMLBlockquoteAttrs,
		keyof IHTMLBlockquoteAttrs
	>;
	Code: SC.StyledComponent<"code", any, IHTMLCodeAttrs, keyof IHTMLCodeAttrs>;
	Pre: SC.StyledComponent<"pre", any, IHTMLPreAttrs, keyof IHTMLPreAttrs>;
	Label: SC.StyledComponent<"label", any, IHTMLLabelAttrs, keyof IHTMLLabelAttrs>;

	OL: SC.StyledComponent<"ol", any, IHTMLOLAttrs, keyof IHTMLOLAttrs>;
	UL: SC.StyledComponent<"ul", any, IHTMLULAttrs, keyof IHTMLULAttrs>;
}

export const HTML = {} as HTML;

/**
 * [HTML.Header]
 */

interface IHTMLHeaderProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLHeaderAttrs extends IHTMLHeaderProps {}

HTML.Header = styled("h1").attrs(
	(props: IHTMLHeaderProps): IHTMLHeaderAttrs => ({
		...props,
	}),
)``;

/**
 * [HTML.Blockquote]
 */

interface IHTMLBlockquoteProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLBlockquoteAttrs extends IHTMLBlockquoteProps {}

HTML.Blockquote = styled("blockquote").attrs(
	(props: IHTMLBlockquoteProps): IHTMLBlockquoteAttrs => ({
		...props,
	}),
)``;

/**
 * [HTML.Code]
 */

interface IHTMLCodeProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLCodeAttrs extends IHTMLCodeProps {}

HTML.Code = styled("code").attrs(
	(props: IHTMLCodeProps): IHTMLCodeAttrs => ({
		...props,
	}),
)``;

/**
 * [HTML.Pre]
 */

interface IHTMLPreProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLPreAttrs extends IHTMLPreProps {}

HTML.Pre = styled("pre").attrs(
	(props: IHTMLPreProps): IHTMLPreAttrs => ({
		...props,
	}),
)``;

/**
 * [HTML.Label]
 */

interface IHTMLLabelProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLLabelAttrs extends IHTMLLabelProps {}

HTML.Label = styled("label").attrs(
	(props: IHTMLLabelProps): IHTMLLabelAttrs => ({
		...props,
	}),
)``;

/**
 * [HTML.OL]
 */

interface IHTMLOLProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLOLAttrs extends IHTMLOLProps {}

HTML.OL = styled("ol").attrs(
	(props: IHTMLOLProps): IHTMLOLAttrs => ({
		...props,
	}),
)``;

/**
 * [HTML.UL]
 */

interface IHTMLULProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHTMLULAttrs extends IHTMLULProps {}

HTML.UL = styled("ul").attrs(
	(props: IHTMLULProps): IHTMLULAttrs => ({
		...props,
	}),
)``;
