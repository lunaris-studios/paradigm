import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "~/util";

import * as Component from "./divider";
import * as Styled from "./divider.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Divider", () => {
	it("renders correctly", () => {
		const node = Util.wrapper(<Component.Divider />);
		const DividerContainer = find(node.baseElement, Styled.Divider.Element);
		expect(DividerContainer).toMatchSnapshot();
	});

	it("<Styled.Divider.Element> responds to color scheme change when [Scheme.DARK] is active", () => {
		const node = Util.wrapper(<Component.Divider />, { scheme: Protocol.Scheme.DARK });
		const DividerElement = find(node.baseElement, Styled.Divider.Element);
		expect(DividerElement).toHaveStyleRule("opacity", "0.75");
	});

	it("<Styled.Divider.Element> responds to color scheme change when [Scheme.LIGHT] is active", () => {
		const node = Util.wrapper(<Component.Divider />, { scheme: Protocol.Scheme.LIGHT });
		const DividerElement = find(node.baseElement, Styled.Divider.Element);
		expect(DividerElement).toHaveStyleRule("opacity", "0.5");
	});
});
