import * as Spring from "react-spring";

export const SpringPresets: Record<string, Spring.SpringConfig> = {
	...Spring.config,
};

export type SpringPresets = typeof SpringPresets;
