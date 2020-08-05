/**
 * requestInterval() & requestTimeout() by Joe Lambert (@joelambert)
 * https://gist.github.com/joelambert/1002116
 */

import { default as raf } from "raf";

export interface IRequestHandle {
	id: number;
}

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance.
 * @param {Function} fn The callback function
 * @param {number} delay The delay in milliseconds
 */
export function requestInterval(fn: Function, delay: number) {
	const handle = {} as IRequestHandle;
	let start = new Date().getTime();

	function loop() {
		const current = new Date().getTime();
		const delta = current - start;

		if (delta >= delay) {
			fn();
			start = new Date().getTime();
		}

		handle.id = raf(loop);
	}

	handle.id = raf(loop);
	return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance.
 * @param {number} id ID of the requestInterval() handle
 */
export function clearRequestInterval(id: number) {
	raf.cancel(id);
}

/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance.
 * @param {Function} fn The callback function
 * @param {number} delay The delay in milliseconds
 */

export function requestTimeout(fn: Function, delay: number) {
	const handle = {} as IRequestHandle;
	let start = new Date().getTime();

	function loop() {
		const current = new Date().getTime();
		const delta = current - start;

		if (delta >= delay) {
			fn();
		} else {
			handle.id = raf(loop);
		}
	}

	handle.id = raf(loop);
	return handle;
}

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance.
 * @param {number} id ID of the requestTimeout() handle
 */
export function clearRequestTimeout(id: number) {
	raf.cancel(id);
}
