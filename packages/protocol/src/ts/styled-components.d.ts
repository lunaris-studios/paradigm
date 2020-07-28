import "styled-components";

import * as BIN from "~/bin";

declare module "styled-components" {
	export interface DefaultTheme extends BIN.Theme {}
}
