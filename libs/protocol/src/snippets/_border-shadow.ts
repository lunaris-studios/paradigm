import * as Constants from "$protocol/constants";

import { value } from "./_value";
import { transparentize } from "polished";

export function borderShadow(
	alpha: number,
	color: string = Constants.Color.BLACK_1,
	size: string | number = "1px",
) {
	size = value(size, Constants.Unit.PX);
	color = transparentize(alpha, color);

	return `0 0 0 ${size} ${color}`;
}
