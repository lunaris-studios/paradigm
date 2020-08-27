import * as SC from "styled-components";

/**
 * Condensed typing for a `styled-component`.
 */
export type Styled<
	TElement extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
	TProps extends object,
	TAttributes extends object = {}
> = SC.StyledComponent<
	TElement,
	SC.DefaultTheme,
	TProps & TAttributes,
	keyof TAttributes
>;
