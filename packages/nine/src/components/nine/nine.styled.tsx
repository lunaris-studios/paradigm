import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";

import * as Types from "./nine.types";

// re-import `styled-components` development mode DOM classnames.
import styled from "styled-components";

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
	Container: SC.StyledComponent<
		"div",
		any,
		INineContainerAttrs,
		keyof INineContainerAttrs
	>;
	Row: SC.StyledComponent<"div", any, INineRowAttrs, keyof INineRowAttrs>;

	StubImage: SC.StyledComponent<
		"img",
		any,
		INineStubImageAttrs,
		keyof INineStubImageAttrs
	>;
	Section: SC.StyledComponent<"div", any, INineSectionAttrs, keyof INineSectionAttrs>;
}

export const Nine = {} as Nine;

/**
 * [Nine.Container]
 */

interface INineContainerProps
	extends SC.ThemeProps<SC.DefaultTheme>,
		Types.INineDimensions {}

interface INineContainerAttrs extends INineContainerProps {}

Nine.Container = styled("div").attrs(
	(props: INineContainerProps): INineContainerAttrs => ({
		...props,
	}),
)`
	height: ${(props) =>
		props.height != null
			? Protocol.Snippets.value(props.height, Protocol.Unit.PX)
			: "auto"};
	width: ${(props) =>
		props.width != null
			? Protocol.Snippets.value(props.width, Protocol.Unit.PX)
			: "auto"};

	display: grid;
	grid-auto-columns: auto;
	grid-auto-rows: auto;
	grid-template-areas:
		"${Types.ENineCoordinate.NORTH_WEST} ${Types.ENineCoordinate.NORTH} ${
	Types.ENineCoordinate.NORTH_EAST
}"
		"${Types.ENineCoordinate.WEST} ${Types.ENineCoordinate.CENTER} ${
	Types.ENineCoordinate.EAST
}"
		"${Types.ENineCoordinate.SOUTH_WEST} ${Types.ENineCoordinate.SOUTH} ${
	Types.ENineCoordinate.SOUTH_EAST
}";
`;

/**
 * [Nine.Row]
 */

interface INineRowProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface INineRowAttrs extends INineRowProps {}

Nine.Row = styled("div").attrs(
	(props: INineRowProps): INineRowAttrs => ({
		...props,
	}),
)``;

/**
 * [Nine.StubImage]
 */

interface INineStubImageProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface INineStubImageAttrs extends INineStubImageProps {}

Nine.StubImage = styled("img").attrs(
	(props: INineStubImageProps): INineStubImageAttrs => ({
		...props,
	}),
)`
	display: none;
`;

/**
 * [Nine.Section]
 */

interface INineSectionProps extends SC.ThemeProps<SC.DefaultTheme> {
	/**
	 * An array of coordinates that Inidicates the cardinal position  9-slice section
	 * on the surface.
	 */
	coordinates: Types.ENineCoordinate;

	/**
	 * Squared length reserved for the non-scalable, static corner elements.
	 * of the 9-slice layout.
	 * @default 8;
	 */
	corner: number;

	/**
	 * File path of the image to use for the background of the 9-slice
	 * surface.
	 * @default null
	 */
	image: Nullable<string>;

	/**
	 * Height & width of the 9-slice image
	 */
	imageSize: Nullable<Types.INineDimensions>;
}

interface INineSectionAttrs extends INineSectionProps {
	dimensions: ReturnType<typeof getSectionDimensions>;
	backgroundImagePosition: ReturnType<typeof getSectionBackgroundImagePosition>;
}

interface INineSectionBackgroundImagePosition {
	x: Nullable<string>;
	y: Nullable<string>;
}

Nine.Section = styled("div").attrs(
	(props: INineSectionProps): INineSectionAttrs => ({
		...props,
		dimensions: getSectionDimensions(props.coordinates, props.corner),
		backgroundImagePosition: getSectionBackgroundImagePosition(
			props.coordinates,
			props.corner,
		),
	}),
)`
	${Protocol.Snippets.debug()}

	height: ${(props) =>
		props.dimensions.height != null ? props.dimensions.height : "auto"};
	width: ${(props) => (props.dimensions.width != null ? props.dimensions.width : "auto")};

	grid-area: ${(props) => props.coordinates};

	background-image: ${(props) => props.image};
	background-position-x: ${(props) =>
		props.backgroundImagePosition.x != null ? props.backgroundImagePosition.x : "auto"};
	background-position-y: ${(props) =>
		props.backgroundImagePosition.y != null ? props.backgroundImagePosition.y : "auto"};
`;

function getSectionDimensions(
	ENinecoordinates: Types.ENineCoordinate,
	corner: INineSectionProps["corner"],
): Types.INineDimensions {
	let dimensions = {} as Types.INineDimensions;

	const cornerPx = Protocol.Snippets.value(corner, Protocol.Unit.PX);

	switch (ENinecoordinates) {
		/** Corners */
		case Types.ENineCoordinate.NORTH_WEST:
		case Types.ENineCoordinate.NORTH_EAST:
		case Types.ENineCoordinate.SOUTH_WEST:
		case Types.ENineCoordinate.SOUTH_WEST:
			dimensions = Object.freeze<Types.INineDimensions>({
				height: cornerPx,
				width: cornerPx,
			});
			break;

		/** Top & Bottom */

		case Types.ENineCoordinate.NORTH:
		case Types.ENineCoordinate.SOUTH:
			dimensions = Object.freeze<Types.INineDimensions>({
				height: cornerPx,
				width: null,
			});
			break;

		/** Left & Right */

		case Types.ENineCoordinate.EAST:
		case Types.ENineCoordinate.WEST:
			dimensions = Object.freeze<Types.INineDimensions>({
				height: null,
				width: cornerPx,
			});
			break;

		/** Center */

		case Types.ENineCoordinate.CENTER:
			dimensions = Object.freeze<Types.INineDimensions>({
				height: null,
				width: null,
			});
			break;
		default:
			break;
	}

	return dimensions;
}

function getSectionBackgroundImagePosition(
	ENinecoordinates: Types.ENineCoordinate,
	corner: INineSectionProps["corner"],
): INineSectionBackgroundImagePosition {
	const backgroundPosition: INineSectionBackgroundImagePosition = {
		x: null,
		y: null,
	};

	const cornerPx = Protocol.Snippets.value(corner, Protocol.Unit.PX);

	switch (ENinecoordinates) {
		case Types.ENineCoordinate.NORTH:
			backgroundPosition.x = "left";
			backgroundPosition.y = `top ${cornerPx}`;
			break;

		case Types.ENineCoordinate.SOUTH:
			backgroundPosition.x = "center";
			backgroundPosition.y = `bottom ${cornerPx}`;
			break;

		case Types.ENineCoordinate.EAST:
			backgroundPosition.x = "right";
			backgroundPosition.y = "center";
			break;

		case Types.ENineCoordinate.WEST:
			backgroundPosition.x = "left";
			backgroundPosition.y = "center";
			break;

		case Types.ENineCoordinate.CENTER:
			break;

		case Types.ENineCoordinate.NORTH_WEST:
			backgroundPosition.x = `left ${cornerPx}`;
			backgroundPosition.y = `top ${cornerPx}`;
			break;

		case Types.ENineCoordinate.NORTH_EAST:
			backgroundPosition.x = `right ${cornerPx}`;
			backgroundPosition.y = `top ${cornerPx}`;
			break;

		case Types.ENineCoordinate.SOUTH_EAST:
			backgroundPosition.x = `right ${cornerPx}`;
			backgroundPosition.y = `bottom ${cornerPx}`;
			break;

		case Types.ENineCoordinate.SOUTH_WEST:
			backgroundPosition.x = `left ${cornerPx}`;
			backgroundPosition.y = `bottom ${cornerPx}`;
			break;

		default:
			break;
	}

	return backgroundPosition;
}
