import * as React from "react";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Util from "~/util";

import * as Abstract from "./button.abstract";
import * as Styled from "./button.styled";

export interface IButtonProps extends Abstract.IAbstractButtonProps {}

export class Button extends Abstract.AbstractButton<
	Spring.AnimatedProps<React.ButtonHTMLAttributes<HTMLButtonElement>>
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Button`;

	public render(): JSX.Element {
		return (
			<Styled.Button.Container
				{...Util.removeNonHTMLProps(this.props)}
				{...this.getCommonButtonProps()}
				/** */
				type="button"
			>
				{this.renderChildren()}
			</Styled.Button.Container>
		);
	}
}

export class AnchorButton extends Abstract.AbstractButton<
	Spring.AnimatedProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.AnchorButton`;

	public render(): JSX.Element {
		const { href, tabIndex = 0 } = this.props;

		const commonProps = this.getCommonButtonProps();

		return (
			<Styled.Button.Container
				{...Util.removeNonHTMLProps(this.props)}
				{...commonProps}
				/** */
				as={Spring.animated.a}
				role="button"
				href={commonProps.disabled ? undefined : href}
				tabIndex={commonProps.disabled ? -1 : tabIndex}
			>
				{this.renderChildren()}
			</Styled.Button.Container>
		);
	}
}
