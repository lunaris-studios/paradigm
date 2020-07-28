import * as React from "react";
import * as Spring from "react-spring";

import * as Components from "~/components";
import * as Common from "~/common";
import * as Util from "~/util";

export interface IFadeAnimationProps {
	opacity: number;
}

export interface IFadeProps extends Spring.UseTransitionProps<boolean> {
	show: boolean;
}

const defaultProps: IFadeProps = Object.freeze<IFadeProps>({
	show: false,
	from: { opacity: 0 },
	enter: { opacity: 1 },
	leave: { opacity: 0 },
});

export class Fade extends React.PureComponent<IFadeProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.Fade`;
	public static readonly defaultProps: IFadeProps = defaultProps;

	public render() {
		if (!React.isValidElement(this.props.children)) {
			return null;
		}

		const { children, show, from, enter, leave, ...rest } = this.props;

		const { type, props } = children;

		let Component: Spring.AnimatedComponent<any>;
		if (Util.isFunction(type)) {
			Component = Spring.animated(type);
		} else if (typeof type === "string") {
			Component = Spring.animated[type as keyof JSX.IntrinsicElements];
		}

		const result = (styles: any) => {
			const newProps = {
				...props,
				style: {
					willChange: "opacity",
					...props.style,
					...styles,
				},
			};
			return <Component {...newProps} />;
		};

		return (
			<Spring.Transition
				items={show}
				from={from}
				enter={enter}
				leave={leave}
				children={(styles, show) => show && result(styles)}
			/>
		);
	}
}
