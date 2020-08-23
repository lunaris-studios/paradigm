import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";

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
	 * Passed as a child to the `Types.NineCoordinate.CENTER` 9-slice section.
	 */
	children: React.ReactNode;

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

export interface INineDefaultProps extends Omit<INineProps, "image" | "children"> {}

export interface INineState {
	/**
	 * Height & width of the 9-slice image.
	 * @default undefined
	 */
	imageSize: Types.INineImageSize | undefined;

	/**
	 * Indicates whether or not the image has finished loading.
	 * @default false
	 */
	isLoaded: boolean;
}

const defaultProps = Object.freeze<INineDefaultProps>({
	corner: 8,
	height: 128,
	tagName: "div",
	width: 128,
});

const defaultState = Object.freeze<INineState>({
	imageSize: undefined,
	isLoaded: false,
});

export class Nine extends Abstract.AbstractPureComponent<INineProps, INineState> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.Nine`;

	public constructor(props: INineProps) {
		super(props);

		this.onImgLoad = this.onImgLoad.bind(this);
	}

	public static readonly defaultProps: INineDefaultProps = defaultProps;
	public state: INineState = defaultState;

	public static Styled = Styled;
	public static Errors = Errors;
	public static Types = Types;

	public render(): JSX.Element | null {
		const { children, corner, height, image, tagName, width } = this.props;
		const { imageSize, isLoaded } = this.state;

		const sectionProps = { corner, height, image, imageSize, width };

		return (
			<React.Fragment>
				<Styled.Nine.StubImage src={image} onLoad={this.onImgLoad} />
				{isLoaded ? (
					<Styled.Nine.Container
						as={tagName}
						corner={corner}
						height={height}
						width={width}
					>
						{/* Row One */}
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.NORTH_WEST}
							{...sectionProps}
						/>
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.NORTH}
							{...sectionProps}
						/>
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.NORTH_EAST}
							{...sectionProps}
						/>

						{/* Row Two */}
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.WEST}
							{...sectionProps}
						/>
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.CENTER}
							{...sectionProps}
						>
							{children}
						</Styled.Nine.Section>
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.EAST}
							{...sectionProps}
						/>

						{/* Row Three */}
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.SOUTH_WEST}
							{...sectionProps}
						/>
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.SOUTH}
							{...sectionProps}
						/>
						<Styled.Nine.Section
							coordinate={Types.NineCoordinate.SOUTH_EAST}
							{...sectionProps}
						/>
					</Styled.Nine.Container>
				) : null}
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
				height: img.naturalHeight,
				width: img.naturalWidth,
			},
			isLoaded: true,
		});
	}
}
