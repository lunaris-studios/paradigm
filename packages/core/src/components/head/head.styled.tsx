import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";

import * as Common from "~/common";
import * as Components from "~/components";

import MidgardRegular from "~/assets/fonts/kvc-midgard-regular.otf";
import MidgardSymbols from "~/assets/fonts/kvc-midgard-symbols.otf";

// re-import `styled-components` development mode DOM classnames.
import styled, { createGlobalStyle } from "styled-components";

/**
 * Table of Contents
 *
 * [Head]
 */

/**
 * [Head]
 * - [Head.Global(GLOBAL_STYLE)]
 * - [Head.Fonts(GLOBAL_STYLE)]
 */

interface Head {
	Global: SC.GlobalStyleComponent<{}, SC.DefaultTheme>;
	Fonts: SC.GlobalStyleComponent<{}, SC.DefaultTheme>;
}

export const Head = {} as Head;

/**
 * [Head.Global]
 */

Head.Global = createGlobalStyle`
  ${Protocol.Snippets.normalize()}
  ${Protocol.Snippets.miniReset()}

  body {
    ${Protocol.Snippets.page()}
    min-height: 100vh;
    /** mobile viewport bug fix*/
    min-height: -webkit-fill-available;
  }
`;

/**
 * [Head.Fonts]
 */

Head.Fonts = createGlobalStyle`
  ${Protocol.Snippets.fontFace({
		fontFamily: "KVC Midgard",
		fontFilePath: "MidgardRegular",
		fileFormats: ["otf"],
		fontWeight: "regular",
	})}

  ${Protocol.Snippets.fontFace({
		fontFamily: "KVC Midgard",
		fontFilePath: "MidgardSymbols",
		fileFormats: ["otf"],
		fontWeight: "regular",
	})}
`;
