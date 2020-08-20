import * as React from "react";
import * as SR from "@storybook/react";

import * as Component from "./overlay";

const Template: SR.Story<Component.IOverlayProps> = (args) => (
	<Component.Overlay {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export default {
	title: "Overlay",
	component: Component.Overlay,
} as SR.Meta;
