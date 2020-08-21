/**
 * Jest
 */
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import "jest-styled-components";
import "jest-extended";

/**
 * Fonts
 */
declare module "*.woff2" {
	const src: string;
	export = src;
}

declare module "*.woff" {
	const src: string;
	export = src;
}

declare module "*.eot" {
	const src: string;
	export = src;
}

declare module "*.ttf" {
	const src: string;
	export = src;
}

declare module "*.otf" {
	const src: string;
	export = src;
}

/**
 * Images
 */

declare module "*.svg" {
	const src: string;
	const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export { ReactComponent };
	export = src;
}

declare module "*.png" {
	const src: string;
	export = src;
}
