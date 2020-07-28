import * as Polished from "polished";
import { css } from "styled-components";

import * as BIN from "~/bin";
import * as Constants from "~/constants";

export enum BoxShadow {
	DEFAULT = "DEFAULT",
	ELEVATION = "ELEVATION",
}

interface IBoxShadowProps {
	/**
	 * Indicates the variant of custom box shadow
	 * to use.
	 * @default BoxShadow.DEFAULT
	 */
	type: BoxShadow;
}

export const boxShadowDefaultProps = Object.freeze<IBoxShadowProps>({
	type: BoxShadow.DEFAULT,
});

export function boxShadow(props: IBoxShadowProps = boxShadowDefaultProps) {
	const { type } = props;
	switch (type) {
		case BoxShadow.ELEVATION:
			return boxShadowElevation;
		default:
			return boxShadowDefault;
	}
}

const boxShadowDefault = BIN.bind("scheme", {
	[Constants.Scheme.DARK]: css`
		box-shadow: 0 0 0 1px ${Constants.Color.BLACK_5};
	`,
	[Constants.Scheme.LIGHT]: css`
		box-shadow: 0 0 0 1px ${Constants.Color.BLACK_4};
	`,
});

const BORDER_SHADOW_OPACITY_LIGHT = 0.1;
const DROP_SHADOW_OPACITY_LIGHT = 0.2;

const BORDER_SHADOW_OPACITY_DARK = BORDER_SHADOW_OPACITY_LIGHT * 2;
const DROP_SHADOW_OPACITY_DARK = DROP_SHADOW_OPACITY_LIGHT * 2;

const boxShadowElevation = BIN.bind.variants("scheme", "elevation", {
	[Constants.Elevation.ZERO]: {
		[Constants.Scheme.LIGHT]: css`
			box-shadow: 0 0 0 1px ${Constants.Color.BLACK_5},
				0 0 0 ${Constants.Color.TRANSPARENT}, 0 0 0 ${Constants.Color.TRANSPARENT};
		`,
		[Constants.Scheme.DARK]: css`
			box-shadow: 0 0 0 1px ${Constants.Color.BLACK_4},
				0 0 0 ${Constants.Color.TRANSPARENT}, 0 0 0 ${Constants.Color.TRANSPARENT};
		`,
	},
	[Constants.Elevation.ONE]: {
		[Constants.Scheme.LIGHT]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_LIGHT)},
				0 0 0 ${Constants.Color.TRANSPARENT},
				0 1px 1px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)};
		`,
		[Constants.Scheme.DARK]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_DARK)},
				0 0 0 ${Constants.Color.TRANSPARENT},
				0 1px 1px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)};
		`,
	},
	[Constants.Elevation.TWO]: {
		[Constants.Scheme.LIGHT]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_LIGHT)},
				0 1px 1px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)},
				0 2px 6px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)};
		`,
		[Constants.Scheme.DARK]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_DARK)},
				0 1px 1px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)},
				0 2px 6px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)};
		`,
	},
	[Constants.Elevation.THREE]: {
		[Constants.Scheme.LIGHT]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_LIGHT)},
				0 2px 4px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)},
				0 8px 24px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)};
		`,
		[Constants.Scheme.DARK]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_DARK)},
				0 2px 4px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)},
				0 8px 24px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)};
		`,
	},
	[Constants.Elevation.FOUR]: {
		[Constants.Scheme.LIGHT]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_LIGHT)},
				0 4px 8px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)},
				0 18px 46px 6px
					${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_LIGHT)};
		`,
		[Constants.Scheme.DARK]: css`
			box-shadow: 0 0 0 1px
					${Polished.rgba(Constants.Color.BLACK_1, BORDER_SHADOW_OPACITY_DARK)},
				0 4px 8px ${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)},
				0 18px 46px 6px
					${Polished.rgba(Constants.Color.BLACK_1, DROP_SHADOW_OPACITY_DARK)};
		`,
	},
});
