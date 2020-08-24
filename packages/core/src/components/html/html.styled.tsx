import * as React from "react";
import * as SC from "styled-components";
// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

import * as Util from "~/util";

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
	Header: Util.SC.Styled<"h1", IHTMLHeaderProps>;

	Blockquote: Util.SC.Styled<"blockquote", IHTMLBlockquoteProps>;
	Code: Util.SC.Styled<"code", IHTMLCodeProps>;
	Pre: Util.SC.Styled<"pre", IHTMLPreProps>;
	Label: Util.SC.Styled<"label", IHTMLLabelProps>;

	OL: Util.SC.Styled<"ol", IHTMLOLProps>;
	UL: Util.SC.Styled<"ul", IHTMLULProps>;
}

export const HTML = {} as HTML;

/**
 * [HTML.Header]
 */

interface IHTMLHeaderProps {}

HTML.Header = styled("h1")<IHTMLHeaderProps>``;

/**
 * [HTML.Blockquote]
 */

interface IHTMLBlockquoteProps {}

HTML.Blockquote = styled("blockquote")<IHTMLBlockquoteProps>``;

/**
 * [HTML.Code]
 */

interface IHTMLCodeProps {}

HTML.Code = styled("code")<IHTMLCodeProps>``;

/**
 * [HTML.Pre]
 */

interface IHTMLPreProps {}

HTML.Pre = styled("pre")<IHTMLPreProps>``;

/**
 * [HTML.Label]
 */

interface IHTMLLabelProps {}

HTML.Label = styled("label")<IHTMLLabelProps>``;

/**
 * [HTML.OL]
 */

interface IHTMLOLProps {}

HTML.OL = styled("ol")<IHTMLOLProps>``;

/**
 * [HTML.UL]
 */

interface IHTMLULProps {}

HTML.UL = styled("ul")<IHTMLULProps>``;
