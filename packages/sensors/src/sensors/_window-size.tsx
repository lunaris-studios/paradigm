import * as React from "react";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as TS from "~/ts";

export interface IWindowSizeSensorProps
	extends Universal.UniversalProps<IWindowSizeSensorState>,
		TS.ISensorProps {}

export interface IWindowSizeSensorState {
	width: number;
	height: number;
}

const defaultProps = Object.freeze<IWindowSizeSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<IWindowSizeSensorState>({
	width: Util.isBrowser() ? window.innerWidth : 0,
	height: Util.isBrowser() ? window.innerHeight : 0,
});

export class WindowSizeSensor extends React.Component<
	IWindowSizeSensorProps,
	IWindowSizeSensorState
> {
	public static displayName = "Sensor[WindowSize]";

	constructor(props: IWindowSizeSensorProps, state: IWindowSizeSensorState) {
		super(props, state);
	}

	static readonly defaultProps: IWindowSizeSensorProps = defaultProps;
	static readonly defaultState: IWindowSizeSensorState = defaultState;
	readonly state: IWindowSizeSensorState = defaultState;

	private unmounted: boolean = false;

	public componentDidMount() {
		this.handleResize();
		this.bindEvents();
	}

	public componentWillUnmount() {
		this.unmounted = true;
		this.unbindEvents();
	}

	public render() {
		return Universal.render(this.props, this.state);
	}

	//

	private bindEvents() {
		window.addEventListener("resize", this.handleResize);
	}

	private unbindEvents() {
		window.removeEventListener("resize", this.handleResize);
	}

	private handleResize = Util.throttle(() => {
		if (this.unmounted) {
			return;
		}
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}, this.props.throttle);
}

export const withWindowSizeSensor = Universal.createEnhancer(
	WindowSizeSensor,
	"sensors",
	"windowSize",
);
