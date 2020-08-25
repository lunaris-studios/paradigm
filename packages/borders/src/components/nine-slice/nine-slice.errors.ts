import * as Props from "./nine-slice.props";

function error(message: string): string {
	return `${Props.DISPLAYNAME} | ${message}`;
}

export const WARN_NO_HEIGHT = error("height prop will default to 100px");
export const WARN_NO_CORNER = error("cornerLength prop will default to 25px");
export const WARN_NO_WIDTH = error("width prop will default to 100px");

export const ERROR_NO_IMAGE = error(
	"component failed to render, no image was provided for the 9-slice",
);
