import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";
import * as SR from "@storybook/react";

import * as Component from "./button";

const Template: SR.Story<Component.IButtonProps> = (args) => (
	<Component.Button {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Button",
	component: Component.Button,
} as SR.Meta;
