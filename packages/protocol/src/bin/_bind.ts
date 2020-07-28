import * as SC from "styled-components";

type ThemedStyledProps<TProps extends object = {}> = SC.ThemedStyledProps<
	TProps,
	SC.DefaultTheme
>;

type Binds = SC.DefaultTheme["binds"];
type BindName = keyof Binds;
type BindThemeName<TBindName extends BindName> = Binds[TBindName];
type VariantName = string;

type BindValueResult = string | number | SC.FlattenInterpolation<ThemedStyledProps<any>>;
type BindValueFn = (props: object) => BindValueResult;
type BindValue = BindValueFn | BindValueResult;

type BindMap<TBindName extends BindName> = {
	[key in BindThemeName<TBindName>]: BindValue;
};
type VariantMap<TBindName extends BindName> = {
	[key in VariantName]: BindMap<TBindName>;
};

export type Bind = (props: ThemedStyledProps<any>) => BindValue;
export type Variant = (props: ThemedStyledProps<any>) => BindValue;

function getBindValue<TBindName extends BindName>(
	bindName: TBindName,
	props: ThemedStyledProps,
	values: BindMap<TBindName>,
): BindValue {
	/** corresponds the key in the `theme.binds` object via `styled-components` <ThemeProvider> */
	const bindThemeName = props.theme && props.theme.binds && props.theme.binds[bindName];
	const bindValue = values[bindThemeName];

	return bindValue;
}

/**
 * A function that binds to the provided value of a key present in your <BindProvider>
 * theme.
 *
 * @param {BindKey} bindName - String matching one of the keys in your <BindProvider> theme.
 * @param {BindMap} bindValues - An object where one of the keys will be selected by the value provided to <BindProvider> theme.
 */
export function bind<TBindName extends BindName>(
	bindName: TBindName,
	bindValues: BindMap<TBindName>,
): Bind {
	return function (props: ThemedStyledProps<any>): BindValue {
		return getBindValue(bindName, props, bindValues);
	};
}

/**
 * It's often useful to create variants of the same component that are selected via an additional prop.
 * To make this easier with theming, the `bind.variants` functions extends the default behavior of the
 * `bind` function to allow for an arbitrary object of variants for the provided `bindName`.
 *
 * @param {BindName} bindName - String matching one of the keys in your <BindProvider> theme.
 * @param {VariantName} variantName - String matching one of the keys in the <VariantMap> `values` object.
 * @param {VariantMap} variantValues - Object consisting of an arbitrary amount of variants for provided `bindName`.
 */
bind.variants = function <TBindName extends BindName>(
	bindName: TBindName,
	variantName: VariantName,
	variantValues: VariantMap<TBindName>,
): Variant {
	return function (props: ThemedStyledProps<any>): BindValue {
		const variant = props[variantName] && variantValues[props[variantName]];
		return variant && getBindValue(bindName, props, variant);
	};
};
