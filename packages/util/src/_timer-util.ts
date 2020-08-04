/**
 * Acknowledgements:
 * - @kambing86 (https://github.com/kambing86/requestanimationframe-timer)
 */

import { default as raf } from "raf";

enum MODE {
	INTERVAL = 0,
	TIMEOUT = 1,
}

type ExecutionFn = (...args: any[]) => void;

interface Execution {
	fn: ExecutionFn;
	ms: number;
	args: any[];
	mode: MODE;
}

interface NextExecution extends Execution {
	/**
	 * Timestamp in milliseconds at which the
	 * timing executable should be called.
	 */
	nextTick: number;
}

const executionQueue = new Map<number, NextExecution>();
const executionActive = new Set<NextExecution>();

let loopStarted = false;
let executableId = 0;

/**
 * Gets the current time value in milliseconds.
 */
function getTimeStampMS(): number {
	return new Date().getTime();
}

/**
 * Iterate through active timing executables and run
 * the provided action.
 */
function runActive(): void {
	if (executionActive.size === 0) {
		return;
	}

	executionActive.forEach((next: NextExecution) => {
		const { fn, args } = next;
		fn(...args);
	});

	executionActive.clear();
}

/**
 * Check whether or not the timing executables in the current queue
 * should be executed, removed from the queue, or tick timing updated.
 *
 * - [IF] the executable is to be run, add it to the `executionActive`
 *   for to be processed by `runActive`.
 *
 *   - [IF] the timing executable is of type `setTimeout`, remove it from
 *     the execution `executionMap` queue.
 *
 *   - [ELSE] the timing executable is of type `setInterval`, set the updated
 *     `nextTick` value based on its base interval frequency `ms`.
 */
function checkQueue(currentTimeTick: number): void {
	executionQueue.forEach((value, id) => {
		const { nextTick, ms, mode } = value;

		if (currentTimeTick - nextTick >= 0) {
			executionActive.add(value);
			if (mode === MODE.TIMEOUT) {
				executionQueue.delete(id);
			} else {
				executionQueue.set(id, {
					...value,
					nextTick: nextTick + ms,
				});
			}
		}
	});
}

/**
 * Returns `true` if the `executionMap` is empty, signalling that
 * there are no active executables in the current queue, and to stop
 * looping.
 */
function shouldStopLoop(): boolean {
	return Boolean(executionQueue.size === 0);
}

function loop() {
	if (shouldStopLoop()) {
		loopStarted = false;
		return;
	}

	const currentTimeTick = getTimeStampMS();

	checkQueue(currentTimeTick);
	runActive();

	if (shouldStopLoop()) {
		loopStarted = false;
		return;
	}

	raf(loop);
}

/**
 * Add timing executable to the execution queue.
 */
function addTimingExecutable(execution: Execution) {
	const { fn, ms, args, mode } = execution;

	if (!!!fn) {
		return null;
	}

	const currentExecutableId = executableId;

	executionQueue.set(currentExecutableId, {
		fn,
		ms,
		nextTick: getTimeStampMS() + ms,
		args,
		mode,
	});

	if (!!!loopStarted) {
		loopStarted = true;
		raf(loop);
	}

	/**
	 * Increase the `executionId` every time `addTimingExecutable` is
	 * invoked to provide a unique for the next executable.
	 */
	executableId += 1;

	return currentExecutableId;
}

/**
 * If execution queue contains the corresponding timing id,
 * remove it from the queue.
 */
function removeTimingExecutable(id: number) {
	if (executionQueue.has(id)) {
		executionQueue.delete(id);
	}
}

export function setTimeout(fn: ExecutionFn, timeout = 0, ...args: any[]) {
	return addTimingExecutable({ fn, ms: timeout, args, mode: MODE.TIMEOUT });
}
export function setInterval(fn: ExecutionFn, interval = 0, ...args: any[]) {
	return addTimingExecutable({ fn, ms: interval, args, mode: MODE.INTERVAL });
}

export const clearTimeout = removeTimingExecutable;
export const clearInterval = removeTimingExecutable;

export default { setTimeout, setInterval, clearTimeout, clearInterval };
