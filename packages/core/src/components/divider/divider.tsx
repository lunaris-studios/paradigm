import * as Abstract from "@paradigmjs/abstract";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Styled from "./divider.styled";

export interface IDividerProps extends Common.IProps {
	/**
	 * Should be a [[solid color]]. Changes in global color scheme
	 * are dynamic handled via relative opacity changes.
	 * @default Protocol.Color.BLACK_0
	 */
	color: Protocol.Color;

	/**
	 * HTML tag to use for element.
	 * @default "div"
	 */
	tagName: keyof JSX.IntrinsicElements;
}

const defaultProps = Object.freeze<IDividerProps>({
	color: Protocol.Color.BLACK_0,
	tagName: "div",
});

export class Divider extends Abstract.AbstractPureComponent<IDividerProps> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Divider`;

	public static readonly defaultProps: IDividerProps = defaultProps;

	public render() {
		const { color, tagName } = this.props;

		return <Styled.Divider.Element as={tagName} color={color} />;
	}
}
