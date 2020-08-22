import * as React from "react";

import * as Util from "~/util";

import * as Component from "./nine";

const Template: Util.Storybook.React.Story<Component.INineProps> = (args) => (
	<Component.Nine {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Nine",
	component: Component.Nine,
} as Util.Storybook.React.Meta;
