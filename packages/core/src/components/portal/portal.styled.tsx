import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Portal]
 */

/**
 * [Portal]
 * - [Portal.Container(WRAPPER)]
 */

export interface Portal {
	Container: SC.StyledComponent<
		"div",
		any,
		IPortalContainerAttrs,
		keyof IPortalContainerAttrs
	>;
}

export const Portal = {} as Portal;

/**
 * [Portal.Container]
 */

interface IPortalContainerProps
	extends SC.ThemeProps<SC.DefaultTheme>,
		React.HTMLProps<HTMLDivElement> {}

interface IPortalContainerAttrs extends IPortalContainerProps {}

Portal.Container = styled("div").attrs(
	(props: IPortalContainerProps): IPortalContainerAttrs => ({
		...props,
	}),
)<IPortalContainerProps>`
	${Protocol.Snippets.cover()}
`;
