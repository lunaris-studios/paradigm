import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";

import * as BIN from "~/bin";
import * as Util from "~/util";

/**
 * A Higher-Order-Component that overrides the existing root
 * <ParadigmProvider> instance. ALlows the user to override
 * default `theme.binds` to test specific use-cases.
 * @param defaultBinds Explicit binds to override defaults
 * @param defaultProps Prop object to pass to the target component
 */
export function withParadigmProvider<
	TParadigmThemeBinds extends Partial<BIN.IParadigmProviderProps["theme"]["binds"]>
>(
	defaultBinds: TParadigmThemeBinds = BIN.ParadigmProvider.defaultProps.theme
		.binds as TParadigmThemeBinds,
) {
	return function WrappedTarget<TTargetComponentProps extends object>(
		TargetComponent: React.ComponentType<TTargetComponentProps>,
	): React.ComponentClass<Partial<TTargetComponentProps>> {
		return class WithParadigmProvider extends React.PureComponent<
			Partial<TTargetComponentProps>
		> {
			public static readonly displayName = `WithParadigmProvider(${TargetComponent.displayName})`;

			public render(): JSX.Element {
				const paradigmTheme = Object.freeze<BIN.IParadigmProviderProps["theme"]>({
					...BIN.ParadigmProvider.defaultProps.theme,
					binds: {
						...BIN.ParadigmProvider.defaultProps.theme.binds,
						...defaultBinds,
					},
				});

				const combinedTargetProps = Object.freeze({
					...this.props,
					...TargetComponent.defaultProps,
				});

				return (
					<BIN.ParadigmProvider theme={paradigmTheme}>
						<TargetComponent {...(combinedTargetProps as TTargetComponentProps)} />
					</BIN.ParadigmProvider>
				);
			}
		};
	};
}
