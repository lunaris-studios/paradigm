import * as SC from "styled-components";

import { css } from "styled-components";

/**
 * Non-intrusive, bold border used to debug bounding boxes for elements.
 */
export function debug(): SC.FlattenSimpleInterpolation {
	return css`
		border: 1px solid red;
	`;
}
