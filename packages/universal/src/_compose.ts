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

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
	): TS.UniversalEnhancer<
		TTargetProps1 & TTargetProps2 & TTargetProps3,
		TEnhancedProps1 & TEnhancedProps2 & TEnhancedProps3
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
	): TS.UniversalEnhancer<
		TTargetProps1 & TTargetProps2 & TTargetProps3 & TTargetProps4,
		TEnhancedProps1 & TEnhancedProps2 & TEnhancedProps3 & TEnhancedProps4
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
	): TS.UniversalEnhancer<
		TTargetProps1 & TTargetProps2 & TTargetProps3 & TTargetProps4,
		TEnhancedProps1 & TEnhancedProps2 & TEnhancedProps3 & TEnhancedProps4
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object,
		TTargetProps5 extends object,
		TEnhancedProps5 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
		e5: TS.UniversalEnhancer<TTargetProps5, TEnhancedProps5>,
	): TS.UniversalEnhancer<
		TTargetProps1 & TTargetProps2 & TTargetProps3 & TTargetProps4 & TTargetProps5,
		TEnhancedProps1 &
			TEnhancedProps2 &
			TEnhancedProps3 &
			TEnhancedProps4 &
			TEnhancedProps5
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object,
		TTargetProps5 extends object,
		TEnhancedProps5 extends object,
		TTargetProps6 extends object,
		TEnhancedProps6 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
		e5: TS.UniversalEnhancer<TTargetProps5, TEnhancedProps5>,
		e6: TS.UniversalEnhancer<TTargetProps6, TEnhancedProps6>,
	): TS.UniversalEnhancer<
		TTargetProps1 &
			TTargetProps2 &
			TTargetProps3 &
			TTargetProps4 &
			TTargetProps5 &
			TTargetProps6,
		TEnhancedProps1 &
			TEnhancedProps2 &
			TEnhancedProps3 &
			TEnhancedProps4 &
			TEnhancedProps5 &
			TEnhancedProps6
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object,
		TTargetProps5 extends object,
		TEnhancedProps5 extends object,
		TTargetProps6 extends object,
		TEnhancedProps6 extends object,
		TTargetProps7 extends object,
		TEnhancedProps7 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
		e5: TS.UniversalEnhancer<TTargetProps5, TEnhancedProps5>,
		e6: TS.UniversalEnhancer<TTargetProps6, TEnhancedProps6>,
		e7: TS.UniversalEnhancer<TTargetProps7, TEnhancedProps7>,
	): TS.UniversalEnhancer<
		TTargetProps1 &
			TTargetProps2 &
			TTargetProps3 &
			TTargetProps4 &
			TTargetProps5 &
			TTargetProps6 &
			TTargetProps7,
		TEnhancedProps1 &
			TEnhancedProps2 &
			TEnhancedProps3 &
			TEnhancedProps4 &
			TEnhancedProps5 &
			TEnhancedProps6 &
			TEnhancedProps7
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object,
		TTargetProps5 extends object,
		TEnhancedProps5 extends object,
		TTargetProps6 extends object,
		TEnhancedProps6 extends object,
		TTargetProps7 extends object,
		TEnhancedProps7 extends object,
		TTargetProps8 extends object,
		TEnhancedProps8 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
		e5: TS.UniversalEnhancer<TTargetProps5, TEnhancedProps5>,
		e6: TS.UniversalEnhancer<TTargetProps6, TEnhancedProps6>,
		e7: TS.UniversalEnhancer<TTargetProps7, TEnhancedProps7>,
		e8: TS.UniversalEnhancer<TTargetProps8, TEnhancedProps8>,
	): TS.UniversalEnhancer<
		TTargetProps1 &
			TTargetProps2 &
			TTargetProps3 &
			TTargetProps4 &
			TTargetProps5 &
			TTargetProps6 &
			TTargetProps7 &
			TTargetProps8,
		TEnhancedProps1 &
			TEnhancedProps2 &
			TEnhancedProps3 &
			TEnhancedProps4 &
			TEnhancedProps5 &
			TEnhancedProps6 &
			TEnhancedProps7 &
			TEnhancedProps8
	>;

	<
		TTargetProps1 extends object,
		TEnhancedProps1 extends object,
		TTargetProps2 extends object,
		TEnhancedProps2 extends object,
		TTargetProps3 extends object,
		TEnhancedProps3 extends object,
		TTargetProps4 extends object,
		TEnhancedProps4 extends object,
		TTargetProps5 extends object,
		TEnhancedProps5 extends object,
		TTargetProps6 extends object,
		TEnhancedProps6 extends object,
		TTargetProps7 extends object,
		TEnhancedProps7 extends object,
		TTargetProps8 extends object,
		TEnhancedProps8 extends object,
		TTargetProps9 extends object,
		TEnhancedProps9 extends object
	>(
		e1: TS.UniversalEnhancer<TTargetProps1, TEnhancedProps1>,
		e2: TS.UniversalEnhancer<TTargetProps2, TEnhancedProps2>,
		e3: TS.UniversalEnhancer<TTargetProps3, TEnhancedProps3>,
		e4: TS.UniversalEnhancer<TTargetProps4, TEnhancedProps4>,
		e5: TS.UniversalEnhancer<TTargetProps5, TEnhancedProps5>,
		e6: TS.UniversalEnhancer<TTargetProps6, TEnhancedProps6>,
		e7: TS.UniversalEnhancer<TTargetProps7, TEnhancedProps7>,
		e8: TS.UniversalEnhancer<TTargetProps8, TEnhancedProps8>,
		e9: TS.UniversalEnhancer<TTargetProps9, TEnhancedProps9>,
	): TS.UniversalEnhancer<
		TTargetProps1 &
			TTargetProps2 &
			TTargetProps3 &
			TTargetProps4 &
			TTargetProps5 &
			TTargetProps6 &
			TTargetProps7 &
			TTargetProps8 &
			TTargetProps9,
		TEnhancedProps1 &
			TEnhancedProps2 &
			TEnhancedProps3 &
			TEnhancedProps4 &
			TEnhancedProps5 &
			TEnhancedProps6 &
			TEnhancedProps7 &
			TEnhancedProps8 &
			TEnhancedProps9
	>;

	(...args: TS.UniversalEnhancer<any, any>[]): TS.UniversalEnhancer<any, any>;
}

export const compose: Compose = (...sensors: any[]): any => {
	return sensors.reduce((prevEnhancer: any, currentEnhancer: any) => (...args: any) =>
		prevEnhancer(currentEnhancer(...args)),
	);
};
