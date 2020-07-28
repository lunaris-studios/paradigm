import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Styled from "./menu.styled";

export interface IMenuProps
	extends Common.IProps,
		React.HTMLAttributes<HTMLUListElement> {
	/** Ref handler that receives the HTML `<ul>` element backing this component. */
	ulRef?: (ref: HTMLUListElement | null) => any;
}

export class Menu extends Components.AbstractPureComponent<IMenuProps> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Menu`;

	// public static Divider = Parts.MenuDivider;
	// public static Item = Parts.MenuItem;

	public render() {
		const { children, ulRef, ...htmlProps } = this.props;

		return (
			<Styled.Menu.Container {...htmlProps} ref={ulRef}>
				{children}
			</Styled.Menu.Container>
		);
	}
}
