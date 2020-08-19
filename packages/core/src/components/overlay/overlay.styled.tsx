import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";
import * as Spring from "react-spring";
// re-import `styled-components` development mode DOM classnames.
import styled from "styled-components";

import * as Util from "~/util";

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
	Container: Util.StyledComponent<"div", IOverlayContainerProps>;
	Content: Util.StyledComponent<Spring.AnimatedComponent<"div">, IOverlayContentProps>;
	Backdrop: Util.StyledComponent<Spring.AnimatedComponent<"div">, IOverlayBackdropProps>;
}

export const Overlay = {} as Overlay;

/**
 * [Overlay.Container]
 */

interface IOverlayContainerProps {
	isOpen: boolean;
}

Overlay.Container = styled("div")<IOverlayContainerProps>`
	${Protocol.Snippets.cover()}
	${Protocol.Snippets.flex()}
	/*  */
	overflow: ${(props: IOverlayContainerProps) => (props.isOpen ? "hidden" : null)};
	pointer-events: ${(props: IOverlayContainerProps) => (!props.isOpen ? "none" : null)};
	z-index: ${Protocol.ZIndex.OVERLAY};
`;

/**
 * [Overlay.Content]
 */

interface IOverlayContentProps {}

const AnimatedOverlayContent = Spring.animated("div");

Overlay.Content = styled(AnimatedOverlayContent)``;

/**
 * [Overlay.Backdrop]
 */

interface IOverlayBackdropProps {}

const AnimatedOverlayBackdrop = Spring.animated("div");

Overlay.Backdrop = styled(AnimatedOverlayBackdrop)`
	${Protocol.Snippets.cover()}
  /*  */
	z-index: ${Protocol.ZIndex.OVERLAY};
	background: ${Protocol.Color.BLACK_2};
`;
