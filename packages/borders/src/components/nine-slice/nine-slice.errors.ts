import * as Component from "./nine-slice";

export function createErrorMessage(message: string): string {
	return `${Component.NineSlice.displayName} | ${message}`;
}

export const WARN_NO_HEIGHT = createErrorMessage("height prop will default to 100px");
export const WARN_NO_CORNER = createErrorMessage(
	"cornerLength prop will default to 25px",
);
export const WARN_NO_WIDTH = createErrorMessage("width prop will default to 100px");
export const ERROR_NO_IMAGE = createErrorMessage(
	"component failed to render, no image was provided for the 9-slice",
);
