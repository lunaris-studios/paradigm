import * as Abstract from "@paradigmjs/abstract";
import * as Icons from "@paradigmjs/icons";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Components from "~/components";
import * as Util from "~/util";

import * as Styled from "./button.styled";

export interface IAbstractButtonProps extends Common.IActionProps {
	/**
	 * If set to `true`, the button will display in an active state.
	 * This is equivalent to setting `className={Classes.ACTIVE}`.
	 * @default false
	 */
	active: boolean;

	/**
	 * Text alignment within button. By default, icons and text will be centered
	 * within the button. Passing `"left"` or `"right"` will align the button
	 * text to that side and push `icon` and `rightIcon` to either edge. Passing
	 * `"center"` will center the text and icons together.
	 * @default Alignment.CENTER
	 */
	alignText: Protocol.Alignment;

	/**
	 * A ref handler that receives the native HTML element backing this component.
	 */
	elementRef?: (ref: HTMLElement | null) => any;

	/**
	 * Whether this button should expand to fill its container.
	 * @default false
	 */
	fill: boolean;

	/**
	 * Name of a Paradigm UI icon (or an icon element) to render before the text.
	 */
	icon?: Icons.IconName | Common.MaybeElement;

	/**
	 * Whether this button should use large styles.
	 * @default false
	 */
	large: boolean;

	/**
	 * If set to `true`, the button will display a centered loading spinner instead of its contents.
	 * The width of the button is not affected by the value of this prop.
	 * @default false
	 */
	loading: boolean;

	/**
	 * Whether this button should use minimal styles.
	 * @default false
	 */
	minimal: boolean;

	/**
	 * Whether this button should use outlined styles.
	 * @default false
	 */
	outlined: boolean;

	/**
	 * Name of a Paradigm UI icon (or an icon element) to render after the text.
	 */
	rightIcon?: Icons.IconName | Common.MaybeElement;

	/**
	 * Whether this button should use small styles.
	 * @default false
	 */
	small: boolean;

	/**
	 * HTML `type` attribute of button. Accepted values are `"button"`, `"submit"`, and `"reset"`.
	 * Note that this prop has no effect on `AnchorButton`; it only affects `Button`.
	 * @default "button"
	 */
	type: "submit" | "reset" | "button";
}

export interface IAbstractButtonState {
	isActive: boolean;
}

const defaultProps = Object.freeze<IAbstractButtonProps>({
	active: false,
	alignText: Protocol.Alignment.CENTER,
	disabled: false,
	fill: false,
	intent: Protocol.Intent.NONE,
	large: false,
	loading: false,
	minimal: false,
	outlined: false,
	small: false,
	type: "button",
});

export const defaultState = Object.freeze<IAbstractButtonState>({
	isActive: false,
});

export abstract class AbstractButton<
	TAbstractButtonAttributes extends Spring.AnimatedProps<React.HTMLAttributes<any>>
> extends Abstract.AbstractPureComponent<
	IAbstractButtonProps & TAbstractButtonAttributes,
	IAbstractButtonState
> {
	constructor(props: IAbstractButtonProps & TAbstractButtonAttributes) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	public static readonly defaultProps: IAbstractButtonProps = defaultProps;
	public static readonly defaultState: IAbstractButtonState = defaultState;
	public state = defaultState;

	protected buttonRef: HTMLElement | null = null;
	protected refHandlers = {
		button: (ref: HTMLElement | null) => {
			this.buttonRef = ref;
			Util.safeInvoke(this.props.elementRef, ref);
		},
	};

	private currentKeyDown: number = -1;

	public abstract render(): JSX.Element;

	/** */

	public getCommonButtonProps() {
		const { disabled, loading, onClick, tabIndex } = this.props;

		return {
			// ...this.props,
			disabled: disabled || loading,
			onClick: disabled ? undefined : onClick,
			onKeyDown: this.handleKeyDown,
			onKeyUp: this.handleKeyUp,
			ref: this.refHandlers.button,
			tabIndex: disabled ? -1 : tabIndex,
		};
	}

	// we're casting as `any` to get around a somewhat opaque safeInvoke error
	// that "Type argument candidate 'KeyboardEvent<T>' is not a valid type
	// argument because it is not a supertype of candidate
	// 'KeyboardEvent<HTMLElement>'."
	protected handleKeyDown(event: React.KeyboardEvent<any>) {
		if (Util.isKeyboardClick(event.which)) {
			event.preventDefault();
			if (event.which !== this.currentKeyDown) {
				this.setState({ isActive: true });
			}
		}

		this.currentKeyDown = event.which;
		Util.safeInvoke(this.props.onKeyDown, event);
	}

	protected handleKeyUp(event: React.KeyboardEvent<any>) {
		if (!Util.isNull(this.buttonRef) && Util.isKeyboardClick(event.which)) {
			this.setState({ isActive: false });
			// `buttonRef` will always be defined via `getCommonButtonProps()` on the
			// parent implementation.
			this.buttonRef!.click();
		}

		this.currentKeyDown = -1;
		Util.safeInvoke(this.props.onKeyUp, event);
	}

	protected renderChildren(): React.ReactNode {
		const { children, icon, loading, rightIcon, text } = this.props;

		return (
			<React.Fragment>
				{loading && (
					<Components.Spinner key="loading" size={Components.Icon.SIZE_LARGE} />
				)}
				<Components.Icon key="leftIcon" icon={icon} />
				{(!Util.isReactNodeEmpty(text) || !Util.isReactNodeEmpty(children)) && (
					<Styled.Button.Text>
						{text}
						{children}
					</Styled.Button.Text>
				)}
				<Components.Icon key="rightIcon" icon={rightIcon} />
			</React.Fragment>
		);
	}
}
