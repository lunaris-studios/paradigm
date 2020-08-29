import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SCTU from "styled-components/test-utils";
import * as Testing from "@testing-library/react";

import * as HOC from "~/hoc";

import * as Component from "./spinner";
import * as Styled from "./spinner.styled";

describe("Spinner", () => {
	it("renders correctly", () => {
		const node = Testing.render(<Component.Spinner />);

		const SpinnerContainer = SCTU.find(node.baseElement, Styled.Spinner.Container);
		expect(SpinnerContainer).toMatchSnapshot();
	});

	it("clamps underflow `value`", () => {
		/**
		 * Assume a `stroke-dashoffset` equal to the length of the spinner's
		 * total path.
		 */
		const node = Testing.render(<Component.Spinner value={-1} />);
		const SpinnerSVGPathhead = SCTU.find(node.baseElement, Styled.Spinner.SVG.Path.Head);

		expect(SpinnerSVGPathhead).toHaveAttribute(
			"stroke-dashoffset",
			`${Component.PATH_LENGTH}`,
		);
	});

	it("clamps overflow `value`", () => {
		/**
		 * Assume a `stroke-dashoffset` equal to zero.
		 */
		const node = Testing.render(<Component.Spinner value={2} />);
		const SpinnerSVGPathhead = SCTU.find(node.baseElement, Styled.Spinner.SVG.Path.Head);

		expect(SpinnerSVGPathhead).toHaveAttribute("stroke-dashoffset", "0");
	});

	it("<Styled.Spinner.SVG.Path.Head> responds to color scheme change when [Scheme.DARK] is active", () => {
		const Spinner = HOC.withParadigmProvider({ scheme: Protocol.Scheme.DARK })(
			Component.Spinner,
		);
		const node = Testing.render(<Spinner />);

		const SpinnerSVGPathHead = SCTU.find(node.baseElement, Styled.Spinner.SVG.Path.Head);
		expect(SpinnerSVGPathHead).toHaveStyleRule("stroke", Protocol.Color.BLACK_3);
	});

	it("<Styled.Spinner.SVG.Path.Head> responds to color scheme change when [Scheme.LIGHT] is active", () => {
		const Spinner = HOC.withParadigmProvider({ scheme: Protocol.Scheme.LIGHT })(
			Component.Spinner,
		);
		const node = Testing.render(<Spinner />);

		const SpinnerSVGPathHead = SCTU.find(node.baseElement, Styled.Spinner.SVG.Path.Head);
		expect(SpinnerSVGPathHead).toHaveStyleRule("stroke", Protocol.Color.BLACK_5);
	});

	it("<Styled.Spinner.SVG.Path.Track> responds to color scheme change when [Scheme.DARK] is active", () => {
		const Spinner = HOC.withParadigmProvider({ scheme: Protocol.Scheme.DARK })(
			Component.Spinner,
		);
		const node = Testing.render(<Spinner />);

		const SpinnerSVGPathTrack = SCTU.find(
			node.baseElement,
			Styled.Spinner.SVG.Path.Track,
		);
		expect(SpinnerSVGPathTrack).toHaveStyleRule("stroke", Protocol.Color.BLACK_2);
	});

	it("<Styled.Spinner.SVG.Path.Track> responds to color scheme change when [Scheme.LIGHT] is active", () => {
		const Spinner = HOC.withParadigmProvider({ scheme: Protocol.Scheme.LIGHT })(
			Component.Spinner,
		);
		const node = Testing.render(<Spinner />);

		const SpinnerSVGPathTrack = SCTU.find(
			node.baseElement,
			Styled.Spinner.SVG.Path.Track,
		);
		expect(SpinnerSVGPathTrack).toHaveStyleRule("stroke", Protocol.Color.BLACK_4);
	});
});
