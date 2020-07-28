const ns = "[STARTER-GATSBY]";

function createErrorMessage(message: string): string {
	return `${ns} | ${message}`;
}

export const RENDER_PANIC_PROPS_MUST_BE_OBJECT = createErrorMessage(
	"render(props, data) first argument must be a props object.",
);
export const RENDER_PANIC_MISSING_RENDER_AND_CHILDREN = createErrorMessage(
	"Missing `render` & `children` component prop, must provide either for valid render.",
);
export const RENDER_WARN_CHILDREN_AND_RENDER_EXIST = createErrorMessage(
	"Both `render` and `children` are specified for in a universal interface component, `render` will be used.",
);
export const RENDER_WARN_EXPECT_DATA_TO_BE_OBJECT = createErrorMessage(
	"Universal component interface normally expects data to be an object",
);
export const RENDER_WARN_UNEXPECTED_REACT_TYPE = createErrorMessage(
	'Universal component interface received object as children, expected React element,  but received unexpected React "type"',
);
