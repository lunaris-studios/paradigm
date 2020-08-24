import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import "jest-styled-components";
import "jest-extended";

import * as React from "react";

/**
 * Default properties for components rendered via `Universal.render`
 */
export interface UniversalProps<Data = {}> {
	children?: ((data: Data) => React.ReactNode) | React.ReactNode;
	render?: (data: Data) => React.ReactNode;
}

/**
 * Signature for a generic HOC enhancer.
 */
export type UniversalEnhancer<
	TTargetProps extends object,
	TEnhancedProps extends object
> = (
	TargetComponent: React.ComponentType<TTargetProps>,
) => React.ComponentType<TEnhancedProps>;

/**
 *
 */
export type UniversalEnhancedProps<
	TEnhancerData,
	TEnhancerDomainName extends string,
	TEnhancerTypeName extends string
> = Record<TEnhancerDomainName, Record<TEnhancerTypeName, TEnhancerData>>;

/**
 * Infers the type of injected data provided by a uninversally rendered
 * component.
 */
export type UniversalData<TUniversalProps> = TUniversalProps extends UniversalProps<
	infer TUniversalData
>
	? TUniversalData
	: never;

/**
 * Infers the type of injected props produced by the enhancer `TEnhancer` via `createEnhancer`.
 */
export type UniversalEnhancerInjectedProps<
	TEnhancer
> = TEnhancer extends UniversalEnhancer<infer TTargetProps, infer TEnhancedProps>
	? Omit<TTargetProps, keyof TEnhancedProps>
	: never;

/**
 * Infers the type of data that an enhancer will inject into a component
 * via render props.
 */
export type ComposedProps<TEnhancer> = UniversalEnhancerInjectedProps<TEnhancer>;
