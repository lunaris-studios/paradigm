/** */
export enum Position {
	BOTTOM = "BOTTOM",
	BOTTOM_LEFT = "BOTTOM_LEFT",
	BOTTOM_RIGHT = "BOTTOM_RIGHT",
	LEFT = "LEFT",
	LEFT_BOTTOM = "LEFT_BOTTOM",
	LEFT_TOP = "LEFT_TOP",
	RIGHT = "RIGHT",
	RIGHT_BOTTOM = "RIGHT_BOTTOM",
	RIGHT_TOP = "RIGHT_TOP",
	TOP = "TOP",
	TOP_LEFT = "TOP_LEFT",
	TOP_RIGHT = "TOP_RIGHT",
}

export function isPositionHorizontal(position: Position) {
	return (
		position === Position.TOP ||
		position === Position.TOP_LEFT ||
		position === Position.TOP_RIGHT ||
		position === Position.BOTTOM ||
		position === Position.BOTTOM_LEFT ||
		position === Position.BOTTOM_RIGHT
	);
}

export function isPositionVertical(position: Position) {
	return (
		position === Position.LEFT ||
		position === Position.LEFT_TOP ||
		position === Position.LEFT_BOTTOM ||
		position === Position.RIGHT ||
		position === Position.RIGHT_TOP ||
		position === Position.RIGHT_BOTTOM
	);
}

export function getPositionIgnoreAngles(position: Position) {
	if (
		position === Position.TOP ||
		position === Position.TOP_LEFT ||
		position === Position.TOP_RIGHT
	) {
		return Position.TOP;
	} else if (
		position === Position.BOTTOM ||
		position === Position.BOTTOM_LEFT ||
		position === Position.BOTTOM_RIGHT
	) {
		return Position.BOTTOM;
	} else if (
		position === Position.LEFT ||
		position === Position.LEFT_TOP ||
		position === Position.LEFT_BOTTOM
	) {
		return Position.LEFT;
	} else {
		return Position.RIGHT;
	}
}
