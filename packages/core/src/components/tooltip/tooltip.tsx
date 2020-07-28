import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

export interface ITooltipProps extends IPopoverSharedProps, Common.IIntentProps {
	/**
	 * The content that will be displayed inside of the tooltip.
	 */
	content: JSX.Element | string;

	/**
	 * The amount of time in milliseconds the tooltip should remain open after
	 * the user hovers off the trigger. The timer is canceled if the user mouses
	 * over the target before it expires.
	 * @default 0
	 */
	hoverCloseDelay?: number;

	/**
	 * The amount of time in milliseconds the tooltip should wait before opening
	 * after the user hovers over the trigger. The timer is canceled if the user
	 * mouses away from the target before it expires.
	 * @default 100
	 */
	hoverOpenDelay?: number;

	/**
	 * The kind of hover interaction that triggers the display of the tooltip.
	 * Tooltips do not support click interactions.
	 * @default PopoverInteractionKind.HOVER_TARGET_ONLY
	 */
	interactionKind?:
		| typeof PopoverInteractionKind.HOVER
		| typeof PopoverInteractionKind.HOVER_TARGET_ONLY;

	/**
	 * Indicates how long (in milliseconds) the tooltip's appear/disappear
	 * transition takes. This is used by React `CSSTransition` to know when a
	 * transition completes and must match the duration of the animation in CSS.
	 * Only set this prop if you override Blueprint's default transitions with
	 * new transitions of a different length.
	 * @default 100
	 */
	transitionDuration?: number;
}

const defaultProps = Object.freeze<ITooltipProps>({
	content: null,
	hoverCloseDelay: 0,
	hoverOpenDelay: 100,
	transitionDuration: 100,
});

export class Tooltip extends Components.AbstractPureComponent<ITooltipProps, {}> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Tooltip`;

	static readonly defaultProps: ITooltipProps = defaultProps;

	private popover: Popover | null = null;

	public reposition() {
		if (this.popover != null) {
			this.popover.reposition();
		}
	}

	public render() {
		const { children, intent, popoverClassName, ...restProps } = this.props;
		const classes = classNames(
			Classes.TOOLTIP,
			Classes.intentClass(intent),
			popoverClassName,
		);

		return (
			<Components.Popover
				interactionKind={PopoverInteractionKind.HOVER_TARGET_ONLY}
				{...restProps}
				autoFocus={false}
				canEscapeKeyClose={false}
				enforceFocus={false}
				lazy={true}
				popoverClassName={classes}
				portalContainer={this.props.portalContainer}
				ref={(ref) => (this.popover = ref)}
			>
				{children}
			</Components.Popover>
		);
	}
}
