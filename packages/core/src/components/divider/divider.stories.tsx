import * as React from "react";
import * as SR from "@storybook/react";

import * as Component from "./divider";

const Template: SR.Story<Component.IDividerProps> = (args) => (
	<Component.Divider {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Divider",
	component: Component.Divider,
} as SR.Meta;
