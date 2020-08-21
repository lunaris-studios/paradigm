import * as React from "react";
import * as SR from "@storybook/react";

import * as Component from "./nine";

const Template: SR.Story<Component.INineProps> = (args) => <Component.Nine {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Nine",
	component: Component.Nine,
} as SR.Meta;
