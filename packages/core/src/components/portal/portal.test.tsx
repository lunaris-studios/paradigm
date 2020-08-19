import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SCTU from "styled-components/test-utils";
import * as Testing from "@testing-library/react";

import * as HOC from "~/hoc";

import * as Component from "./portal";
import * as Styled from "./portal.styled";

describe("Portal", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Portal />);
		const PortalContainer = SCTU.find(node.baseElement, Styled.Portal.Container);
		expect(PortalContainer).toMatchSnapshot();
	});
});
