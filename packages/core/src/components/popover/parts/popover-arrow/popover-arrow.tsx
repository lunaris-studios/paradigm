import * as Popper from "@popperjs/core";
import * as React from "react";
import * as ReactPopper from "react-popper";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Styled from "./popover-arrow.styled";

export interface IPopoverArrowProps {
	/**
	 * Inherited element properties from the parent <Popper> parent.
	 */
	arrowProps?: ReactPopper.PopperArrowProps;

	/**
	 * Directional flag to indicate arrow placement
	 * @default "left"
	 */
	placement: Popper.Placement;
}

const defaultProps = Object.freeze<IPopoverArrowProps>({
	placement: "left",
});

export class PopoverArrow extends Components.AbstractPureComponent<IPopoverArrowProps> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.PopoverArrow`;
	static readonly defaultProps: IPopoverArrowProps = defaultProps;

	public render() {
		const { placement, arrowProps } = this.props;

		return (
			<Styled.PopoverArrow.Container arrowProps={arrowProps}>
				<Styled.PopoverArrow.SVG placement={placement}>
					<Styled.PopoverArrow.Path type={Styled.PopoverArrowPathType.ARROW} />
					<Styled.PopoverArrow.Path type={Styled.PopoverArrowPathType.SHADOW} />
				</Styled.PopoverArrow.SVG>
			</Styled.PopoverArrow.Container>
		);
	}
}
