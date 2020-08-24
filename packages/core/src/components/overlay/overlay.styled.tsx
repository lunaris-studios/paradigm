import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Spring from "react-spring";
// re-import `styled-components` development mode DOM classnames.
import styled from "styled-components";

import * as Util from "~/util";

/**
 * [Overlay]
 * - [Overlay.Container(WRAPPER)]
 * - - [Overlay.Content(WRAPPER)]
 * - [Overlay.Backdrop(ELEMENT)]
 */

export interface Overlay {
	Container: Util.SC.Styled<"div", IOverlayContainerProps>;
	Content: Util.SC.Styled<Spring.AnimatedComponent<"div">, IOverlayContentProps>;
	Backdrop: Util.SC.Styled<Spring.AnimatedComponent<"div">, IOverlayBackdropProps>;
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

Overlay.Content = styled(Spring.animated.div)``;

/**
 * [Overlay.Backdrop]
 */

interface IOverlayBackdropProps {}

Overlay.Backdrop = styled(Spring.animated.div)`
	${Protocol.Snippets.cover()}
  /*  */
	z-index: ${Protocol.ZIndex.OVERLAY};
	background: ${Protocol.Color.BLACK_2};
`;
