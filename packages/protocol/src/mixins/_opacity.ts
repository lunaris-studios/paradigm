import * as BIN from "~/bin";
import * as Constants from "~/constants";

export const borderShadowOpacity = BIN.bind("scheme", {
	[Constants.Scheme.LIGHT]: "",
	[Constants.Scheme.DARK]: "",
});

export const dropShadowOpacity = BIN.bind("scheme", {
	[Constants.Scheme.LIGHT]: "",
	[Constants.Scheme.DARK]: "",
});
