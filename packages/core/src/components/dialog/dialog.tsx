import * as Icons from "@paradigmjs/icons";
import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

export interface IDialogProps
	extends Components.IOverlayableProps,
		Components.IBackdropProps,
		Common.IProps {
	/**
	 * Toggles the visibility of the overlay and its children.
	 * This prop is required because the component is controlled.
	 */
	isOpen: boolean;

	/**
	 * Dialog always has a backdrop so this prop is excluded from the public API.
	 * @internal
	 */
	hasBackdrop?: boolean;

	/**
	 * Name of a Blueprint UI icon (or an icon element) to render in the
	 * dialog's header. Note that the header will only be rendered if `title` is
	 * provided.
	 * @default null
	 */
	icon?: Nullable<Icons.IconName | Common.MaybeElement>;

	/**
	 * Whether to show the close button in the dialog's header.
	 * Note that the header will only be rendered if `title` is provided.
	 * @default true
	 */
	isCloseButtonShown?: boolean;

	/**
	 * CSS styles to apply to the dialog.
	 * @default {}
	 */
	style?: React.CSSProperties;

	/**
	 * Title of the dialog. If provided, an element with `Classes.DIALOG_HEADER`
	 * will be rendered inside the dialog before any children elements.
	 */
	title?: React.ReactNode;

	/**
	 * Name of the transition for internal `CSSTransition`. Providing your own
	 * name here will require defining new CSS transition properties.
	 */
	transitionName?: string;
}

const defaultProps = Object.freeze<IDialogProps>({
	canOutsideClickClose: true,
	isOpen: false,
});

export class Dialog extends Components.AbstractPureComponent<IDialogProps, {}> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Dialog`;

	static readonly defaultProps: IDialogProps = defaultProps;

	public render() {
		return (
			<Components.Overlay
				{...this.props}
				className={Classes.OVERLAY_SCROLL_CONTAINER}
				hasBackdrop={true}
			>
				<div className={Classes.DIALOG_CONTAINER}>
					<div
						className={classNames(Classes.DIALOG, this.props.className)}
						style={this.props.style}
					>
						{this.maybeRenderHeader()}
						{this.props.children}
					</div>
				</div>
			</Components.Overlay>
		);
	}

	protected validateProps(props: IDialogProps) {
		if (props.title == null) {
			if (props.icon != null) {
				console.warn(Errors.DIALOG_WARN_NO_HEADER_ICON);
			}
			if (props.isCloseButtonShown != null) {
				console.warn(Errors.DIALOG_WARN_NO_HEADER_CLOSE_BUTTON);
			}
		}
	}

	private maybeRenderCloseButton() {
		const { isCloseButtonShown, onClose } = this.props;
		// show close button if prop is undefined or null
		// this gives us a behavior as if the default value were `true`
		if (isCloseButtonShown !== false) {
			return (
				<Components.Button
					aria-label="Close"
					// className={Classes.DIALOG_CLOSE_BUTTON}
					icon={<Icon icon="small-cross" iconSize={Icon.SIZE_LARGE} />}
					minimal={true}
					onClick={onClose}
				/>
			);
		} else {
			return undefined;
		}
	}

	private maybeRenderHeader() {
		const { icon, title } = this.props;
		if (title == null) {
			return undefined;
		}
		return (
			<div className={Classes.DIALOG_HEADER}>
				<Icon icon={icon} iconSize={Icon.SIZE_LARGE} />
				<H4>{title}</H4>
				{this.maybeRenderCloseButton()}
			</div>
		);
	}
}
