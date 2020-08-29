import * as IconNames from "./generated/icon-names";

/** String literal union type of all Paradigm UI icon names. */
export type IconName = typeof IconNames[keyof typeof IconNames];
