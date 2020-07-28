const ns = "[STARTER-GATSBY]";

function createErrorMessage(message: string): string {
	return `${ns} | ${message}`;
}

export const RENDER_WARN_EXPECT_DATA_TO_BE_OBJECT = createErrorMessage("");
