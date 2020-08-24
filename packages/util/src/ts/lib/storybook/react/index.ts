import * as Addons from "@storybook/addons";
import * as React from "react";

type ReactComponent = React.ComponentType<any> | React.FunctionComponent<any>;
type ReactReturnType = React.ReactElement<unknown>;

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<Args = Addons.Args> = Addons.BaseMeta<ReactComponent> &
	Addons.Annotations<Args, ReactReturnType>;

/**
 * Story function that represents a component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type Story<Args = Addons.Args> = Addons.BaseStory<Args, ReactReturnType> &
	Addons.Annotations<Args, ReactReturnType>;
