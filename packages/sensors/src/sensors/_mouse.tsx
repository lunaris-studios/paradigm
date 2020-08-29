import * as React from "react";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as TS from "~/ts";

export interface IMouseSensorProps
	extends Universal.UniversalProps<IMouseSensorExports>,
		TS.ISensorProps {}

export interface IMouseSensorState {
	docX: number;
	docY: number;
	posX: number;
	posY: number;
	elH: number;
	elW: number;
	elX: number;
	elY: number;
}

export interface IMouseRefHandlers {
	target: React.Ref<any>;
}

export interface IMouseSensorExports extends IMouseSensorState {
	refHandlers?: IMouseRefHandlers;
}

const defaultProps = Object.freeze<IMouseSensorProps>({
	throttle: 100,
});

const defaultState = Object.freeze<IMouseSensorState>({
	docX: 0,
	docY: 0,
	posX: 0,
	posY: 0,
	elH: 0,
	elW: 0,
	elX: 0,
	elY: 0,
});

export class MouseSensor extends React.Component<IMouseSensorProps, IMouseSensorState> {
	public static displayName = "Sensor[Mouse]";

	constructor(props: IMouseSensorProps) {
		super(props);
	}

	static readonly defaultProps: IMouseSensorProps = defaultProps;
	static readonly defaultState: IMouseSensorState = defaultState;
	readonly state: IMouseSensorState = defaultState;

	private unmounted: boolean = false;

	private targetRef: HTMLElement | null = null;
	private refHandlers: IMouseSensorExports["refHandlers"] = {
		target: (ref) => (this.targetRef = ref),
	};

	public componentDidMount() {
		this.bindEvents();
	}

	public componentWillUnmount() {
		this.unbindEvents();
	}

	private bindEvents() {
		document.addEventListener("mousemove", this.handleMouseMove);
	}

	private unbindEvents() {
		document.removeEventListener("mousemove", this.handleMouseMove);
	}

	private handleMouseMove = Util.throttle((event: MouseEvent) => {
		if (this.unmounted || !this.targetRef) {
			return;
		}

		const { left, top, width: elW, height: elH } = this.targetRef.getBoundingClientRect();
		const posX = left + window.pageXOffset;
		const posY = top + window.pageYOffset;
		const elX = event.pageX - posX;
		const elY = event.pageY - posY;

		this.setState({
			docX: event.pageX,
			docY: event.pageY,
			posX,
			posY,
			elX,
			elY,
			elH,
			elW,
		});
	}, this.props.throttle);

	public render() {
		const { props, refHandlers, state } = this;

		const data = Object.freeze<IMouseSensorExports>({
			...state,
			refHandlers,
		});

		return Universal.render(props, data);
	}
}

export const withMouseSensor = Universal.createEnhancer(MouseSensor, "sensors", "mouse");
