import * as Abstract from "@paradigmjs/abstract";
import * as React from "react";
import * as Icons from "@paradigmjs/icons";

import * as Common from "~/common";

import * as Styled from "./icon.styled";

export interface IIconProps extends Common.IIntentProps, Common.IProps {
	/** This component does not support custom children. Use the `icon` prop. */
	children?: never;

	/**
	 * Color of icon. This is used as the `fill` attribute on the `<svg>` image
	 * so it will override any CSS `color` property, including that set by
	 * `intent`. If this prop is omitted, icon color is inherited from
	 * surrounding text.
	 */
	color?: string;

	/**
	 * String for the `title` attribute on the rendered element, which will appear
	 * on hover as a native browser tooltip.
	 */
	htmlTitle?: string;

	/**
	 * Name of a Blueprint UI icon, or an icon element, to render. This prop is
	 * required because it determines the content of the component, but it can
	 * be explicitly set to falsy values to render nothing.
	 *
	 * - If `null` or `undefined` or `false`, this component will render
	 *   nothing.
	 * - If given an `IconName` (a string literal union of all icon names), that
	 *   icon will be rendered as an `<svg>` with `<path>` tags. Unknown strings
	 *   will render a blank icon to occupy space.
	 * - If given a `JSX.Element`, that element will be rendered and _all other
	 *   props on this component are ignored._ This type is supported to
	 *   simplify icon support in other Blueprint components. As a consumer, you
	 *   should avoid using `<Icon icon={<Element />}` directly; simply render
	 *   `<Element />` instead.
	 */
	icon?: Icons.IconName | Common.MaybeElement;

	/**
	 * Size of the icon, in pixels. Blueprint contains 16px and 20px SVG icon
	 * images, and chooses the appropriate resolution based on this prop.
	 * @default Icon.SIZE_STANDARD = 16
	 */
	iconSize: number;

	/** CSS style properties. */
	style?: React.CSSProperties;

	/**
	 * HTML tag to use for the rendered element.
	 * @default "span"
	 */
	tagName: keyof JSX.IntrinsicElements;

	/**
	 * Description string. This string does not appear in normal browsers, but
	 * it increases accessibility. For instance, screen readers will use it for
	 * aural feedback. By default, this is set to the icon's name. Pass an
	 * explicit falsy value to disable.
	 */
	title?: string | false | null;
}

export enum IconSize {
	SIZE_STANDARD = 16,
	SIZE_LARGE = 20,
}

const defaultProps = Object.freeze<IIconProps>({
	iconSize: IconSize.SIZE_STANDARD,
	tagName: "span",
});

export class Icon extends Abstract.AbstractPureComponent<
	IIconProps & React.DOMAttributes<HTMLElement>
> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Icon`;

	public static readonly SIZE_STANDARD = IconSize.SIZE_STANDARD;
	public static readonly SIZE_LARGE = IconSize.SIZE_LARGE;

	public static readonly defaultProps: IIconProps = defaultProps;

	public render(): JSX.Element | null {
		const { icon } = this.props;

		if (icon === undefined || typeof icon === "boolean") {
			return null;
		} else if (typeof icon !== "string") {
			return icon;
		}

		const {
			color,
			htmlTitle,
			iconSize,
			intent,
			title = icon,
			tagName,
			...htmlprops
		} = this.props;

		// choose which pixel grid is most appropriate for given icon size
		const pixelGridSize =
			iconSize! >= Icon.SIZE_LARGE ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD;
		// render path elements, or nothing if icon name is unknown.
		const paths = this.renderSvgPaths(pixelGridSize, icon);

		const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`;

		return (
			<Styled.Icon.Container as={tagName} {...htmlprops}>
				<Styled.Icon.SVG
					fill={color}
					data-icon={icon}
					width={iconSize}
					height={iconSize}
					viewBox={viewBox}
				>
					{title && <Styled.Icon.Title>{title}</Styled.Icon.Title>}
					{paths}
				</Styled.Icon.SVG>
			</Styled.Icon.Container>
		);
	}

	/**
	 * Render `<path>` elements for the given icon name. Returns `null`
	 * if name is unknown.
	 */
	private renderSvgPaths(
		pathsSize: number,
		iconName: Icons.IconName,
	): JSX.Element[] | null {
		const svgPathsRecord =
			pathsSize === Icon.SIZE_STANDARD ? Icons.IconSvgPaths16 : Icons.IconSvgPaths20;
		const pathStrings = svgPathsRecord[iconName];
		if (pathStrings == null) {
			return null;
		}
		return pathStrings.map((d, i) => <path key={i} d={d} fillRule="evenodd" />);
	}
}
