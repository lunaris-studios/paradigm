import classNames from "classnames";
import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

export interface IMenuDividerProps extends Common.IProps {
	/** This component does not support children. */
	children?: never;

	/** Optional header title. */
	title?: React.ReactNode;
}

export class MenuDivider extends React.Component<IMenuDividerProps, {}> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.MenuDivider`;

	public render() {
		const { title } = this.props;

		if (title == null) {
			// simple divider
			return <li />;
		} else {
			// section header with title
			return (
				<li>
					<Components.H6>{title}</Components.H6>
				</li>
			);
		}
	}
}
