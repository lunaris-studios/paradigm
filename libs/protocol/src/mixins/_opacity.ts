import { bind } from "../";
import * as Constants from "$protocol/constants";

export const borderShadowOpacity = bind("scheme", {
	[Constants.Scheme.LIGHT]: "",
	[Constants.Scheme.DARK]: "",
});

export const dropShadowOpacity = bind("scheme", {
	[Constants.Scheme.LIGHT]: "",
	[Constants.Scheme.DARK]: "",
});
