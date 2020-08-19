declare module "styled-components/test-utils" {
	import * as SC from "styled-components";

	export declare function find(
		wrapper: Object,
		styledComponent: SC.StyledComponent,
	): Element;

	export declare function find(
		element: Element,
		styledComponent: SC.StyledComponent,
	): Element;

	export declare function findAll(
		element: Element,
		styledComponent: SC.StyledComponent,
	): NodeList;
}
