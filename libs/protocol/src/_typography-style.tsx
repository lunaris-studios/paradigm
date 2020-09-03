import * as React from "react";
import * as Typography from "typography";

export interface ITypographyStyleProps {
	typography: Typography.TypographyOptions;
}

export const TypographyStyle = (props: ITypographyStyleProps) => {
	const { typography } = props;

	return (
		<style
			id={"typography"}
			dangerouslySetInnerHTML={{
				__html: typography.toString(),
			}}
		/>
	);
};
