import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "~/util";

import * as Component from "./overlay";
import * as Styled from "./overlay.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Overlay", () => {
	it("renders correctly", () => {
		const node = Util.wrapper(<Component.Overlay />);
		const OverlayContainer = find(node.baseElement, Styled.Overlay.Container);
		expect(OverlayContainer).toMatchSnapshot();
	});
});
