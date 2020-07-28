declare module "react-typography" {
	export interface ITyopgraphyStyleProps {
		typography: import("typescript").TypographyOptions;
	}

	export const TypographyStyle: import("react").FunctionComponent<ITyopgraphyStyleProps>;
}
