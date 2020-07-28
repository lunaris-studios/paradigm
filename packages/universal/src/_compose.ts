import * as TS from "~/ts";

/**
 * Composes higher-order enhancer components, resulting in a composite HOC
 * maintaing type assurance for `n` number of enhancers.
 */
export interface Compose {
	<TTargetProps extends object, TEnhancedProps extends object>(): TS.UniversalEnhancer<
		TTargetProps,
		TEnhancedProps
	>;

	<TTargetProps1 extends object, TEnhancedProps1 extends object>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
	): TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
	): TS.UniversalEnhancer<
		TTargetProps1 & TTargetProps2,
		TEnhancedProps1 & TEnhancedProps2
	>;

	(...args: TS.UniversalEnhancer<any, any>[]): TS.UniversalEnhancer<any, any>;
}

export const compose: Compose = (...sensors: any[]): any => {
	return sensors.reduce((prevEnhancer: any, currentEnhancer: any) => (...args: any) =>
		prevEnhancer(currentEnhancer(...args)),
	);
};
