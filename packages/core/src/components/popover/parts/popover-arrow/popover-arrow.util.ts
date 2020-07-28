import * as Popper from "@popperjs/core";

import * as Util from "../../popover.util";

/**
 * Modifier helper function to compute arrow rotate() transform
 * @param {Popper.Placement} [placement] - directional flag to indicate arrow placement
 */
export function getArrowAngle(placement?: Popper.Placement) {
	if (placement == null) {
		return 0;
	}
	// can only be top/left/bottom/right - auto is resolved internally
	switch (Util.getPosition(placement)) {
		case "top":
			return -90;
		case "left":
			return 180;
		case "bottom":
			return 90;
		default:
			return 0;
	}
}

export * from "../../popover.util";
