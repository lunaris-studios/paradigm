import * as React from "react";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as TS from "~/ts";

export interface IDeviceMotionSensorProps
	extends Universal.UniversalProps<IDeviceMotionSensorState>,
		TS.ISensorProps {}

export interface IDeviceMotionSensorState {
	acceleration: DeviceMotionEvent["acceleration"];
	accelerationIncludingGravity: DeviceMotionEvent["accelerationIncludingGravity"];
	rotationRate: DeviceMotionEvent["rotationRate"];
	interval: DeviceMotionEvent["interval"];
}

const defaultProps = Object.freeze<IDeviceMotionSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<IDeviceMotionSensorState>({
	acceleration: null,
	accelerationIncludingGravity: null,
	rotationRate: null,
	interval: 0,
});

export class DeviceMotionSensor extends React.Component<
	IDeviceMotionSensorProps,
	IDeviceMotionSensorState
> {
	public static displayName = "Sensor[DeviceMotion]";

	constructor(props: IDeviceMotionSensorProps) {
		super(props);
	}

	public static readonly defaultProps: IDeviceMotionSensorProps = defaultProps;
	public static readonly defaultState: IDeviceMotionSensorState = defaultState;
	public readonly state: IDeviceMotionSensorState = defaultState;

	private unmounted: boolean = false;

	public componentDidMount() {
		this.bindEvents();
	}

	public componentWillUnmount() {
		this.unmounted = true;
		this.unbindEvents();
	}

	private bindEvents() {
		window.addEventListener("devicemotion", this.handleDeviceMotion);
	}

	private unbindEvents() {
		window.removeEventListener("devicemotion", this.handleDeviceMotion);
	}

	private handleDeviceMotion = Util.throttle((event: DeviceMotionEvent) => {
		if (this.unmounted) {
			return;
		}

		const { acceleration, accelerationIncludingGravity, rotationRate, interval } = event;

		this.setState({
			acceleration,
			accelerationIncludingGravity,
			rotationRate,
			interval,
		});
	}, this.props.throttle);

	public render() {
		return Universal.render(this.props, this.state);
	}
}

export const withDeviceMotionSensor = Universal.createEnhancer(
	DeviceMotionSensor,
	"sensors",
	"deviceMotion",
);
