declare module "styled-components/test-utils" {
	import * as SC from "styled-components";

	type StyledComponent = SC.StyledComponent<any, any, any, any>;

	export function find(wrapper: Object, styledComponent: StyledComponent): Element;

	export function find(element: Element, styledComponent: StyledComponent): Element;

	export function findAll(element: Element, styledComponent: StyledComponent): NodeList;
}
