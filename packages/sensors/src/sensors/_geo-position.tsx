import * as React from "react";
import * as Universal from "@paradigmjs/universal";

import * as TS from "~/ts";

export interface IGeoPositionSensorProps
	extends Universal.UniversalProps<IGeoPositionSensorState & IGeoPositionSensorExports>,
		TS.ISensorProps {}

export interface IGeoPositionSensorState {
	isLoading: boolean;
	coords: {
		longitude: number;
		latitude: number;
	};
	error: PositionError | null;
}

export interface IGeoPositionSensorExports {
	requestGeoPosition?: () => void;
}

const defaultProps = Object.freeze<IGeoPositionSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<IGeoPositionSensorState>({
	isLoading: false,
	coords: {
		longitude: 0,
		latitude: 0,
	},
	error: null,
});

export class GeoPositionSensor extends React.Component<
	IGeoPositionSensorProps,
	IGeoPositionSensorState
> {
	public static displayName = "Sensor[GeoPosition]";

	constructor(props: IGeoPositionSensorProps) {
		super(props);

		this.requestGeoPosition = this.requestGeoPosition.bind(this);
	}

	static readonly defaultProps: IGeoPositionSensorProps = defaultProps;
	static readonly defaultState: IGeoPositionSensorState = defaultState;
	readonly state: IGeoPositionSensorState = defaultState;

	private unmounted: boolean = false;
	private geoID: number = 0;

	public componentWillUnmount() {
		this.unmounted = true;
	}

	public requestGeoPosition() {
		if (this.unmounted) {
			return;
		}

		this.setState({ isLoading: true });
		this.geoID = navigator.geolocation.watchPosition(
			(position: Position) =>
				this.setState({
					isLoading: false,
					coords: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					},
					error: null,
				}),
			(error: PositionError) => this.setState({ error, isLoading: false }),
		);
	}

	public render() {
		const { props, requestGeoPosition, state } = this;

		const data = Object.freeze({
			...state,
			requestGeoPosition,
		});

		return Universal.render(props, data);
	}
}

export const withGeoPositionSensor = Universal.createEnhancer(
	GeoPositionSensor,
	"sensors",
	"geoPosition",
);
