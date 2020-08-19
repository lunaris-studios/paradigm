import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SCTU from "styled-components/test-utils";
import * as Testing from "@testing-library/react";

import * as HOC from "~/hoc";

import * as Component from "./divider";
import * as Styled from "./divider.styled";

describe("Divider", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Divider />);
		const DividerContainer = SCTU.find(node.baseElement, Styled.Divider.Element);
		expect(DividerContainer).toMatchSnapshot();
	});

	it("<Styled.Divider.Element> responds to color scheme change when [Scheme.DARK] is active", () => {
		const Divider = HOC.withParadigmProvider({ scheme: Protocol.Scheme.DARK })(
			Component.Divider,
		);
		const node = Testing.render(<Divider />);

		const DividerElement = SCTU.find(node.baseElement, Styled.Divider.Element);
		expect(DividerElement).toHaveStyleRule("opacity", "0.75");
	});

	it("<Styled.Divider.Element> responds to color scheme change when [Scheme.LIGHT] is active", () => {
		const Divider = HOC.withParadigmProvider({ scheme: Protocol.Scheme.LIGHT })(
			Component.Divider,
		);
		const node = Testing.render(<Divider />);

		const DividerElement = SCTU.find(node.baseElement, Styled.Divider.Element);
		expect(DividerElement).toHaveStyleRule("opacity", "0.5");
	});
});
