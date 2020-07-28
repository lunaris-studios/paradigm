import * as Util from "@paradigmjs/util";

import * as Common from "~/common";
import * as TS from "~/ts";

export interface IRenderProps<TProps> extends TS.UniversalProps<TProps> {}

export function render<TProps extends IRenderProps<TData>, TData extends object>(
	props: TProps,
	data: TData,
) {
	if (process.env.NODE_ENV !== "production") {
		if (typeof props !== "object") {
			throw new TypeError(Common.Errors.RENDER_PANIC_PROPS_MUST_BE_OBJECT);
		}

		if (Util.hasRender(props) && Util.hasChildren(props)) {
			console.warn({
				message: Common.Errors.RENDER_WARN_CHILDREN_AND_RENDER_EXIST,
			});
			console.trace();
		}

		if (typeof data !== "object") {
			console.warn({
				data,
				message: Common.Errors.RENDER_WARN_EXPECT_DATA_TO_BE_OBJECT,
			});
			console.trace();
		}
	}

	if (Util.hasRender(props)) {
		return props.render(data);
	}

	if (Util.hasChildren(props)) {
		return props.children(data);
	}

	throw new Error(Common.Errors.RENDER_PANIC_MISSING_RENDER_AND_CHILDREN);
}
