import * as Components from "~/components";

export type AbstractComponentType =
	| Components.AbstractComponent<any, any, any>
	| Components.AbstractPureComponent<any, any, any>;
