import * as Protocol from "@paradigmjs/protocol";

import "styled-components";

declare module "styled-components" {
	export declare interface IDefaultTheme extends Protocol.Theme {}
}
