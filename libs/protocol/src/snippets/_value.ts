import * as Constants from "$protocol/constants";

/**
 * Normalizes CSS units to the specified <Unit> specification
 * if necessary.
 * @param {string | number} value - value to be normalized
 * @param {}
 */
export function value(value: string | number, unit: Constants.Unit): string {
	if (typeof value === "number") {
		value = `${value}${unit}`;
	}

	return value;
}
