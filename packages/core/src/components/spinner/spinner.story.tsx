import * as React from "react";
import * as Knobs from "@storybook/addon-knobs";
import * as Actions from "@storybook/addon-actions";

import { Spinner } from "./spinner";

export default {
	title: "Spinner",
	component: Spinner,
	decorators: [Knobs.withKnobs],
};

export const interactive = () => {
	return <Spinner />;
};
interactive.story = {
	parameters: {
		jest: ["spinner.test.tsx"],
	},
};
