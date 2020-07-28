import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";
import * as Util from "~/util";

import * as Styled from "./spinner.styled";
import * as Errors from "./spinner.errors";

// see http://stackoverflow.com/a/18473154/3124288 for calculating arc path
const R = 45;
const SPINNER_TRACK = `M 50,50 m 0,-${R} a ${R},${R} 0 1 1 0,${
	R * 2
} a ${R},${R} 0 1 1 0,-${R * 2}`;

// unitless total length of SVG path, to which stroke-dash* properties are relative.
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pathLength
// this value is the result of `<path d={SPINNER_TRACK} />.getTotalLength()` and works in all browsers:
const PATH_LENGTH = 280;

const MIN_SIZE = 10;
const STROKE_WIDTH = 4;
const MIN_STROKE_WIDTH = 16;

export enum SpinnerSize {
	SIZE_SMALL = 20,
	SIZE_STANDARD = 50,
	SIZE_LARGE = 100,
}

export interface ISpinnerProps extends Common.IProps, Common.IIntentProps {
	/**
	 * Width and height of the spinner in pixels. The size cannot be less than
	 * 10px.
	 *
	 * Constants are available for common sizes:
	 * - `Spinner.SIZE_SMALL = 20px`
	 * - `Spinner.SIZE_STANDARD = 50px`
	 * - `Spinner.SIZE_LARGE = 100px`
	 *
	 * @default Spinner.SIZE_STANDARD = 50
	 */
	size: number;

	/**
	 * HTML tag for the two wrapper elements. If rendering a `<Spinner>` inside
	 * an `<svg>`, change this to an SVG element like `"g"`.
	 * @default "div"
	 */
	tagName: keyof JSX.IntrinsicElements;

	/**
	 * A value between 0 and 1 (inclusive) representing how far along the operation is.
	 * Values below 0 or above 1 will be interpreted as 0 or 1 respectively.
	 * Omitting this prop will result in an "indeterminate" spinner where the head spins indefinitely.
	 */
	value: number;
}

const defaultProps = Object.freeze<ISpinnerProps>({
	size: SpinnerSize.SIZE_STANDARD,
	tagName: "div",
	value: 0.25,
});

export class Spinner extends Components.AbstractPureComponent<ISpinnerProps, {}> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Spinner`;

	static readonly defaultProps: ISpinnerProps = defaultProps;

	public static Styled = Styled;
	public static Errors = Errors;

	public static readonly SIZE_SMALL = SpinnerSize.SIZE_SMALL;
	public static readonly SIZE_STANDARD = SpinnerSize.SIZE_STANDARD;
	public static readonly SIZE_LARGE = SpinnerSize.SIZE_LARGE;

	public componentDidUpdate(prevProps: ISpinnerProps) {
		if (prevProps.value !== this.props.value) {
			// IE/Edge: re-render after changing value to force SVG update
			this.forceUpdate();
		}
	}

	public render() {
		const { intent, value, tagName } = this.props;
		const size = this.getSize();

		// keep spinner track width consistent at all sizes (down to about 10px).
		const strokeWidth = Math.min(
			MIN_STROKE_WIDTH,
			(STROKE_WIDTH * Spinner.SIZE_LARGE) / size,
		);
		const strokeOffset =
			PATH_LENGTH - PATH_LENGTH * (value == null ? 0.25 : Util.clamp(value, 0, 1));

		const isSpinning = Boolean(value != null);

		// multiple DOM elements around SVG are necessary to properly isolate animation:
		// - SVG elements in IE do not support anim/trans so they must be set on a parent HTML element.
		// - SPINNER_ANIMATION isolates svg from parent display and is always centered inside root element.
		return (
			<Styled.Spinner.Container as={tagName}>
				<Styled.Spinner.SVG.Container
					width={size}
					height={size}
					strokeWidth={strokeWidth.toFixed(2)}
					viewBox={this.getViewBox(strokeWidth)}
					intent={intent}
					isSpinning={isSpinning}
				>
					<Styled.Spinner.SVG.Path.Head
						d={SPINNER_TRACK}
						pathLength={PATH_LENGTH}
						strokeDasharray={`${PATH_LENGTH} ${PATH_LENGTH}`}
						strokeDashoffset={strokeOffset}
						intent={intent}
					/>
					<Styled.Spinner.SVG.Path.Track d={SPINNER_TRACK} intent={intent} />
				</Styled.Spinner.SVG.Container>
			</Styled.Spinner.Container>
		);
	}

	protected validateProps(props: ISpinnerProps) {
		const { value } = props;
		if (value > 1 || value < 0) {
			console.warn(Errors.SPINNER_WARN_VALUE_OUT_OF_BOUNDS);
		}
	}

	/**
	 * Resolve size to a pixel value.
	 * Size can be set by props, default, or minimum constant.
	 */
	private getSize() {
		const { size } = this.props;
		if (size == null) {
			return Spinner.SIZE_STANDARD;
		}
		return Math.max(MIN_SIZE, size);
	}

	/** Compute viewbox such that stroked track sits exactly at edge of image frame. */
	private getViewBox(strokeWidth: number) {
		const radius = R + strokeWidth / 2;
		const viewBoxX = (50 - radius).toFixed(2);
		const viewBoxWidth = (radius * 2).toFixed(2);
		return `${viewBoxX} ${viewBoxX} ${viewBoxWidth} ${viewBoxWidth}`;
	}
}
