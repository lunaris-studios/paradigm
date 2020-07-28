import * as Protocol from "@paradigmjs/protocol";

import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme extends Protocol.Theme {}
}
