import * as Abstract from "@paradigmjs/abstract";
import * as Addons from "@storybook/addons";
import * as React from "react";

export namespace Storybook {
	type ReactComponent =
		| React.Component
		| React.FunctionComponent<any>
		| Abstract.AbstractPureComponent<any, any, any>
		| Abstract.AbstractComponent<any, any, any>;
	type ReactReturnType = React.ReactElement<unknown>;

	/**
	 * Metadata to configure the stories for a component.
	 *
	 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
	 */
	export type Meta<Args = Addons.Args> = Addons.BaseMeta<ReactComponent> &
		Addons.Annotations<Args, ReactReturnType>;
}
