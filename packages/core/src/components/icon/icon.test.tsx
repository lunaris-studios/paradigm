import * as Icons from "@paradigmjs/icons";
import * as React from "react";
import * as SCTU from "styled-components/test-utils";
import * as Testing from "@testing-library/react";

import * as Component from "./icon";
import * as Styled from "./icon.styled";

describe("Icon", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Icon icon={Icons.IconNames.ADD} />);
		const IconContainer = SCTU.find(node.baseElement, Styled.Icon.Container);
		expect(IconContainer).toMatchSnapshot();
	});
});
