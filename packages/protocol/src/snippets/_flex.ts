import * as CSS from "csstype";
import { css } from "styled-components";

/** */
export function flex(
	flexDirection: CSS.FlexDirectionProperty = "row",
	justifyContent: CSS.JustifyContentProperty = "center",
	alignItems: CSS.AlignItemsProperty = "center",
) {
	return css`
		display: flex;
		flex-direction: ${flexDirection};
		justify-content: ${justifyContent};
		align-items: ${alignItems};
	`;
}
