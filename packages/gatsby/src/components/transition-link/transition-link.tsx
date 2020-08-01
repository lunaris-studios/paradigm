import * as GPTL from "gatsby-plugin-transition-link";
import * as React from "react";

import * as Common from "~/common";

import * as Styled from "./transition-link.styled";

export interface ITransitionLinkProps extends GPTL.TransitionLinkProps {}

class TransitionLinkImpl extends React.PureComponent<ITransitionLinkProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.TransitionLink`;

	constructor(props: ITransitionLinkProps) {
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

export const TransitionLink = TransitionLinkImpl;
