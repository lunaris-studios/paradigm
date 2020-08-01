import * as GPTL from "gatsby-plugin-transition-link";
import * as React from "react";
import * as SC from "styled-components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";
import { default as TLink } from "gatsby-plugin-transition-link";

import * as Common from "~/common";

import * as Component from "./transition-link";

/**
 * Table of Contents
 *
 * [TransitionLink]
 */

/**
 * [TransitionLink]
 * - [TransitionLink.Link(ELEMENT)]
 */

interface TransitionLink {
	Link: SC.StyledComponent<
		typeof TLink,
		any,
		ITransitionLinkLinkAttrs,
		keyof ITransitionLinkLinkAttrs
	>;
}

export const TransitionLink = {} as TransitionLink;

/**
 * [TransitionLink.Link]
 */

interface ITransitionLinkLinkProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface ITransitionLinkLinkAttrs extends ITransitionLinkLinkProps {}

TransitionLink.Link = styled(TLink).attrs(
	(props: ITransitionLinkLinkProps): ITransitionLinkLinkAttrs => ({
		...props,
	}),
)``;
