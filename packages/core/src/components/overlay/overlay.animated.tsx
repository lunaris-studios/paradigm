import * as React from "react";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Components from "~/components";
import * as Util from "~/util";

import * as Component from "./overlay";
import * as Styled from "./overlay.styled";

export enum Type {
	CONTAINER_TRANSITION = "CONTAINER_TRANSITION",
}

export interface IContainerTransition {
	opacity: number;
	transform: string;
}

export interface IContainerTransitionOptions
	extends Component.IOverlayProps,
		Component.IOverlayLifecycleProps {}

export class Controller {
	public controller: Spring.Controller = new Spring.Controller();
}

/** Transitions */

interface IOverlayContainerTransitionProps extends Component.IOverlayProps {
	render?: any;
}

const defaultOverlayContainerTransitionProps = Object.freeze<
	IOverlayContainerTransitionProps
>({
	isOpen: false,
});

export class OverlayContainerTransition extends React.Component<
	IOverlayContainerTransitionProps
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.OverlayContainerTransition`;

	public readonly defaultProps: IOverlayContainerTransitionProps = defaultOverlayContainerTransitionProps;

	public render() {
		const { children, isOpen, onClosed, onClosing, onOpened, onOpening } = this.props;
		const { render: Component } = this.props;

		return (
			Component && (
				<Spring.Transition
					items={isOpen}
					from={{
						opacity: 0,
						transform: "translate3d(0%, -100%, 0%)",
					}}
					enter={() => async (next) => {
						await next({ opacity: 1, transform: "translate3d(100%, 0%, 0%)" });
					}}
					leave={() => async (next) => {
						await next({
							opacity: 0,
							transform: "translate3d(100%, 0%, 0%)",
						});
					}}
					onStart={() => {
						if (isOpen && Util.isFunction(onOpening)) return onOpening();
						if (!isOpen && Util.isFunction(onClosing)) return onClosing();
						return;
					}}
					onRest={() => {
						if (isOpen && Util.isFunction(onOpened)) return onOpened();
						if (!isOpen && Util.isFunction(onClosed)) return onClosed();
						return;
					}}
				>
					{(style, visible) => visible && <Component style={style} />}
				</Spring.Transition>
			)
		);
	}
}
