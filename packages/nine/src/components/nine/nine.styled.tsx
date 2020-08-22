import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";
// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

import * as Util from "~/util";

import * as Component from "./nine";
import * as Types from "./nine.types";

/**
 * Table of Contents
 *
 * [Nine]
 */

/**
 * [Nine]
 * - [Nine.Container(WRAPPER)]
 * - - [Nine.Row(WRAPPER)(MAP<3>)]
 * - - - [Nine.Section(ELEMENT)(MAP<3>)]
 */

interface Nine {
	Container: Util.SC.Styled<"div", INineContainerProps>;
	Row: Util.SC.Styled<"div", INineRowProps>;

	StubImage: Util.SC.Styled<"img", INineStubImageProps>;
	Section: Util.SC.Styled<"div", INineSectionProps>;
}

export const Nine = {} as Nine;

/**
 * [Nine.Container]
 */

interface INineContainerProps {
	height: Component.INineProps["height"];
	width: Component.INineProps["width"];
}

Nine.Container = styled("div")<INineContainerProps>`
	height: ${(props) => Protocol.Snippets.value(props.height, Protocol.Unit.PX)};
	width: ${(props) => Protocol.Snippets.value(props.width, Protocol.Unit.PX)};

	display: grid;
	grid-auto-columns: auto;
	grid-auto-rows: auto;
	grid-template-areas:
		"${Types.NineCoordinate.NORTH_WEST} ${Types.NineCoordinate.NORTH} ${
	Types.NineCoordinate.NORTH_EAST
}"
		"${Types.NineCoordinate.WEST} ${Types.NineCoordinate.CENTER} ${Types.NineCoordinate.EAST}"
		"${Types.NineCoordinate.SOUTH_WEST} ${Types.NineCoordinate.SOUTH} ${
	Types.NineCoordinate.SOUTH_EAST
}";
`;

/**
 * [Nine.Row]
 */

interface INineRowProps {}

Nine.Row = styled("div")<INineRowProps>``;

/**
 * [Nine.StubImage]
 */

interface INineStubImageProps {}

Nine.StubImage = styled("img")<INineStubImageProps>`
	display: none;
`;

/**
 * [Nine.Section]
 */

interface INineSectionProps {
	coordinates: Types.NineCoordinate;
	corner: Component.INineProps["corner"];
	image: Component.INineProps["image"];
	imageSize: Component.INineState["imageSize"];
}

Nine.Section = styled("div")<INineSectionProps>`
	${Protocol.Snippets.debug()}
	/** */
	${(props) => {
		const dimensions = getSectionDimensions(props.coordinates, props.corner);
		const backgroundImagePosition = getSectionBackgroundImagePosition(
			props.coordinates,
			props.corner,
		);

		return css`
			height: ${dimensions.height || "auto"}
			width: ${dimensions.width || "auto"}

			background-position-x: ${backgroundImagePosition.x};
			background-position-y: ${backgroundImagePosition.y};
		`;
	}}
	/** */
	grid-area: ${(props) => props.coordinates};
	background-image: ${(props) => props.image};
`;

function getSectionDimensions(
	coordinates: Types.NineCoordinate,
	corner: INineSectionProps["corner"],
): Types.INineSectionDimensions {
	const dimensions: Types.INineSectionDimensions = {
		height: 0,
		width: 0,
	};

	switch (coordinates) {
		/** Corners */
		case Types.NineCoordinate.NORTH_WEST:
		case Types.NineCoordinate.NORTH_EAST:
		case Types.NineCoordinate.SOUTH_WEST:
		case Types.NineCoordinate.SOUTH_EAST:
			dimensions.height = corner;
			dimensions.width = corner;
			break;

		/** Top & Bottom */

		case Types.NineCoordinate.NORTH:
		case Types.NineCoordinate.SOUTH:
			dimensions.height = corner;
			break;

		/** Left & Right */

		case Types.NineCoordinate.EAST:
		case Types.NineCoordinate.WEST:
			dimensions.width = corner;
			break;

		default:
			break;
	}

	return dimensions;
}

function getSectionBackgroundImagePosition(
	coordinates: Types.NineCoordinate,
	corner: INineSectionProps["corner"],
): Types.INineSectionBackgroundImageOffset {
	const backgroundPosition: Types.INineSectionBackgroundImageOffset = {
		x: "center",
		y: "center",
	};

	const cornerPx = Protocol.Snippets.value(corner, Protocol.Unit.PX);

	switch (coordinates) {
		case Types.NineCoordinate.NORTH:
			backgroundPosition.x = "left";
			backgroundPosition.y = `top ${cornerPx}`;
			break;

		case Types.NineCoordinate.SOUTH:
			backgroundPosition.x = "center";
			backgroundPosition.y = `bottom ${cornerPx}`;
			break;

		case Types.NineCoordinate.EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "center";
			break;

		case Types.NineCoordinate.WEST:
			backgroundPosition.x = "left";
			backgroundPosition.y = "center";
			break;

		case Types.NineCoordinate.NORTH_WEST:
			backgroundPosition.x = `left ${cornerPx}`;
			backgroundPosition.y = `top ${cornerPx}`;
			break;

		case Types.NineCoordinate.NORTH_EAST:
			backgroundPosition.x = `right ${cornerPx}`;
			backgroundPosition.y = `top ${cornerPx}`;
			break;

		case Types.NineCoordinate.SOUTH_EAST:
			backgroundPosition.x = `right ${cornerPx}`;
			backgroundPosition.y = `bottom ${cornerPx}`;
			break;

		case Types.NineCoordinate.SOUTH_WEST:
			backgroundPosition.x = `left ${cornerPx}`;
			backgroundPosition.y = `bottom ${cornerPx}`;
			break;

		default:
			break;
	}

	return backgroundPosition;
}
