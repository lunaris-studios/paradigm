import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "~/util";

import * as Component from "./icon";
import * as Styled from "./icon.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Icon", () => {
	it("renders correctly", () => {
		const node = Util.wrapper(<Component.Icon />);
		const IconContainer = find(node.baseElement, Styled.Icon.Container);
		expect(IconContainer).toMatchSnapshot();
	});
});
