import * as Protocol from "@paradigmjs/protocol";
import * as SC from "styled-components";
// re-import `styled-components` development mode DOM classnames.
import styled, { createGlobalStyle } from "styled-components";

/**
 * Table of Contents
 *
 * [Head]
 */

/**
 * [Head]
 * - [Head.Global(GLOBAL)]
 */

interface Head {
	Global: SC.GlobalStyleComponent<{}, SC.DefaultTheme>;
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
