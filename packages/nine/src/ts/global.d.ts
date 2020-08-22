/**
 * Type Imports
 */
import type {} from "@paradigmjs/util/dist/ts/declarations/styled-components";
import type {} from "@testing-library/jest-dom/extend-expect";
import type {} from "@testing-library/jest-dom";
import type {} from "jest-styled-components";
import type {} from "jest-extended";
import type {} from "styled-components/cssprop";

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
