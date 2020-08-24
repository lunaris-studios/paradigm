import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";
import * as Spring from "react-spring";
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
	Container: Util.SC.Styled<Spring.AnimatedComponent<"div">, INineContainerProps>;
	Row: Util.SC.Styled<"div", INineRowProps>;

	StubImage: Util.SC.Styled<"img", INineStubImageProps>;
	Section: Util.SC.Styled<"div", INineSectionProps>;
}

export const Nine = {} as Nine;

/**
 * [Nine.Container]
 */

interface INineContainerProps {
	corner: Component.INineProps["corner"];
	height: Component.INineProps["height"];
	width: Component.INineProps["width"];
}

Nine.Container = styled(Spring.animated.div)<INineContainerProps>`
	${(props: INineContainerProps) => {
		const { height, width, corner } = props;

		const heightPx = Protocol.Snippets.value(height, Protocol.Unit.PX);
		const widthPx = Protocol.Snippets.value(width, Protocol.Unit.PX);
		const cornerPX = Protocol.Snippets.value(corner, Protocol.Unit.PX);

		return css`
			height: ${heightPx};
			width: ${widthPx};
			grid-template-columns: ${cornerPX} 1fr ${cornerPX};
			grid-template-rows: ${cornerPX} 1fr ${cornerPX};
		`;
	}}
	/** */
	display: grid;
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
	coordinate: Types.NineCoordinate;
	corner: Component.INineProps["corner"];
	height: Component.INineProps["height"];
	image: Component.INineProps["image"];
	imageSize: Component.INineState["imageSize"];
	width: Component.INineProps["width"];
}

Nine.Section = styled("div")<INineSectionProps>`
	/* ${Protocol.Snippets.debug()} */
	/** */
	${(props: INineSectionProps) => {
		const { coordinate, corner, height, image, imageSize, width } = props;

		const bgImage = Boolean(coordinate !== Types.NineCoordinate.CENTER)
			? `url(${image})`
			: "";

		const bgPosition = getSectionBgPosition(coordinate);

		const bgSize = getSectionBgSize(coordinate, corner, imageSize, height, width);
		const bgSizeWidth = Boolean(bgSize.width)
			? Protocol.Snippets.value(bgSize.width, Protocol.Unit.PX)
			: "auto";
		const bgSizeHeight = Boolean(bgSize.height)
			? Protocol.Snippets.value(bgSize.height, Protocol.Unit.PX)
			: "auto";

		const display = Boolean(coordinate === Types.NineCoordinate.CENTER)
			? "contents"
			: "block";

		return css`
			background-image: ${bgImage};
			background-position-x: ${bgPosition.x};
			background-position-y: ${bgPosition.y};
			background-size: ${bgSizeWidth} ${bgSizeHeight};
			display: ${display};
			grid-area: ${coordinate};
		`;
	}}
`;

function getSectionBgSize(
	coordinate: Types.NineCoordinate,
	corner: INineSectionProps["corner"],
	imageSize: INineSectionProps["imageSize"],
	height: INineSectionProps["height"],
	width: INineSectionProps["width"],
): Types.INineSectionBgSize {
	const size: Types.INineSectionBgSize = {
		height: 0,
		width: 0,
	};

	const widthScaleOffset = Math.ceil((corner / imageSize!.width) * width);
	const heightScaleOffset = Math.ceil((corner / imageSize!.height) * height);

	switch (coordinate) {
		/** Top & Bottom */
		case Types.NineCoordinate.NORTH:
		case Types.NineCoordinate.SOUTH:
			size.height = imageSize!.height;
			size.width = width + widthScaleOffset;
			break;

		/** Left & Right */
		case Types.NineCoordinate.EAST:
		case Types.NineCoordinate.WEST:
			size.height = height + heightScaleOffset;
			size.width = imageSize!.width;
			break;

		case Types.NineCoordinate.CENTER:
			size.height = height - corner * 2;
			size.width = width - corner * 2;
	}

	return size;
}

function getSectionBgPosition(
	coordinate: Types.NineCoordinate,
): Types.INineSectionBackgroundImageOffset {
	const backgroundPosition: Types.INineSectionBackgroundImageOffset = {
		x: "center",
		y: "center",
	};

	switch (coordinate) {
		case Types.NineCoordinate.NORTH:
			backgroundPosition.x = "center";
			backgroundPosition.y = "top";
			break;

		case Types.NineCoordinate.SOUTH:
			backgroundPosition.x = "center";
			backgroundPosition.y = "bottom";
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
			backgroundPosition.x = "left";
			backgroundPosition.y = "top";
			break;

		case Types.NineCoordinate.NORTH_EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "top";
			break;

		case Types.NineCoordinate.SOUTH_EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "bottom";
			break;

		case Types.NineCoordinate.SOUTH_WEST:
			backgroundPosition.x = "left";
			backgroundPosition.y = "bottom";
			break;

		default:
			break;
	}

	return backgroundPosition;
}
