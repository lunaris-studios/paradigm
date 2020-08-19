import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SCTU from "styled-components/test-utils";
import * as Testing from "@testing-library/react";

import * as Component from "./overlay";
import * as Styled from "./overlay.styled";

// @ts-ignore

describe("Overlay", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Overlay />);
		const OverlayContainer = SCTU.find(node.baseElement, Styled.Overlay.Container);
		expect(OverlayContainer).toMatchSnapshot();
	});
});
