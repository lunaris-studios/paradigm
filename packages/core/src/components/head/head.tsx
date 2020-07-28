import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Styled from "./head.styled";

export interface IHeadProps {}

export class Head extends Components.AbstractPureComponent<IHeadProps, {}> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Head`;

	public render() {
		return (
			<React.Fragment>
				<Styled.Head.Global />
			</React.Fragment>
		);
	}
}
