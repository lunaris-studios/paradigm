import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import "jest-styled-components";
import "jest-extended";

/**
 * Default sensor attributes.
 */
export interface ISensorProps {
	/**
	 * The time in milliseconds to throttle invocations of the corresponding sensor.
	 */
	throttle: number;
}
