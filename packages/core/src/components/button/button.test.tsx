import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "~/util";

import * as Component from "./button";
import * as Styled from "./button.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Button", () => {
	it("renders correctly", () => {
		const node = Util.wrapper(<Component.Button />);
		const ButtonContainer = find(node.baseElement, Styled.Button.Element);
		expect(ButtonContainer).toMatchSnapshot();
	});
});
