import * as GPTL from "gatsby-plugin-transition-link";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Common from "~/common";

import * as Styled from "./transition-link.styled";

export interface IAniLinkProps extends GPTL.TransitionLinkProps {}

class AniLinkImpl extends React.PureComponent<IAniLinkProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.AniLink`;

	constructor(props: IAniLinkProps) {
		super(props);
	}

	public render() {
		const { children } = this.props;

		return (
			<Styled.TransitionLink.Link {...this.props}>
				{children}
			</Styled.TransitionLink.Link>
		);
	}
}

export const AniLink = AniLinkImpl;
