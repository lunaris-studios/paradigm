import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";
import * as SR from "@storybook/react";

import * as Component from "./icon";

const Template: SR.Story<Component.IIconProps> = (args) => <Component.Icon {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Icon",
	component: Component.Icon,
} as SR.Meta;
