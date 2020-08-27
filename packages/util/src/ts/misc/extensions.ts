/**
 * Fonts
 */
declare module "*.woff2" {
	const src: string;
	export default src;
}

declare module "*.woff" {
	const src: string;
	export default src;
}

declare module "*.eot" {
	const src: string;
	export default src;
}

declare module "*.ttf" {
	const src: string;
	export default src;
}

declare module "*.otf" {
	const src: string;
	export default src;
}

/**
 * Images
 */
declare module "*.svg" {
	const src: string;
	const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export { ReactComponent };
	export default src;
}

declare module "*.png" {
	const src: string;
	export default src;
}
