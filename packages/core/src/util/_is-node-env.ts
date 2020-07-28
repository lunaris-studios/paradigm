import * as Common from "~/common";

/** Returns whether `process.env.NODE_ENV` exists and equals `env`. */
export function isNodeEnv(env: Common.NodeEnv) {
	return typeof process !== "undefined" && process.env && process.env.NODE_ENV === env;
}
