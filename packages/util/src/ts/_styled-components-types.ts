import * as SC from "styled-components";

/**
 * Condensed typing for a `styled-component`.
 */
export type StyledComponent<
	TElement extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
	TAttributes extends object
> = SC.StyledComponent<TElement, any, TAttributes, never>;
