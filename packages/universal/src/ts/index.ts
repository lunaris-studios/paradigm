import * as React from "react";
import * as Util from "@paradigmjs/util";
import { default as hoistNonReactStatics } from "hoist-non-react-statics";

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

//

/**
 * A property P will be present if:
 * - it is present in DecorationTargetProps
 *
 * Its value will be dependent on the following conditions
 * - if property P is present in InjectedProps and its definition extends the definition
 *   in DecorationTargetProps, then its definition will be that of DecorationTargetProps[P]
 * - if property P is not present in InjectedProps then its definition will be that of
 *   DecorationTargetProps[P]
 * - if property P is present in InjectedProps but does not extend the
 *   DecorationTargetProps[P] definition, its definition will be that of InjectedProps[P]
 */
export type Matching<InjectedProps, DecorationTargetProps> = {
	[P in keyof DecorationTargetProps]: P extends keyof InjectedProps
		? InjectedProps[P] extends DecorationTargetProps[P]
			? DecorationTargetProps[P]
			: InjectedProps[P]
		: DecorationTargetProps[P];
};

/**
 * a property P will be present if :
 * - it is present in both DecorationTargetProps and InjectedProps
 * - InjectedProps[P] can satisfy DecorationTargetProps[P]
 * ie: decorated component can accept more types than decorator is injecting
 *
 * For decoration, inject props or ownProps are all optionally
 * required by the decorated (right hand side) component.
 * But any property required by the decorated component must be satisfied by the injected property.
 */
export type Shared<InjectedProps, DecorationTargetProps> = {
	[P in Extract<
		keyof InjectedProps,
		keyof DecorationTargetProps
	>]?: InjectedProps[P] extends DecorationTargetProps[P]
		? DecorationTargetProps[P]
		: never;
};

// Infers prop type from component C
export type GetProps<C> = C extends React.ComponentType<infer P>
	? C extends React.ComponentClass<P>
		? React.ClassAttributes<InstanceType<C>> & P
		: P
	: never;

// Applies LibraryManagedAttributes (proper handling of defaultProps
// and propTypes), as well as defines WrappedComponent.
export type ConnectedComponent<
	C extends React.ComponentType<any>,
	P
> = React.NamedExoticComponent<JSX.LibraryManagedAttributes<C, P>> &
	hoistNonReactStatics.NonReactStatics<C> & {
		EnhancedComponent: C;
	};

// Injects props and removes them from the prop requirements.
// Will not pass through the injected props if they are passed in during
// render. Also adds new prop requirements from TNeedsProps.
export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> = <
	C extends React.ComponentType<Matching<TInjectedProps, GetProps<C>>>
>(
	component: C,
) => ConnectedComponent<
	C,
	Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps
>;

// Injects props and removes them from the prop requirements.
// Will not pass through the injected props if they are passed in during
// render.
export type InferableComponentEnhancer<
	TInjectedProps
> = InferableComponentEnhancerWithProps<TInjectedProps, {}>;
