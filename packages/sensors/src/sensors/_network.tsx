import * as React from "react";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as TS from "~/ts";

export interface INetworkSensorProps
	extends Universal.UniversalProps<INetworkSensorState>,
		TS.ISensorProps {}

export interface INetworkSensorState {
	online: boolean;
	offlineAt?: Date;
}

const defaultProps = Object.freeze<INetworkSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<INetworkSensorState>({
	online: false,
	offlineAt: new Date(),
});

export class NetworkSensor extends React.Component<
	INetworkSensorProps,
	INetworkSensorState
> {
	public static displayName = "Sensor[Network]";

	constructor(props: INetworkSensorProps, state: INetworkSensorState) {
		super(props, state);
	}

	static readonly defaultProps: INetworkSensorProps = defaultProps;
	static readonly defaultState: INetworkSensorState = defaultState;
	readonly state: INetworkSensorState = defaultState;

	private unmounted: boolean = false;

	public componentDidMount() {
		if (typeof window !== "undefined" && navigator) {
			this.setState({ online: navigator.onLine });
		}
		this.bindEvents();
	}

	public componentWillUnmount() {
		this.unmounted = true;
		this.unbindEvents();
	}

	private bindEvents() {
		window.addEventListener("online", this.handleOnline);
		window.addEventListener("offline", this.handleOffline);
	}

	private unbindEvents() {
		window.removeEventListener("online", this.handleOnline);
		window.removeEventListener("offline", this.handleOffline);
	}

	private handleOnline() {
		if (this.unmounted) {
			return;
		}

		this.setState({ online: true, offlineAt: undefined });
	}

	private handleOffline() {
		if (this.unmounted) {
			return;
		}

		this.setState({ online: false, offlineAt: new Date() });
	}

	public render() {
		return Universal.render(this.props, this.state);
	}
}

export const withNetworkSensor = Universal.createEnhancer(
	NetworkSensor,
	"sensors",
	"network",
);
