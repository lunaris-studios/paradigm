import * as Constants from "~/constants";

export interface Binds {
	/**
	 * Used to identify the current client window size.
	 * @default Breakpoint.DESKTOP
	 */
	device: Constants.Device;

	/**
	 * Used to indicate the global color scheme for the client.
	 * @default Scheme.LIGHT
	 */
	scheme: Constants.Scheme;
}

export interface Theme {
	binds: Binds;
	alignments: typeof Constants.Alignment;
	boundaries: typeof Constants.Boundary;
	breakpoints: typeof Constants.Breakpoint;
	colors: typeof Constants.Color;
	devices: typeof Constants.Device;
	elevations: typeof Constants.Elevation;
	intents: typeof Constants.Intent;
	keys: typeof Constants.Key;
	positions: typeof Constants.Position;
	schemes: typeof Constants.Scheme;
	sizes: typeof Constants.Size;
	spaces: typeof Constants.Space;
}

/** Default theme values for root `styled-compoents` <ThemeProvider> */
export const Theme = Object.freeze<Theme>({
	binds: {
		device: Constants.Device.DESKTOP,
		scheme: Constants.Scheme.DARK,
	},
	alignments: Constants.Alignment,
	boundaries: Constants.Boundary,
	breakpoints: Constants.Breakpoint,
	colors: Constants.Color,
	devices: Constants.Device,
	elevations: Constants.Elevation,
	intents: Constants.Intent,
	keys: Constants.Key,
	positions: Constants.Position,
	schemes: Constants.Scheme,
	sizes: Constants.Size,
	spaces: Constants.Space,
});
