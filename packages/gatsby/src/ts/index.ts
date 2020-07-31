import * as React from "react";

/**
 * Default sensor attributes.
 */
export interface ISensorProps {
	/**
	 * The time in milliseconds to throttle invocations of the corresponding sensor.
	 */
	throttle: number;
}
