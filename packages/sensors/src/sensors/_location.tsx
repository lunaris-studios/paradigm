import * as React from "react";
import * as Universal from "@paradigmjs/universal";

import * as TS from "~/ts";

export interface ILocationSensorProps
	extends Universal.UniversalProps<ILocationSensorState>,
		TS.ISensorProps {}

export interface ILocationSensorState {
	trigger: string;
	state?: any;
	length?: number;
	hash?: string;
	host?: string;
	hostname?: string;
	href?: string;
	origin?: string;
	pathname?: string;
	port?: string;
	protocol?: string;
	search?: string;
}

const defaultProps = Object.freeze<ILocationSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<ILocationSensorState>({
	trigger: "",
	state: {},
	length: 0,
	hash: "",
	host: "",
	hostname: "",
	href: "",
	origin: "",
	pathname: "",
	port: "",
	protocol: "",
	search: "",
});

export class LocationSensor extends React.Component<
	ILocationSensorProps,
	ILocationSensorState
> {
	public static displayName = "Sensor[Location]";

	constructor(props: ILocationSensorProps) {
		super(props);
	}

	static readonly defaultProps: ILocationSensorProps = defaultProps;
	static readonly defaultState: ILocationSensorState = defaultState;
	readonly state: ILocationSensorState = defaultState;

	private unmounted: boolean = false;

	public componentDidMount() {
		this.handleLocationChange("default");
		this.bindEvents();
	}

	public componentWillUnmount() {
		this.unmounted = true;
		this.unbindEvents();
	}

	private bindEvents() {
		window.addEventListener("popstate", this.handlePopState);
		window.addEventListener("pushstate", this.handlePushState);
		window.addEventListener("replacestate", this.handleReplaceState);
	}

	private unbindEvents() {
		window.removeEventListener("popstate", this.handlePopState);
		window.removeEventListener("pushstate", this.handlePushState);
		window.removeEventListener("replacestate", this.handleReplaceState);
	}

	private handlePopState() {
		this.handleLocationChange("popstate");
	}

	private handlePushState() {
		this.handleLocationChange("pushstate");
	}

	private handleReplaceState() {
		this.handleLocationChange("replacestate");
	}

	private handleLocationChange(trigger: string) {
		if (this.unmounted) {
			return;
		}

		const { history, location } = window;

		const { state, length } = history;

		const {
			hash,
			host,
			hostname,
			href,
			origin,
			pathname,
			port,
			protocol,
			search,
		} = location;

		this.setState({
			hash,
			host,
			hostname,
			href,
			length,
			origin,
			pathname,
			port,
			protocol,
			search,
			state,
			trigger,
		});
	}

	public render() {
		return Universal.render(this.props, this.state);
	}
}

export const withLocationSensor = Universal.createEnhancer(
	LocationSensor,
	"sensors",
	"location",
);
