/**
 * requestInterval() & requestTimeout() by Joe Lambert (@joelambert)
 * https://gist.github.com/joelambert/1002116
 */

import { default as raf } from "raf";
import * as Common from "$util/common";

export const foo = Common.DISPLAYNAME_PREFIX;

export interface IRequestHandle {
	id: number;
}

export type RequestFn = () => void;

/**
 * Behaves the same as setInterval except uses requestAnimationFrame()
 * where possible for better performance.
 * @param {Function} fn The callback function
 * @param {number} interval The interval in milliseconds
 */
export function requestInterval(fn: RequestFn, interval: number) {
	const handle = {} as IRequestHandle;
	let start = new Date().getTime();

	function loop() {
		const current = new Date().getTime();
		const delta = current - start;

		if (delta >= interval) {
			fn();
			start = new Date().getTime();
		}

		handle.id = raf(loop);
	}

	handle.id = raf(loop);
	return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame()
 * where possible for better performance.
 * @param {number} id ID of the requestInterval() handle
 */
export function clearRequestInterval(id: number) {
	raf.cancel(id);
}

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame()
 * where possible for better performance.
 * @param {Function} fn The callback function
 * @param {number} timeout The delay in milliseconds
 */

export function requestTimeout(fn: RequestFn, timeout: number) {
	const handle = {} as IRequestHandle;
	let start = new Date().getTime();

	function loop() {
		const current = new Date().getTime();
		const delta = current - start;

		if (delta >= timeout) {
			fn();
		} else {
			handle.id = raf(loop);
		}
	}

	handle.id = raf(loop);
	return handle;
}

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame()
 * where possible for better performance.
 * @param {number} id ID of the requestTimeout() handle
 */
export function clearRequestTimeout(id: number) {
	raf.cancel(id);
}

/**
 * Instantiates an empty promise to block a async execution stack, resolving
 * after the provided `delay` in milliseconds.
 * @param {number} delay Time in milliseconds.
 */
export function wait(delay: number) {
	return new Promise((r) => setTimeout(r, delay));
}
