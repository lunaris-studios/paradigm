import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "~/util";

import * as Component from "./portal";
import * as Styled from "./portal.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Portal", () => {
	it("renders correctly", () => {
		const node = Util.wrapper(<Component.Portal />);
		const PortalContainer = find(node.baseElement, Styled.Portal.Container);
		expect(PortalContainer).toMatchSnapshot();
	});
});
