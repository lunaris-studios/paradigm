import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Styled from "./divider.styled";

export interface IDividerProps extends Common.IProps, React.HTMLAttributes<HTMLElement> {
	/**
	 * HTML tag to use for element.
	 * @default "div"
	 */
	tagName?: keyof JSX.IntrinsicElements;
}

const defaultProps = Object.freeze<IDividerProps>({
	tagName: "div",
});

export class Divider extends Components.AbstractPureComponent<IDividerProps> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Divider`;

	static readonly defaultProps: IDividerProps = defaultProps;

	public render() {
		const { tagName } = this.props;
		return <Styled.Divider.Element as={tagName} />;
	}
}
