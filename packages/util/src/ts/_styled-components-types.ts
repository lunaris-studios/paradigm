import * as SC from "styled-components";

export namespace SC {
	/**
	 * Condensed typing for a `styled-component`.
	 */
	export type StyledComponent<
		TElement extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
		TProps extends object,
		TAttributes extends object = {}
	> = SC.StyledComponent<
		TElement,
		SC.DefaultTheme,
		TProps & TAttributes,
		keyof TAttributes
	>;
}
