import * as React from "react";
import * as Knobs from "@storybook/addon-knobs";
import * as Actions from "@storybook/addon-actions";

import * as Component from "./overlay";

export default {
	title: "Overlay",
	component: Component.Overlay,
	decorators: [Knobs.withKnobs],
};

export const interactive = () => {
	return <Component.Overlay />;
};
interactive.story = {
	parameters: {
		jest: ["overlay.test.tsx"],
	},
};
