import * as React from "react";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Util from "~/util";

import * as Abstract from "./button.abstract";
import * as Styled from "./button.styled";

export class Button extends Abstract.AbstractButton<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Button`;

	public render() {
		return (
			<Styled.Button.Element
				{...Util.removeNonHTMLProps(this.props)}
				{...this.getCommonButtonProps()}
				type="button"
			>
				{this.renderChildren()}
			</Styled.Button.Element>
		);
	}
}

export class AnchorButton extends Abstract.AbstractButton<
	React.AnchorHTMLAttributes<HTMLAnchorElement>
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.AnchorButton`;

	public render() {
		const { href, tabIndex = 0 } = this.props;
		const commonProps = this.getCommonButtonProps();

		const AniamtedAnchorElement = Spring.animated("a");
		const foo = this.props.children;
		return (
			<Styled.Button.Element
				{...Util.removeNonHTMLProps(this.props)}
				{...commonProps}
				as={AniamtedAnchorElement}
				role="button"
				href={commonProps.disabled ? undefined : href}
				tabIndex={commonProps.disabled ? -1 : tabIndex}
			>
				{this.renderChildren()}
			</Styled.Button.Element>
		);
	}
}

import ButtonSVG, { ReactComponent as ButtonSVGComponent } from "~/assets/svg/button.svg";

export class TestButton extends Abstract.AbstractButton<
	React.ButtonHTMLAttributes<HTMLButtonElement>
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.TestButton`;

	public render() {
		console.log("ButtonSVG", ButtonSVG, ButtonSVGComponent);
		return <ButtonSVGComponent />;
	}
}
