declare module "react-typography" {
	export interface TypographyStyleProps<T extends object, U extends object = T> {
		typography: T | ((theme: U) => T);
	}
	export type BaseTypographyStyleComponent<
		T extends object,
		U extends object = T
	> = React.ComponentClass<TypographyStyleProps<T, U>>;
	export type TypographyStyleComponent<
		T extends object,
		U extends object = T
	> = BaseTypographyStyleComponent<AnyIfEmpty<T>, AnyIfEmpty<U>>;
	export const TypographyStyle: TypographyStyleComponent<AnyIfEmpty<DefaultTheme>>;
}
