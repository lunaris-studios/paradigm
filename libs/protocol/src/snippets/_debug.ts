import * as SC from "styled-components";
// re-import
import styled, { css } from "styled-components";

import * as Util from "$protocol/util";

import { Stage } from "../constants/_stage";

/**
 * Non-intrusive, bold border used to debug bounding boxes for elements. We also check
 * that the current `process.env.NODE_ENV` is equal to `development` so this never
 * never hits a staging / production build.
 */
export function debug(): SC.FlattenSimpleInterpolation {
	return Util.isNodeEnv(Stage.DEVELOPMENT)
		? css`
				border: 1px solid red;
		  `
		: css``;
}
