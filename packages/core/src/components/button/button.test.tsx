import * as Icons from "@paradigmjs/icons";
import * as React from "react";
import * as SCTU from "styled-components/test-utils";
import * as Testing from "@testing-library/react";

import * as Component from "./button";
import * as Styled from "./button.styled";

describe("Button", () => {
	it("renders correctly", () => {
		const node = Testing.render(
			<Component.Button text="button" icon={Icons.IconNames.ADD} />,
		);
		const ButtonContainer = SCTU.find(node.baseElement, Styled.Button.Container);
		expect(ButtonContainer).toMatchSnapshot();
	});
});

describe("AnchorButton", () => {
	it("renders correctly", () => {
		const node = Testing.render(
			<Component.AnchorButton text="anchor-button" icon={Icons.IconNames.ADD} />,
		);
		const AnchorButtonContainer = SCTU.find(node.baseElement, Styled.Button.Container);
		expect(AnchorButtonContainer).toMatchSnapshot();
	});
});
