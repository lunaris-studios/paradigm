import * as React from "react";

import { isFunction } from "lodash-es";

/**
 * Returns true if `node` is null/undefined, false, empty string, or an array
 * composed of those. If `node` is an array, only one level of the array is
 * checked, for performance reasons.
 */
export function isReactNodeEmpty(node?: React.ReactNode, skipArray = false): boolean {
	return (
		node == null ||
		node === "" ||
		node === false ||
		(!skipArray &&
			Array.isArray(node) &&
			// only recurse one level through arrays, for performance
			(node.length === 0 || node.every((n) => isReactNodeEmpty(n, true))))
	);
}

/**
 * Converts a React node to an element: non-empty string or number or
 * `React.Fragment` (React 16.3+) is wrapped in given tag name; empty strings
 * and booleans are discarded.
 */
export function ensureElement(
	child: React.ReactNode | undefined,
	tagName: keyof JSX.IntrinsicElements = "span",
) {
	if (child == null || typeof child === "boolean") {
		return undefined;
	} else if (typeof child === "string") {
		// cull whitespace strings
		return child.trim().length > 0 ? React.createElement(tagName, {}, child) : undefined;
	} else if (
		typeof child === "number" ||
		typeof (child as any).type === "symbol" ||
		Array.isArray(child)
	) {
		// React.Fragment has a symbol type, ReactNodeArray extends from Array
		return React.createElement(tagName, {}, child);
	} else if (isReactElement(child)) {
		return child;
	} else {
		// child is inferred as {}
		return undefined;
	}
}

/**
 * Returns true if `node` is of type <ReactElement>. If `node` is not,
 * returns false.
 */
export function isReactElement<T = any>(
	child: React.ReactNode,
): child is React.ReactElement<T> {
	return (
		typeof child === "object" &&
		typeof (child as any).type !== "undefined" &&
		typeof (child as any).props !== "undefined"
	);
}

/**
 * Represents anything that has a `name` property such as Functions.
 */
export interface INamed {
	name?: string;
}

/**
 * Returns the display name of a React Component if available.

 * @param ComponentClass React Component element in question
 */
export function getDisplayName(ComponentClass: React.ComponentType | INamed) {
	return (
		(ComponentClass as React.ComponentType).displayName ||
		(ComponentClass as INamed).name ||
		"Unknown"
	);
}

/**
 * Returns true if the given JSX element matches the given component type.
 *
 * NOTE: This function only checks equality of `displayName` for performance and
 * to tolerate multiple minor versions of a component being included in one
 * application bundle.
 * @param element JSX element in question
 * @param ComponentType desired component type of element
 */
export function isElementOfType<P = {}>(
	element: any,
	ComponentType: React.ComponentType<P>,
): element is React.ReactElement<P> {
	return (
		element != null &&
		element.type != null &&
		element.type.displayName != null &&
		element.type.displayName === ComponentType.displayName
	);
}

/**
 * Given the version number MAJOR.MINOR.PATCH of the installed React library,
 * returns the MAJOR version integer.
 */
export function getReactMajorVersion(): number {
	const majorVersionString = React.version.substr(0, React.version.indexOf("."));
	const majorVersionNumber = parseInt(majorVersionString);
	return majorVersionNumber;
}

/**
 * Given the version number MAJOR.MINOR.PATCH of the installed React library,
 * returns true if the MAJOR version integer is greater than or equal
 * to version `16`.
 */
export function isReact16Plus(): boolean {
	const majorVerison = getReactMajorVersion();
	return Boolean(majorVerison >= 16);
}

/**
 * Returns type `T` if extension of `render` is valid.
 */
type HasRenderProp<T> = T extends { render: (props: any) => React.ReactNode } ? T : never;

/**
 * Returns true if component props contains `render`.
 */
export function hasRender<T extends {}>(props: T): props is HasRenderProp<T> {
	return "render" in props && isFunction((props as HasRenderProp<T>).render);
}

/**
 * Returns type `T` if extension of `children` is valid.
 */
type HasChildrenProp<T> = T extends { children: (props: any) => React.ReactNode }
	? T
	: never;

/**
 * Returns true if component props contains `children`.
 */
export function hasChildren<T extends {}>(props: T): props is HasChildrenProp<T> {
	return "children" in props && isFunction((props as HasChildrenProp<T>).children);
}

/** A collection of curated prop keys used across our Components which are not valid HTMLElement props. */
const INVALID_PROPS = [
	"active",
	"alignText",
	"containerRef",
	"current",
	"elementRef",
	"fill",
	"icon",
	"inputRef",
	"intent",
	"inline",
	"large",
	"loading",
	"leftElement",
	"leftIcon",
	"minimal",
	"onRemove", // ITagProps, ITagInputProps
	"outlined", // IButtonProps
	"panel", // ITabProps
	"panelClassName", // ITabProps
	"popoverProps",
	"rightElement",
	"rightIcon",
	"round",
	"small",
	"text",
];

/**
 * Typically applied to HTMLElements to filter out blacklisted props. When applied to a Component,
 * can filter props from being passed down to the children. Can also filter by a combined list of
 * supplied prop keys and the blacklist (only appropriate for HTMLElements).
 * @param props The original props object to filter down.
 * @param {InvalidProps[]} invalidProps If supplied, overwrites the default blacklist.
 * @param {boolean} shouldMerge If true, will merge supplied invalidProps and blacklist together.
 */
export function removeNonHTMLProps(
	props: { [key: string]: any },
	invalidProps = INVALID_PROPS,
	shouldMerge = false,
): { [key: string]: any } {
	if (shouldMerge) {
		invalidProps = invalidProps.concat(INVALID_PROPS);
	}

	return invalidProps.reduce(
		(prev, curr) => {
			if (prev.hasOwnProperty(curr)) {
				delete prev[curr];
			}

			return prev;
		},
		{ ...props },
	);
}
