import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Testing from "@testing-library/react";
import * as SCTU from "styled-components/test-utils";

import * as Component from "./nine-slice";
import * as Styled from "./nine-slice.styled";

describe("Nine", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.NineSlice image="stub" />);
		const NineSliceContainer = SCTU.find(node.baseElement, Styled.NineSlice.Container);

		expect(NineSliceContainer).toMatchSnapshot();
	});
});
