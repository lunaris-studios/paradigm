import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as RT from "react-typography";
import * as SC from "styled-components";

import * as Components from "~/components";

export interface INeptuneProviderProps {
	theme: Protocol.Theme;
	typography: Protocol.Typography;
}

const defaultProps = Object.freeze<INeptuneProviderProps>({
	theme: Protocol.Theme,
	typography: Protocol.Typography,
});

export class NeptuneProvider extends Components.AbstractPureComponent<
	INeptuneProviderProps
> {
	static readonly defaultProps: INeptuneProviderProps = defaultProps;

	public render() {
		const { children, theme, typography } = this.props;
		return (
			<React.Fragment>
				<Components.Head />
				<RT.TypographyStyle typography={typography} />
				<SC.ThemeProvider theme={theme}>{children}</SC.ThemeProvider>
			</React.Fragment>
		);
	}
}
