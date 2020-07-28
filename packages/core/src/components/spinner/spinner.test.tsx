import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "~/util";

import * as Component from "./spinner";
import * as Styled from "./spinner.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Spinner", () => {
	it("renders correctly", () => {
		const node = Util.wrapper(<Component.Spinner />);
		const SpinnerContainer = find(node.baseElement, Styled.Spinner.Container);
		expect(SpinnerContainer).toMatchSnapshot();
	});

	it("overflows out of bounds value", () => {});

	it("<Styled.Spinner.SVG.Path.Head> responds to color scheme change when [Scheme.DARK] is active", () => {
		const node = Util.wrapper(<Component.Spinner />, { scheme: Protocol.Scheme.DARK });
		const SpinnerSVGPathHead = find(node.baseElement, Styled.Spinner.SVG.Path.Head);
		expect(SpinnerSVGPathHead).toHaveStyleRule("stroke", Protocol.Color.BLACK_3);
	});

	it("<Styled.Spinner.SVG.Path.Head> responds to color scheme change when [Scheme.LIGHT] is active", () => {
		const node = Util.wrapper(<Component.Spinner />, { scheme: Protocol.Scheme.LIGHT });
		const SpinnerSVGPathHead = find(node.baseElement, Styled.Spinner.SVG.Path.Head);
		expect(SpinnerSVGPathHead).toHaveStyleRule("stroke", Protocol.Color.BLACK_5);
	});

	it("<Styled.Spinner.SVG.Path.Track> responds to color scheme change when [Scheme.DARK] is active", () => {
		const node = Util.wrapper(<Component.Spinner />, { scheme: Protocol.Scheme.DARK });
		const SpinnerSVGPathTrack = find(node.baseElement, Styled.Spinner.SVG.Path.Track);
		expect(SpinnerSVGPathTrack).toHaveStyleRule("stroke", Protocol.Color.BLACK_2);
	});

	it("<Styled.Spinner.SVG.Path.Track> responds to color scheme change when [Scheme.LIGHT] is active", () => {
		const node = Util.wrapper(<Component.Spinner />, { scheme: Protocol.Scheme.LIGHT });
		const SpinnerSVGPathTrack = find(node.baseElement, Styled.Spinner.SVG.Path.Track);
		expect(SpinnerSVGPathTrack).toHaveStyleRule("stroke", Protocol.Color.BLACK_4);
	});
});
