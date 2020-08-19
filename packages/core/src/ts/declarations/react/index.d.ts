import * as SC from "styled-components";

declare module "react" {
	interface Attributes {
		css?: SC.CSSProp;
	}
}
