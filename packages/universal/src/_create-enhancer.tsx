import * as React from "react";
import * as Util from "@paradigmjs/util";

import * as TS from "~/ts";

export function createEnhancer<
	TEnhancerData extends TS.UniversalData<TEnhancerProps>,
	TEnhancerProps extends object,
	TEnhancerDomainName extends string,
	TEnhancerTypeName extends string,
	TInjectedProps extends TS.UniversalEnhancedProps<
		TEnhancerData,
		TEnhancerDomainName,
		TEnhancerTypeName
	>
>(
	EnhancerComponent: React.ComponentType<TEnhancerProps>,
	enhancerDomainName: TEnhancerDomainName,
	enhancerTypeName: TEnhancerTypeName,
) {
	return function <TTargetProps extends TInjectedProps>(
		TargetComponent: React.ComponentType<TTargetProps>,
	): React.ComponentType<Util.Subtract<TTargetProps, TInjectedProps>> {
		return class Enhanced extends React.Component<
			Util.Subtract<TTargetProps, TInjectedProps>
		> {
			public static readonly displayName = `Enhanced(${EnhancerComponent.displayName})(${TargetComponent.displayName})`;

			public render() {
				return (
					<EnhancerComponent {...({} as TEnhancerProps)}>
						{(data: TEnhancerData) => {
							const props = this.props as TTargetProps;

							const enhancerTypeData = Object.freeze({
								[enhancerTypeName]: data,
							});

							const enhancerDomainData = Object.freeze({
								[enhancerDomainName]: {
									...enhancerTypeData,
									...props[enhancerDomainName],
								},
							});

							return <TargetComponent {...props} {...enhancerDomainData} />;
						}}
					</EnhancerComponent>
				);
			}
		};
	};
}
