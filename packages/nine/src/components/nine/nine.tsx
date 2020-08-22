import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";
import * as Util from "@paradigmjs/util";

import * as Common from "~/common";

import * as Errors from "./nine.errors";
import * as Styled from "./nine.styled";
import * as Types from "./nine.types";

export interface INineProps {
	/**
	 * Squared length reserved for the non-scalable, static corner elements.
	 * of the 9-slice layout.
	 * @default 8;
	 */
	corner: number;

	/**
	 * Height of the surface.
	 * @default 128
	 */
	height: number;

	/**
	 * File path of the image to use for the background of the 9-slice
	 * surface.
	 */
	image: string;

	/**
	 * Styling to apply to the child element.
	 */
	style?: object;

	/**
	 * HTML tag to use for element.
	 * @default "div"
	 */
	tagName: keyof JSX.IntrinsicElements;

	/**
	 * Width of the surface.
	 * @default 128
	 */
	width: number;
}

export interface INineDefaultProps extends Omit<INineProps, "image"> {}

export interface INineState {
	/**
	 * Height & width of the 9-slice image
	 * @default undefined
	 */
	imageSize: Types.INineImageDimensions | undefined;
}

const defaultProps = Object.freeze<INineDefaultProps>({
	corner: 8,
	height: 128,
	tagName: "div",
	width: 128,
});

const defaultState = Object.freeze<INineState>({
	imageSize: undefined,
});

export class Nine extends Abstract.AbstractPureComponent<INineProps, INineState> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.Nine`;

	public constructor(props: INineProps) {
		super(props);

		this.onImgLoad = this.onImgLoad.bind(this);
	}

	public static readonly defaultProps: INineDefaultProps = defaultProps;

	public static Styled = Styled;
	public static Errors = Errors;
	public static Types = Types;

	public state: INineState = defaultState;

	public render(): JSX.Element | null {
		const { children, corner, height, image, tagName, width } = this.props;
		const { imageSize } = this.state;

		const sectionProps = { corner, image, imageSize };

		return (
			<React.Fragment>
				<Styled.Nine.StubImage src={image} onLoad={this.onImgLoad} />
				<Styled.Nine.Container height={height} width={width} as={tagName}>
					{/* Row One */}
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.NORTH_WEST}
						{...sectionProps}
					/>
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.NORTH}
						{...sectionProps}
					/>
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.NORTH_EAST}
						{...sectionProps}
					/>

					{/* Row Two */}
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.WEST}
						{...sectionProps}
					/>
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.CENTER}
						{...sectionProps}
					>
						{children}
					</Styled.Nine.Section>
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.EAST}
						{...sectionProps}
					/>

					{/* Row Three */}
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.SOUTH_WEST}
						{...sectionProps}
					/>
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.SOUTH}
						{...sectionProps}
					/>
					<Styled.Nine.Section
						coordinates={Types.NineCoordinate.SOUTH_EAST}
						{...sectionProps}
					/>
				</Styled.Nine.Container>
			</React.Fragment>
		);
	}

	/** */

	protected validateProps(props: INineProps): void {
		const { height, image, corner, width } = props;

		if (height == null) {
			console.warn(Errors.WARN_NO_HEIGHT);
		}
		if (image == null) {
			console.error(Errors.ERROR_NO_IMAGE);
		}
		if (corner == null) {
			console.warn(Errors.WARN_NO_CORNER);
		}
		if (width == null) {
			console.warn(Errors.WARN_NO_WIDTH);
		}
	}

	public onImgLoad(event: React.SyntheticEvent<HTMLImageElement, Event>): void {
		const { currentTarget: img } = event;

		this.setState({
			imageSize: {
				height: img.offsetHeight,
				width: img.offsetWidth,
			},
		});
	}
}
