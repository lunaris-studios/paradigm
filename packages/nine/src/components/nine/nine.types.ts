export interface INineDimensions {
	height: Nullable<number | string>;
	width: Nullable<number | string>;
}

export enum ENineCoordinate {
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
