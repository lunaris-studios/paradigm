import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as Testing from "@testing-library/react";

import * as Util from "~/util";

import * as Component from "./nine";
import * as Styled from "./nine.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Nine", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Nine />);
		const NineContainer = find(node.baseElement, Styled.Nine.Container);

		expect(NineContainer).toMatchSnapshot();
	});
});
