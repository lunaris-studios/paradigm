import * as CSS from "csstype";

/**
 * Default height & width of the 9-slice image.
 */
export interface INineSliceImageSize {
	height: number;
	width: number;
}

/**
 * Size of a 9-slice section.
 */
export interface INineSliceSectionBgSize {
	height: number;
	width: number;
}

/**
 * Coordinates on the x & y axis to offset the provided image for each section.
 */
export interface INineSliceSectionBackgroundImageOffset {
	x: CSS.Property.BackgroundPositionX;
	y: CSS.Property.BackgroundPositionY;
}

/**
 * Cardinal positions used to denote the layout of 9-slice components.
 */
export enum NineSliceCoordinate {
	NORTH = "NORTH",
	SOUTH = "SOUTH",
	EAST = "EAST",
	WEST = "WEST",
	NORTH_WEST = "NORTH_WEST",
	NORTH_EAST = "NORTH_EAST",
	SOUTH_WEST = "SOUTH_WEST",
	SOUTH_EAST = "SOUTH_EAST",
	CENTER = "CENTER",
}
