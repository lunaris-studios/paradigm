import * as Components from "~/components";
import styled from "styled-components";

export interface IAbstractImageProps {}

export interface IAbstractImageState {
	// TODO (sam): replace with common lib
	dimensions: Nullable<ImageDimensions>;
}

type ImageDimensions = {
	height: number;
	width: number;
};

const defaultProps = Object.freeze<IAbstractImageProps>({});

export class AbstractImage<
	HTMLAttributes extends React.HTMLAttributes<HTMLImageElement>
> extends Components.AbstractComponent<
	IAbstractImageProps & HTMLAttributes,
	IAbstractImageState
> {
	constructor(props, context) {
		super(props);
		this.state = { dimensions: null };
		this.onImgLoad = this.onImgLoad.bind(this);
	}

	static readonly defaultProps: IAbstractImageProps = {};

	public onImgLoad(event: React.SyntheticEvent<HTMLImageElement, Event>): void {
		const { currentTarget: img } = event;
		this.setState({ dimensions: { height: img.offsetHeight, width: img.offsetWidth } });
	}

	render() {
		const { src } = this.props;
		const { width, height } = this.state.dimensions;

		return <img {...(this.props, width, height)} src={src} onLoad={this.onImgLoad} />;
	}
}
