import * as React from "react";
import * as Knobs from "@storybook/addon-knobs";
import * as Actions from "@storybook/addon-actions";

import { TestButton } from "./button";

export default {
	title: "Button",
	component: TestButton,
	decorators: [Knobs.withKnobs],
};

export const interactive = () => {
	const label = Knobs.text("Label", "Quit");
	return <TestButton onClick={Actions.action("TestButton")} text={label} />;
};
