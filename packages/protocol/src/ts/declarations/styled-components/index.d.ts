import * as BIN from "~/bin";

import "styled-components";

declare module "styled-components" {
	/**
	 * Intended declaration merge for extension of the root theme
	 * in all `styled-components`.
	 *
	 * https://styled-components.com/docs/api#create-a-declarations-file
	 */
	export interface DefaultTheme extends BIN.Theme {}
}
