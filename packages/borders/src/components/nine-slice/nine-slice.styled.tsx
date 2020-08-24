import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";
import * as Spring from "react-spring";
// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

import * as Util from "~/util";

import * as Component from "./nine-slice";
import * as Types from "./nine-slice.types";

/**
 * [NineSlice]
 * - [NineSlice.Container(WRAPPER)]
 * - - [NineSlice.Row(WRAPPER)(MAP<3>)]
 * - - - [NineSlice.Section(ELEMENT)(MAP<3>)]
 */

interface NineSlice {
	Container: Util.SC.Styled<Spring.AnimatedComponent<"div">, INineSliceContainerProps>;
	Row: Util.SC.Styled<"div", INineSliceRowProps>;

	StubImage: Util.SC.Styled<"img", INineSliceStubImageProps>;
	Section: Util.SC.Styled<"div", INineSliceSectionProps>;
}

export const NineSlice = {} as NineSlice;

/**
 * [NineSlice.Container]
 */

interface INineSliceContainerProps {
	corner: Component.INineSliceProps["corner"];
	height: Component.INineSliceProps["height"];
	width: Component.INineSliceProps["width"];
}

NineSlice.Container = styled(Spring.animated.div)<INineSliceContainerProps>`
	${(props: INineSliceContainerProps) => {
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
		"${Types.NineSliceCoordinate.NORTH_WEST} ${Types.NineSliceCoordinate.NORTH} ${
	Types.NineSliceCoordinate.NORTH_EAST
}"
		"${Types.NineSliceCoordinate.WEST} ${Types.NineSliceCoordinate.CENTER} ${
	Types.NineSliceCoordinate.EAST
}"
		"${Types.NineSliceCoordinate.SOUTH_WEST} ${Types.NineSliceCoordinate.SOUTH} ${
	Types.NineSliceCoordinate.SOUTH_EAST
}";
`;

/**
 * [NineSlice.Row]
 */

interface INineSliceRowProps {}

NineSlice.Row = styled("div")<INineSliceRowProps>``;

/**
 * [NineSlice.StubImage]
 */

interface INineSliceStubImageProps {}

NineSlice.StubImage = styled("img")<INineSliceStubImageProps>`
	display: none;
`;

/**
 * [NineSlice.Section]
 */

interface INineSliceSectionProps {
	coordinate: Types.NineSliceCoordinate;
	corner: Component.INineSliceProps["corner"];
	height: Component.INineSliceProps["height"];
	image: Component.INineSliceProps["image"];
	imageSize: Component.INineSliceState["imageSize"];
	width: Component.INineSliceProps["width"];
}

NineSlice.Section = styled("div")<INineSliceSectionProps>`
	/* ${Protocol.Snippets.debug()} */
	/** */
	${(props: INineSliceSectionProps) => {
		const { coordinate, corner, height, image, imageSize, width } = props;

		const bgImage = Boolean(coordinate !== Types.NineSliceCoordinate.CENTER)
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

		const display = Boolean(coordinate === Types.NineSliceCoordinate.CENTER)
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
	coordinate: Types.NineSliceCoordinate,
	corner: INineSliceSectionProps["corner"],
	imageSize: INineSliceSectionProps["imageSize"],
	height: INineSliceSectionProps["height"],
	width: INineSliceSectionProps["width"],
): Types.INineSliceSectionBgSize {
	const size: Types.INineSliceSectionBgSize = {
		height: 0,
		width: 0,
	};

	const widthScaleOffset = Math.ceil((corner / imageSize!.width) * width);
	const heightScaleOffset = Math.ceil((corner / imageSize!.height) * height);

	switch (coordinate) {
		/** Top & Bottom */
		case Types.NineSliceCoordinate.NORTH:
		case Types.NineSliceCoordinate.SOUTH:
			size.height = imageSize!.height;
			size.width = width + widthScaleOffset;
			break;

		/** Left & Right */
		case Types.NineSliceCoordinate.EAST:
		case Types.NineSliceCoordinate.WEST:
			size.height = height + heightScaleOffset;
			size.width = imageSize!.width;
			break;

		case Types.NineSliceCoordinate.CENTER:
			size.height = height - corner * 2;
			size.width = width - corner * 2;
	}

	return size;
}

function getSectionBgPosition(
	coordinate: Types.NineSliceCoordinate,
): Types.INineSliceSectionBackgroundImageOffset {
	const backgroundPosition: Types.INineSliceSectionBackgroundImageOffset = {
		x: "center",
		y: "center",
	};

	switch (coordinate) {
		case Types.NineSliceCoordinate.NORTH:
			backgroundPosition.x = "center";
			backgroundPosition.y = "top";
			break;

		case Types.NineSliceCoordinate.SOUTH:
			backgroundPosition.x = "center";
			backgroundPosition.y = "bottom";
			break;

		case Types.NineSliceCoordinate.EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "center";
			break;

		case Types.NineSliceCoordinate.WEST:
			backgroundPosition.x = "left";
			backgroundPosition.y = "center";
			break;

		case Types.NineSliceCoordinate.NORTH_WEST:
			backgroundPosition.x = "left";
			backgroundPosition.y = "top";
			break;

		case Types.NineSliceCoordinate.NORTH_EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "top";
			break;

		case Types.NineSliceCoordinate.SOUTH_EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "bottom";
			break;

		case Types.NineSliceCoordinate.SOUTH_WEST:
			backgroundPosition.x = "left";
			backgroundPosition.y = "bottom";
			break;

		default:
			break;
	}

	return backgroundPosition;
}
