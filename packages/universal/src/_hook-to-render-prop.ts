import * as React from "react";
import { render } from "./_render";

// export type MapPropsToArgs<Props extends {}, Args extends any[]> = (props: Props) => Args;
// export type CreateRenderProp = <Props extends {}, Args extends any[], State extends any>(
// 	hook: (...args: Args) => State,
// 	mapPropsToArgs?: MapPropsToArgs<Props, Args>,
// ) => React.FC<Props>;

// const defaultMapPropsToArgs = (props: any) => [props];

// export const hookToRenderProp: CreateRenderProp = (
// 	hook: any,
// 	mapPropsToArgs = defaultMapPropsToArgs as any,
// ) => (props) => render(props, hook(...mapPropsToArgs(props)));
