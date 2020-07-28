import * as React from "react";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as TS from "~/ts";

export interface IDeviceOrientationSensorProps
	extends Universal.UniversalProps<IDeviceOrientationSensorState>,
		TS.ISensorProps {}

export interface IDeviceOrientationSensorState {
	alpha: DeviceOrientationEvent["alpha"];
	beta: DeviceOrientationEvent["beta"];
	gamma: DeviceOrientationEvent["gamma"];
	absolute: DeviceOrientationEvent["absolute"];
}

const defaultProps = Object.freeze<IDeviceOrientationSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<IDeviceOrientationSensorState>({
	alpha: 0,
	beta: 0,
	gamma: 0,
	absolute: false,
});

export class DeviceOrientationSensor extends React.Component<
	IDeviceOrientationSensorProps,
	IDeviceOrientationSensorState
> {
	public static displayName = `Sensor[DeviceOrientation]`;

	constructor(props: IDeviceOrientationSensorProps) {
		super(props);
	}

	public static readonly defaultProps: IDeviceOrientationSensorProps = defaultProps;
	public static readonly defaultState: IDeviceOrientationSensorState = defaultState;
	public readonly state: IDeviceOrientationSensorState = defaultState;

	private unmounted: boolean = false;

	public componentDidMount() {
		this.bindEvents();
	}

	public componentWillUnmount() {
		this.unmounted = true;
		this.unbindEvents();
	}

	private bindEvents() {
		window.addEventListener("deviceorientation", this.handleDeviceOrientation);
	}

	private unbindEvents() {
		window.removeEventListener("deviceorientation", this.handleDeviceOrientation);
	}

	private handleDeviceOrientation = Util.throttle((event: DeviceOrientationEvent) => {
		if (this.unmounted) {
			return;
		}

		const { beta, alpha, gamma, absolute } = event;

		this.setState({
			beta,
			alpha,
			gamma,
			absolute,
		});
	}, this.props.throttle);

	public render() {
		return Universal.render(this.props, this.state);
	}
}

export const withDeviceOrientationSensor = Universal.createEnhancer(
	DeviceOrientationSensor,
	"sensors",
	"deviceOrientation",
);
