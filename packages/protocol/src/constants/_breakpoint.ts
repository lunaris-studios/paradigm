import { Device } from "./_device";

/** */
export const Breakpoint = Object.freeze({
	// Extra small devices (phones)
	[Device.MOBILE]: {
		min: 300,
		max: 767,
	},
	// Small devices (tablets)
	[Device.TABLET]: {
		min: 768,
		max: 991,
	},
	// Medium devices (desktops)
	[Device.DESKTOP]: {
		min: 992,
		max: 1199,
	},
	// Large devices (large desktops)
	[Device.ULTRAWIDE]: {
		min: 1200,
		max: Infinity,
	},
});

export type Breakpoint = typeof Breakpoint;
