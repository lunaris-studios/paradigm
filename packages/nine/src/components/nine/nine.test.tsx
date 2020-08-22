import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Testing from "@testing-library/react";
import * as SCTU from "styled-components/test-utils";

import * as Component from "./nine";
import * as Styled from "./nine.styled";

describe("Nine", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Nine image="stub" />);
		const NineContainer = SCTU.find(node.baseElement, Styled.Nine.Container);

		expect(NineContainer).toMatchSnapshot();
	});
});
