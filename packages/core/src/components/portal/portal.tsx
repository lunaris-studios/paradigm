import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SC from "styled-components";

import * as Common from "~/common";
import * as Util from "~/util";

import * as Styled from "./portal.styled";

/** Detect if `React.createPortal()` API method does not exist. */
const cannotCreatePortal = !Util.isFunction(ReactDOM.createPortal);

export interface IPortalProps extends Common.IProps {
	/**
	 * Callback invoked when the children of this `Portal` have been added to the DOM.
	 */
	onChildrenMount?: () => void;

	/**
	 * The HTML element that children will be mounted to.
	 * @default document.body
	 */
	container: HTMLElement | null;
}

export interface IPortalState {
	hasMounted: boolean;
}

const defaultProps = Object.freeze<IPortalProps>({
	container: typeof document !== "undefined" ? document.body : null,
});

const defaultState = Object.freeze<IPortalState>({
	hasMounted: false,
});

/**
 * This component detaches its contents and re-attaches them to document.body.
 * Use it when you need to circumvent DOM z-stacking (for dialogs, popovers, etc.).
 * Any class names passed to this element will be propagated to the new container element on document.body.
 */
export class Portal extends React.Component<IPortalProps, IPortalState> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Portal`;

	static readonly defaultProps: IPortalProps = defaultProps;
	public readonly state: IPortalState = defaultState;

	public render() {
		const { children, container } = this.props;
		// Only render `children` once this component has mounted in a browser environment, so they are
		// immediately attached to the DOM tree and can do DOM things like measuring or `autoFocus`.
		// See long comment on componentDidMount in https://reactjs.org/docs/portals.html#event-bubbling-through-portals
		if (
			cannotCreatePortal ||
			typeof document === "undefined" ||
			!this.state.hasMounted ||
			!container
		) {
			return null;
		} else {
			return ReactDOM.createPortal(
				<Styled.Portal.Container>{children}</Styled.Portal.Container>,
				container,
			);
		}
	}

	public componentDidMount() {
		if (!this.props.container) {
			return;
		}

		this.setState({ hasMounted: true }, this.props.onChildrenMount);
		if (cannotCreatePortal) {
			this.unstableRenderNoPortal();
		}
	}

	public componentDidUpdate() {
		if (cannotCreatePortal) {
			this.unstableRenderNoPortal();
		}
	}

	private unstableRenderNoPortal() {
		const container = document.createElement("div");
		container.setAttribute(
			"style",
			"position: absolute; top: 0; right: 0; bottom: 0; left: 0;",
		);
		ReactDOM.unstable_renderSubtreeIntoContainer(
			/* parentComponent */ this,
			<div>{this.props.children}</div>,
			container,
		);
	}
}
