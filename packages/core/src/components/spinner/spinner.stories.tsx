import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";
import * as SR from "@storybook/react";

import * as Component from "./spinner";

const Template: SR.Story<Component.ISpinnerProps> = (args) => (
	<Component.Spinner {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Spinner",
	component: Component.Spinner,
} as SR.Meta;
