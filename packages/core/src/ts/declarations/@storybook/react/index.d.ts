import * as Abstract from "@paradigmjs/abstract";
import * as Addons from "@storybook/addons";
import * as SR from "@storybook/react";

import "@storybook/react";

declare module "@storybook/react" {
	/**
	 * Metadata to configure the stories for an abstract component.
	 */
	declare type StorybookComponent =
		| React.ComponentType
		| Abstract.AbstractComponent
		| Abstract.AbstractPureComponent;
	export declare type Meta<
		TComponent extends StorybookComponent = any,
		TArgs = Addons.DefaultArgs
	> = Addons.BaseMeta<TComponent> &
		Addons.Annotations<Component.Spinner, React.ReactElement<unknown>>;
}
