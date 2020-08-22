import * as React from "react";

export namespace React {
	/**
	 * Signature that outlines a map of <RefHandler>s
	 */
	export type RefHandlers<TKey extends string> = Record<TKey, React.Ref<any>>;
}
