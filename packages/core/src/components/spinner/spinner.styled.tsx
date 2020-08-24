import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";
import * as Util from "@paradigmjs/util";
// re-import `styled-components` development mode DOM classnames.
import styled, { css, keyframes } from "styled-components";

import * as Common from "~/common";

/**
 * [Spinner]
 * - [Spinner.Container(WRAPPER)]
 */

interface Spinner {
	Container: Util.SC.Styled<"div", ISpinnerContainerProps>;

	SVG: SpinnerSVG;
}

export const Spinner = {} as Spinner;

/**
 * [Spinner.Container]
 */

interface ISpinnerContainerProps {}

Spinner.Container = styled("div")`
	align-items: center;
	/* center animation container inside parent element to isolate layout */
	display: flex;
	justify-content: center;

	/* allow paths to overflow container -- critical for edges of circles! */
	overflow: visible;
	vertical-align: middle;
`;

/**
 * [Spinner.SVG]
 * - [Spinner.SVG.Container(WRAPPER)]
 */

interface SpinnerSVG {
	Container: Util.SC.Styled<"svg", ISpinnerSVGContainerProps>;

	Path: SpinnerSVGPath;
}

Spinner.SVG = {} as SpinnerSVG;

/**
 * [Spinner.SVG.Container]
 */

interface ISpinnerSVGContainerProps extends Common.IIntentProps {
	isSpinning: boolean;
}

const spinnerAnimation = keyframes`{
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}`;

Spinner.SVG.Container = styled("svg")`
	display: block;
	fill: ${Protocol.Color.TRANSPARENT};
	animation: ${(props: ISpinnerSVGContainerProps) =>
			props.isSpinning ? spinnerAnimation : "none"}
		500ms linear infinite;
`;

/**
 * [Spinner.SVG.Path]
 * - [Spinner.SVG.Path.Shared(CSS)]
 * - [Spinner.SVG.Path.Track(ELEMENT)]
 * - [Spinner.SVG.Path.Head(ELEMENT)]
 */

interface SpinnerSVGPath {
	Shared: SC.FlattenSimpleInterpolation;

	Head: Util.SC.Styled<"path", ISpinnerSVGPathHeadProps>;
	Track: Util.SC.Styled<"path", ISpinnerSVGPathTrackProps>;
}

Spinner.SVG.Path = {} as SpinnerSVGPath;

/**
 * [Spinner.SVG.Path.Shared]
 */

Spinner.SVG.Path.Shared = css`
	fill-opacity: 0;
`;

/**
 * [Spinner.SVG.Path.Head]
 */

interface ISpinnerSVGPathHeadProps extends Common.IIntentProps {}

const SPINNER_SVG_PATH_HEAD_HEAD = Protocol.bind("scheme", {
	[Protocol.Scheme.DARK]: Protocol.Color.BLACK_3,
	[Protocol.Scheme.LIGHT]: Protocol.Color.BLACK_5,
});

// TODO (sam): Add intent / color injection
Spinner.SVG.Path.Head = styled("path")`
	${Spinner.SVG.Path.Shared}
	/*  */
	stroke: ${SPINNER_SVG_PATH_HEAD_HEAD};
	stroke-linecap: round;
	transform-origin: center;
	transition: stroke-dashoffset 200ms ${Protocol.TRANSITION_EASE};
`;

/**
 * [Spinner.SVG.Path.Track]
 */

interface ISpinnerSVGPathTrackProps extends Common.IIntentProps {}

const SPINNER_SVG_PATH_HEAD_TRACK = Protocol.bind("scheme", {
	[Protocol.Scheme.DARK]: Protocol.Color.BLACK_2,
	[Protocol.Scheme.LIGHT]: Protocol.Color.BLACK_4,
});

Spinner.SVG.Path.Track = styled("path")`
	${Spinner.SVG.Path.Shared}
	/*  */
	stroke: ${SPINNER_SVG_PATH_HEAD_TRACK};
`;
