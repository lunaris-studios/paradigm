import * as Props from "./nine-slice.props";

function error(message: string): string {
	return `${Props.DISPLAYNAME} | ${message}`;
}

export const ERROR_NO_IMAGE = error(
	"component failed to render, no image was provided for the 9-slice border.",
);
