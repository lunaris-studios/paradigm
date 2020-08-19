import * as Icon from "@paradigmjs/icons";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

export const DISPLAYNAME_PREFIX = "[PARADIGM(CORE)]";

/**
 * Alias for all valid HTML props for `<div>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Alias for all valid HTML props for `<input>` element.
 * Does not include React's `ref` or `key`.
 */
export type HTMLInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Alias for a `JSX.Element` or a value that renders nothing.
 *
 * In React, `boolean`, `null`, and `undefined` do not produce any output.
 */
export type MaybeElement = JSX.Element | false | undefined;

/**
 * A shared base interface for all Blueprint component props.
 */
export interface IProps {}

/**
 * Interface for any React Class / Functional component that has children.
 */
export interface IChildren {
	/** */
	children?: React.ReactNode;
}

export interface IIntentProps {
	/** Visual intent color to apply to element. */
	intent?: Protocol.Intent;
}

/**
 * Interface for a clickable action, such as a button or menu item.
 * These props can be spready directly to a `<Button>` or `<MenuItem>` element.
 */
export interface IActionProps extends IIntentProps, IProps {
	/** Whether this action is non-interactive. */
	disabled?: boolean;

	/** Name of a Blueprint UI icon (or an icon element) to render before the text. */
	icon?: Icon.IconName | MaybeElement;

	/** Click event handler. */
	onClick?: React.MouseEventHandler<HTMLElement>;

	/** Action text. Can be any single React renderable. */
	text?: React.ReactNode;
}

/** Interface for a link, with support for customizing target window. */
export interface ILinkProps {
	/** Link URL. */
	href?: string;

	/** Link target attribute. Use `"_blank"` to open in a new window. */
	target?: string;
}

/** Interface for a controlled input. */
export interface IControlledProps {
	/** Initial value of the input, for uncontrolled usage. */
	defaultValue?: string;

	/** Change event handler. Use `event.target.value` for new value. */
	onChange?: React.FormEventHandler<HTMLElement>;

	/** Form value of the input, for controlled usage. */
	value?: string;
}

/**
 * An interface for an option in a list, such as in a `<select>` or `RadioGroup`.
 * These props can be spread directly to an `<option>` or `<Radio>` element.
 */
export interface IOptionProps extends IProps {
	/** Whether this option is non-interactive. */
	disabled?: boolean;

	/** Label text for this option. If omitted, `value` is used as the label. */
	label?: string;

	/** Value of this option. */
	value: string | number;
}
