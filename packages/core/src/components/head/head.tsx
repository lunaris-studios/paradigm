import * as Abstract from "@paradigmjs/abstract";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Common from "~/common";

import * as Styled from "./head.styled";

export interface IHeadProps {
	typography: Protocol.Typography;
}

export class Head extends Abstract.AbstractPureComponent<IHeadProps> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Head`;

	public Styled = Styled;

	public render(): JSX.Element {
		const { typography } = this.props;

		return (
			<React.Fragment>
				<Protocol.TypographyStyle typography={typography} />
				<Styled.Head.Global />
			</React.Fragment>
		);
	}
}
