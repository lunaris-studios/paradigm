import * as Abstract from "@paradigmjs/abstract";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";

import * as Components from "~/components";
import * as Common from "~/common";

export interface IParadigmProviderProps {
	theme: Protocol.Theme;
	typography: Protocol.Typography;
}

const defaultProps = Object.freeze<IParadigmProviderProps>({
	theme: Protocol.Theme,
	typography: Protocol.Typography,
});

export class ParadigmProvider extends Abstract.AbstractPureComponent<
	IParadigmProviderProps
> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.ParadigmProvider`;

	public static readonly defaultProps: IParadigmProviderProps = defaultProps;

	public render(): JSX.Element {
		const { children, theme, typography } = this.props;

		return (
			<React.Fragment>
				<Components.Head typography={typography} />
				<SC.ThemeProvider theme={theme}>{children}</SC.ThemeProvider>
			</React.Fragment>
		);
	}
}
