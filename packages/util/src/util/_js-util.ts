// only accessible within this file, so use `Utils.isNodeEnv(env)` from the outside.
declare var process: { env: any };

/**
 * Returns whether `process.env.NODE_ENV` exists and equals `env`.
 */
export function isNodeEnv(env: string) {
	return typeof process !== "undefined" && process.env && process.env.NODE_ENV === env;
}

/**
 * Returns whether code is executing the browser by checking the existence
 * of browser global `window`.
 */
export function isBrowser() {
	return typeof window !== "undefined";
}

/**
 * Returns the difference in length between two arrays. A `null` argument is
 * considered an empty list. The return value will be positive if `a` is longer
 * than `b`, negative if the opposite is true, and zero if their lengths are
 * equal.
 */
export function arrayLengthCompare(a: any[] = [], b: any[] = []) {
	return a.length - b.length;
}

/**
 * Returns true if the two numbers are within the given tolerance of each other.
 * This is useful to correct for floating point precision issues, less useful
 * for integers.
 */
export function approxEqual(a: number, b: number, tolerance = 0.00001) {
	return Math.abs(a - b) <= tolerance;
}

/** Returns the number of decimal places in the given number. */
export function countDecimalPlaces(num: number) {
	if (!isFinite(num)) {
		return 0;
	}
	let e = 1;
	let p = 0;
	while (Math.round(num * e) / e !== num) {
		e *= 10;
		p++;
	}
	return p;
}

/**
 * Returns whether the key code is `enter` or `space`, the two keys that
 * can click a button.
 */
export function isKeyboardClick(keyCode: number) {
	return keyCode === Protocol.Key.ENTER || keyCode === Protocol.Key.SPACE;
}
