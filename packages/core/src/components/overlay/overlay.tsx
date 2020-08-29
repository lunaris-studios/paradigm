import * as Abstract from "@paradigmjs/abstract";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Spring from "react-spring";

import * as Common from "~/common";

import * as Util from "~/util";

import * as Animated from "./overlay.animated";
import * as Styled from "./overlay.styled";

import { Portal } from "../portal/portal";

/**
 * [Overlay]
 * - [Portal(COMPONENT)]
 * - - [Overlay.Container(WRAPPER)]
 * - - - [Overlay.Content(WRAPPER)]
 * - - - [Overlay.Backdrop(ELEMENT)]
 */

export interface IOverlayableProps extends IOverlayLifecycleProps {
	/**
	 * Whether the overlay should acquire application focus when it first opens.
	 * @default true
	 */
	autoFocus?: boolean;

	/**
	 * Whether pressing the `esc` key should invoke `onClose`.
	 * @default true
	 */
	canEscapeKeyClose?: boolean;

	/**
	 * Whether the overlay should prevent focus from leaving itself. That is, if the user attempts
	 * to focus an element outside the overlay and this prop is enabled, then the overlay will
	 * immediately bring focus back to itself. If you are nesting overlay components, either disable
	 * this prop on the "outermost" overlays or mark the nested ones `usePortal={false}`.
	 * @default true
	 */
	enforceFocus?: boolean;

	/**
	 * If `true` and `usePortal={true}`, the `Portal` containing the children is created and attached
	 * to the DOM when the overlay is opened for the first time; otherwise this happens when the
	 * component mounts. Lazy mounting provides noticeable performance improvements if you have lots
	 * of overlays at once, such as on each row of a table.
	 * @default true
	 */
	lazy?: boolean;

	/**
	 * Whether the overlay should be wrapped in a `Portal`, which renders its contents in a new
	 * element attached to `portalContainer` prop.
	 *
	 * This prop essentially determines which element is covered by the backdrop: if `false`,
	 * then only its parent is covered; otherwise, the entire page is covered (because the parent
	 * of the `Portal` is the `<body>` itself).
	 *
	 * Set this prop to `false` on nested overlays (such as `Dialog` or `Popover`) to ensure that they
	 * are rendered above their parents.
	 * @default true
	 */
	usePortal?: boolean;

	/**
	 * The container element into which the overlay renders its contents, when `usePortal` is `true`.
	 * This prop is ignored if `usePortal` is `false`.
	 * @default document.body
	 */
	portalContainer?: HTMLElement;

	/**
	 * A callback that is invoked when user interaction causes the overlay to close, such as
	 * clicking on the overlay or pressing the `esc` key (if enabled).
	 *
	 * Receives the event from the user's interaction, if there was an event (generally either a
	 * mouse or key event). Note that, since this component is controlled by the `isOpen` prop, it
	 * will not actually close itself until that prop becomes `false`.
	 */
	onClose?: (event?: React.SyntheticEvent<HTMLElement>) => void;
}

export interface IOverlayProps extends IOverlayLifecycleProps, Common.IChildren {
	/**
	 * Whether the overlay should acquire application focus when it first opens.
	 * @default true
	 */
	autoFocus?: boolean;

	/**
	 * Whether pressing the `esc` key should invoke `onClose`.
	 * @default true
	 */
	canEscapeKeyClose?: boolean;

	/**
	 * Whether clicking outside the overlay element (either on backdrop when present or on document)
	 * should invoke `onClose`.
	 * @default true
	 */
	canOutsideClickClose?: boolean;

	/**
	 * Whether the overlay should prevent focus from leaving itself. That is, if the user attempts
	 * to focus an element outside the overlay and this prop is enabled, then the overlay will
	 * immediately bring focus back to itself. If you are nesting overlay components, either disable
	 * this prop on the "outermost" overlays or mark the nested ones `usePortal={false}`.
	 * @default true
	 */
	enforceFocus?: boolean;

	/**
	 * Whether a container-spanning backdrop element should be rendered behind the contents.
	 * @default true
	 */
	hasBackdrop?: boolean;

	/**
	 * Toggles the visibility of the overlay and its children.
	 * This prop is required because the component is controlled.
	 * @default false
	 */
	isOpen: boolean;

	/**
	 * If `true` and `usePortal={true}`, the `Portal` containing the children is created and attached
	 * to the DOM when the overlay is opened for the first time; otherwise this happens when the
	 * component mounts. Lazy mounting provides noticeable performance improvements if you have lots
	 * of overlays at once, such as on each row of a table.
	 * @default true
	 */
	lazy?: boolean;

	/**
	 * A callback that is invoked when user interaction causes the overlay to close, such as
	 * clicking on the overlay or pressing the `esc` key (if enabled).
	 *
	 * Receives the event from the user's interaction, if there was an event (generally either a
	 * mouse or key event). Note that, since this component is controlled by the `isOpen` prop, it
	 * will not actually close itself until that prop becomes `false`.
	 */
	onClose?: (event?: React.SyntheticEvent<HTMLElement>) => void;

	/**
	 * Whether the overlay should be wrapped in a `Portal`, which renders its contents in a new
	 * element attached to `portalContainer` prop.
	 *
	 * This prop essentially determines which element is covered by the backdrop: if `false`,
	 * then only its parent is covered; otherwise, the entire page is covered (because the parent
	 * of the `Portal` is the `<body>` itself).
	 *
	 * Set this prop to `false` on nested overlays (such as `Dialog` or `Popover`) to ensure that they
	 * are rendered above their parents.
	 * @default true
	 */
	usePortal?: boolean;
}

export interface IOverlayLifecycleProps {
	/**
	 * Lifecycle method invoked just before the CSS _close_ transition begins on
	 * a child. Receives the DOM element of the child being closed.
	 */
	onClosing?: () => void;

	/**
	 * Lifecycle method invoked just after the CSS _close_ transition ends but
	 * before the child has been removed from the DOM. Receives the DOM element
	 * of the child being closed.
	 */
	onClosed?: () => void;

	/**
	 * Lifecycle method invoked just after mounting the child in the DOM but
	 * just before the CSS _open_ transition begins. Receives the DOM element of
	 * the child being opened.
	 */
	onOpening?: () => void;

	/**
	 * Lifecycle method invoked just after the CSS _open_ transition ends.
	 * Receives the DOM element of the child being opened.
	 */
	onOpened?: () => void;
}

export interface IBackdropProps {
	/** CSS class names to apply to backdrop element. */
	backdropClassName?: string;

	/** HTML props for the backdrop element. */
	backdropProps?: React.HTMLProps<HTMLDivElement>;

	/**
	 * Whether clicking outside the overlay element (either on backdrop when present or on document)
	 * should invoke `onClose`.
	 * @default true
	 */
	canOutsideClickClose?: boolean;

	/**
	 * Whether a container-spanning backdrop element should be rendered behind the contents.
	 * @default true
	 */
	hasBackdrop?: boolean;
}

export interface IOverlayProps extends IOverlayableProps, IBackdropProps, Common.IProps {
	/**
	 * Toggles the visibility of the overlay and its children.
	 * This prop is required because the component is controlled.
	 */
	isOpen: boolean;
}

export interface IOverlayState {
	/**
	 * Indicates whether or not the overlay has opened, maintains a positive state
	 * when set.
	 */
	hasEverOpened?: boolean;
}

const defaultProps = Object.freeze<IOverlayProps>({
	autoFocus: true,
	canEscapeKeyClose: true,
	canOutsideClickClose: true,
	enforceFocus: true,
	isOpen: false,
	hasBackdrop: true,
	lazy: true,
	usePortal: true,
});

const defaultState = Object.freeze<IOverlayState>({
	hasEverOpened: false,
});

export class Overlay extends Abstract.AbstractPureComponent<
	IOverlayProps,
	IOverlayState
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Overlay`;

	constructor(props: IOverlayProps) {
		super(props);

		this.handleBackdropMouseDown = this.handleBackdropMouseDown.bind(this);
		this.handleDocumentClick = this.handleDocumentClick.bind(this);
		this.handleDocumentFocus = this.handleDocumentFocus.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	public static readonly defaultProps: IOverlayProps = defaultProps;
	public static readonly defaultState: IOverlayState = defaultState;

	public state: IOverlayState = { hasEverOpened: this.props.isOpen };
	private animated: Animated.Controller = new Animated.Controller();

	public containerRef: React.RefObject<HTMLDivElement> = React.createRef();

	public componentDidMount() {
		if (this.props.isOpen) {
			this.overlayWillOpen();
		}
	}

	public componentDidUpdate(prevProps: IOverlayProps): void {
		if (prevProps.isOpen && !this.props.isOpen) {
			this.overlayWillClose();
		} else if (!prevProps.isOpen && this.props.isOpen) {
			this.overlayWillOpen();
		}
	}

	public componentWillUnmount(): void {
		this.overlayWillClose();
	}

	public render() {
		/** No reason to render anything at all if we're being truly lazy */
		if (this.props.lazy && !this.state.hasEverOpened) {
			return null;
		}

		const {
			children,
			canOutsideClickClose,
			hasBackdrop,
			isOpen,
			onClosing,
			onClosed,
			onOpening,
			onOpened,
			usePortal,
		} = this.props;

		const transitionContent = (
			<Styled.Overlay.Container
				onKeyDown={this.handleKeyDown}
				ref={this.containerRef}
				isOpen={isOpen}
			>
				<Styled.Overlay.Content>{children}</Styled.Overlay.Content>
				{hasBackdrop && (
					<Styled.Overlay.Backdrop
						onMouseDown={this.handleBackdropMouseDown}
						tabIndex={canOutsideClickClose ? 0 : -1}
					/>
				)}
			</Styled.Overlay.Container>
		);

		const transitionGroup = (
			<Animated.OverlayContainerTransition
				isOpen={isOpen}
				onClosing={onClosing}
				onClosed={onClosed}
				onOpening={onOpening}
				onOpened={onOpened}
				render={transitionContent}
			/>
		);

		return usePortal ? <Portal>{transitionGroup}</Portal> : transitionGroup;
	}

	/** */

	private overlayWillOpen(): void {
		const { autoFocus, enforceFocus, canOutsideClickClose, hasBackdrop } = this.props;

		if (autoFocus) {
			this.focusOverlay();
		}

		if (enforceFocus) {
			document.addEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
		}

		if (canOutsideClickClose && !hasBackdrop) {
			document.addEventListener("mousedown", this.handleDocumentClick);
		}
	}

	private overlayWillClose(): void {
		document.removeEventListener(
			"focus",
			this.handleDocumentFocus,
			/* useCapture */ true,
		);
		document.removeEventListener("mousedown", this.handleDocumentClick);
	}

	private handleDocumentClick(event: MouseEvent): void {
		const { canOutsideClickClose, isOpen, onClose } = this.props;
		const eventTarget = event.target as HTMLElement;

		const isClickInThisOverlayOrDescendant =
			this.containerRef.current &&
			this.containerRef.current.contains(eventTarget) &&
			!this.containerRef.current.isSameNode(eventTarget);

		if (isOpen && canOutsideClickClose && !isClickInThisOverlayOrDescendant) {
			// casting to any because this is a native event
			Util.safeInvoke(onClose, event as any);
		}
	}

	private handleBackdropMouseDown(event: React.MouseEvent<HTMLDivElement>) {
		const { canOutsideClickClose, enforceFocus, onClose } = this.props;
		if (canOutsideClickClose) {
			Util.safeInvoke(onClose, event);
		}

		if (enforceFocus) {
			// make sure document.activeElement is updated before bringing the focus back
			this.focusOverlay();
		}
	}

	private handleDocumentFocus(event: FocusEvent): void {
		const { enforceFocus } = this.props;
		if (
			enforceFocus &&
			this.containerRef.current != null &&
			event.target instanceof Node &&
			!this.containerRef.current.contains(event.target as HTMLElement)
		) {
			// prevent default focus behavior (sometimes auto-scrolls the page)
			event.preventDefault();
			event.stopImmediatePropagation();
			this.focusOverlay();
		}
	}

	private focusOverlay(): void {
		// container ref may be undefined between component mounting and Portal rendering
		// activeElement may be undefined in some rare cases in IE
		if (
			this.containerRef.current == null ||
			document.activeElement == null ||
			!this.props.isOpen
		) {
			return;
		}

		const isFocusOutsideModal = !this.containerRef.current.contains(
			document.activeElement,
		);
		if (isFocusOutsideModal) {
			this.containerRef.current.focus();
		}
	}

	private handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
		const { canEscapeKeyClose, onClose } = this.props;
		if (event.which === Protocol.Key.ESCAPE && canEscapeKeyClose) {
			Util.safeInvoke(onClose, event);
			// prevent browser-specific escape key behavior (Safari exits fullscreen)
			event.preventDefault();
		}
	}
}
