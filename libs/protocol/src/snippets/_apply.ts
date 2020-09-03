import * as SC from "styled-components";

/**
 * Parses an object and returns a new object with only
 * valid JSS key:value pairs.
 */
export function apply(obj: any): SC.FlattenInterpolation<SC.DefaultTheme> {
	return SC.css`${obj}`;
}
