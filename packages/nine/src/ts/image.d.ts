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
