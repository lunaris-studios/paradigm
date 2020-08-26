import * as React from "react";

import * as Util from "~/util";

import * as Component from "./nine-slice";

import BORDER from "~/assets/border.png";
import SWORD from "~/assets/sword.png";

const Template: Util.Storybook.React.Story<Component.INineSliceProps> = (args) => (
	<Component.NineSlice {...args} image={BORDER} corner={22} />
);

export const Basic = Template.bind({});
Basic.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
	height: 256,
	width: 128,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
	height: 128,
	width: 256,
};

export const Big = Template.bind({});
Big.args = {
	height: 512,
	width: 512,
};

export const Content = Template.bind({});
Content.args = {
	children: (
		<img
			src={SWORD}
			style={{
				height: "100%",
				width: "100%",
				objectFit: "contain",
			}}
		/>
	),
};

export default {
	title: "Borders/NineSlice",
	component: Component.NineSlice,
} as Util.Storybook.React.Meta;
