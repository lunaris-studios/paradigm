import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Component from "./popover-arrow";
import * as Util from "./popover-arrow.util";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [PopoverArrow]
 */

/**
 * [PopoverArrow]
 * - [PopoverArrow.Container(WRAPPER)]
 */

interface PopoverArrow {
	Container: SC.StyledComponent<
		"div",
		any,
		IPopoverArrowContainerAttrs,
		keyof IPopoverArrowContainerAttrs
	>;

	SVG: SC.StyledComponent<"svg", any, IPopoverArrowSVGAttrs, keyof IPopoverArrowSVGAttrs>;
	Path: SC.StyledComponent<
		"path",
		any,
		IPopoverArrowPathAttrs,
		keyof IPopoverArrowPathAttrs
	>;
}

export const PopoverArrow = {} as PopoverArrow;

/**
 * [PopoverArrow.Container]
 */

interface IPopoverArrowContainerProps extends SC.ThemeProps<SC.DefaultTheme> {
	arrowProps: Component.IPopoverArrowProps["arrowProps"];
}

interface IPopoverArrowContainerAttrs extends IPopoverArrowContainerProps {}

PopoverArrow.Container = styled("div").attrs(
	(props: IPopoverArrowContainerProps): IPopoverArrowContainerAttrs => ({
		...props,
		...(props.arrowProps
			? !isNaN(Number(props.arrowProps.style.left))
				? props.arrowProps.style
				: {}
			: {}),
	}),
)`
	::before {
		border-radius: $pt-border-radius - 1;
		content: "";
		display: block;
		position: absolute;
		transform: rotate(45deg);
	}
`;

/**
 * [PopoverArrow.SVG]
 */

interface IPopoverArrowSVGProps
	extends SC.ThemeProps<SC.DefaultTheme>,
		React.SVGAttributes<SVGElement> {
	placement: Component.IPopoverArrowProps["placement"];
}

interface IPopoverArrowSVGAttrs extends IPopoverArrowSVGProps {
	arrowAngle: number;
}

PopoverArrow.SVG = styled("svg").attrs(
	(props: IPopoverArrowSVGProps): IPopoverArrowSVGAttrs => ({
		viewBox: "0 0 30 30",
		arrowAngle: Util.getArrowAngle(props.placement),
		...props,
	}),
)`
	transform: ${(props) => `rotate(${Protocol.Snippets.deg(props.arrowAngle)})`};
`;

/**
 * [PopoverArrow.Path]
 */

export enum PopoverArrowPathType {
	ARROW = "ARROW",
	SHADOW = "SHADOW",
}

interface IPopoverArrowPathProps
	extends SC.ThemeProps<SC.DefaultTheme>,
		React.SVGAttributes<SVGElement> {
	type: PopoverArrowPathType;
}

interface IPopoverArrowPathAttrs extends IPopoverArrowPathProps {}

// TODO (sam): provide source of truth via Figma design library?
const SVG_SHADOW_PATH =
	"M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378" +
	"-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z";

const SVG_ARROW_PATH =
	"M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005" +
	"c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z";

PopoverArrow.Path = styled("path").attrs(
	(props: IPopoverArrowPathProps): IPopoverArrowPathAttrs => ({
		...props,
		d: props.type === PopoverArrowPathType.ARROW ? SVG_ARROW_PATH : SVG_SHADOW_PATH,
	}),
)``;
