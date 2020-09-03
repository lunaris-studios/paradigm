import { DISPLAYNAME_PREFIX } from "./_props";

function createErrorMessage(message: string): string {
	return `${DISPLAYNAME_PREFIX} | ${message}`;
}
