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
 * @param {string[]} invalidProps If supplied, overwrites the default blacklist.
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
				delete (prev as any)[curr];
			}
			return prev;
		},
		{ ...props },
	);
}
