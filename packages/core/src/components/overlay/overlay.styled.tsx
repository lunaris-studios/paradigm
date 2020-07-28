import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Components from "~/components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Overlay]
 */

/**
 * [Overlay]
 * - [Overlay.Container(WRAPPER)]
 * - - [Overlay.Content(WRAPPER)]
 * - [Overlay.Backdrop(ELEMENT)]
 */

export interface Overlay {
	Container: SC.StyledComponent<
		Spring.AnimatedComponent<"div">,
		any,
		IOverlayContainerAttrs,
		keyof IOverlayContainerAttrs
	>;
	Backdrop: SC.StyledComponent<
		Spring.AnimatedComponent<"div">,
		any,
		IOverlayBackdropAttrs,
		keyof IOverlayBackdropAttrs
	>;
	Content: SC.StyledComponent<
		Spring.AnimatedComponent<"div">,
		any,
		IOverlayContentAttrs,
		keyof IOverlayContentAttrs
	>;
}

export const Overlay = {} as Overlay;

/**
 * [Overlay.Container]
 */

interface IOverlayContainerProps extends SC.ThemeProps<SC.DefaultTheme> {
	isOpen: boolean;
	usePortal: boolean;
}

interface IOverlayContainerAttrs extends IOverlayContainerProps {
	overflow: Nullable<string>;
	pointerEvents: Nullable<string>;
}

const AnimatedOverlayContainer = Spring.animated.div;

Overlay.Container = styled(AnimatedOverlayContainer).attrs(
	(props: IOverlayContainerProps): IOverlayContainerAttrs => ({
		overflow: props.isOpen ? "hidden" : null,
		pointerEvents: !props.isOpen ? "none" : null,
		...props,
	}),
)`
	${Protocol.Snippets.cover()}
	${Protocol.Snippets.flex()}

	overflow: ${(props) => props.overflow};
	pointer-events:  ${(props) => props.pointerEvents};

	z-index: ${Protocol.ZIndex.OVERLAY};
`;

/**
 * [Overlay.Content]
 */

interface IOverlayContentProps {}

interface IOverlayContentAttrs extends IOverlayContentProps {}

const AnimatedOverlayContent = Spring.animated("div");

Overlay.Content = styled(AnimatedOverlayContent).attrs(
	(props: IOverlayContentProps): IOverlayContentAttrs => ({
		...props,
	}),
)``;

/**
 * [Overlay.Backdrop]
 */

interface IOverlayBackdropProps {}

interface IOverlayBackdropAttrs extends IOverlayBackdropProps {}

const AnimatedOverlayBackdrop = Spring.animated("div");

Overlay.Backdrop = styled(AnimatedOverlayBackdrop).attrs(
	(props: IOverlayBackdropProps): IOverlayBackdropAttrs => ({
		...props,
	}),
)`
	${Protocol.Snippets.cover()}

	z-index: ${Protocol.ZIndex.OVERLAY};
	background: ${Protocol.Color.BLACK_2};
`;
