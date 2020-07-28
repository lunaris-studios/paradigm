import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Testing from "@testing-library/react";

import * as BIN from "~/bin";

/**
 * Wrapper for testing shimmed changes for the <NeptuneProvider>
 */
export function wrapper(
	ui: React.ReactElement,
	shimmedBinds?: Partial<Protocol.Theme["binds"]>,
) {
	const binds = Object.freeze<Protocol.Theme["binds"]>({
		...BIN.NeptuneProvider.defaultProps.theme.binds,
		...shimmedBinds,
	});

	const theme = Object.freeze<Protocol.Theme>({
		...BIN.NeptuneProvider.defaultProps.theme,
		binds,
	});

	function Wrapper(props: any) {
		const { children } = props;
		return <BIN.NeptuneProvider theme={theme}>{children}</BIN.NeptuneProvider>;
	}

	return Testing.render(ui, { wrapper: Wrapper });
}
