import { DISPLAYNAME_PREFIX } from "./_props";
import { create } from "lodash";

function createErrorMessage(message: string): string {
	return "${DISPLAYNAME_PREFIX} | ${message}";
}

// TODO(sam): alphabetize errors.

/**
 * Clamp
 */
export const CLAMP_MIN_MAX = createErrorMessage("clamp: max cannot be less than min");

/**
 * Alert
 */
export const ALERT_WARN_CANCEL_PROPS = createErrorMessage(
	"<Alert> cancelButtonText and onCancel should be set together.",
);
export const ALERT_WARN_CANCEL_ESCAPE_KEY = createErrorMessage(
	"<Alert> canEscapeKeyCancel enabled without onCancel or onClose handler.",
);
export const ALERT_WARN_CANCEL_OUTSIDE_CLICK = createErrorMessage(
	"<Alert> canOutsideClickCancel enabled without onCancel or onClose handler.",
);

/**
 * Collapsible List
 */
export const COLLAPSIBLE_LIST_INVALID_CHILD = createErrorMessage(
	"<CollapsibleList> children must be <MenuItem>s",
);

/**
 * Context Menu
 */
export const CONTEXTMENU_WARN_DECORATOR_NO_METHOD = createErrorMessage(
	"@ContextMenuTarget-decorated class should implement renderContextMenu.",
);
export const CONTEXTMENU_WARN_DECORATOR_NEEDS_REACT_ELEMENT = createErrorMessage(
	"@ContextMenuTarget-decorated components must return a single JSX.Element or an empty render.",
);

/**
 * Hotkeys
 */
export const HOTKEYS_HOTKEY_CHILDREN = createErrorMessage(
	"<Hotkeys> only accepts <Hotkey> children.",
);
export const HOTKEYS_WARN_DECORATOR_NO_METHOD = createErrorMessage(
	"@HotkeysTarget-decorated class should implement renderHotkeys.",
);
export const HOTKEYS_WARN_DECORATOR_NEEDS_REACT_ELEMENT = createErrorMessage(
	"@HotkeysTarget-decorated components must return a single JSX.Element or an empty render.",
);

/**
 * Input
 */
export const INPUT_WARN_LEFT_ELEMENT_LEFT_ICON_MUTEX = createErrorMessage(
	"<InputGroup> leftElement and leftIcon prop are mutually exclusive, with leftElement taking priority.",
);

/**
 * Numeric Input
 */
export const NUMERIC_INPUT_MIN_MAX = createErrorMessage(
	"<NumericInput> requires min to be no greater than max if both are defined.",
);
export const NUMERIC_INPUT_MINOR_STEP_SIZE_BOUND = createErrorMessage(
	"<NumericInput> requires minorStepSize to be no greater than stepSize.",
);
export const NUMERIC_INPUT_MAJOR_STEP_SIZE_BOUND = createErrorMessage(
	"<NumericInput> requires stepSize to be no greater than majorStepSize.",
);
export const NUMERIC_INPUT_MINOR_STEP_SIZE_NON_POSITIVE = createErrorMessage(
	"<NumericInput> requires minorStepSize to be strictly greater than zero.",
);
export const NUMERIC_INPUT_MAJOR_STEP_SIZE_NON_POSITIVE = createErrorMessage(
	"<NumericInput> requires majorStepSize to be strictly greater than zero.",
);
export const NUMERIC_INPUT_STEP_SIZE_NON_POSITIVE = createErrorMessage(
	"<NumericInput> requires stepSize to be strictly greater than zero.",
);
export const NUMERIC_INPUT_STEP_SIZE_NULL = createErrorMessage(
	"<NumericInput> requires stepSize to be defined.",
);

/**
 * Panel Stack
 */
export const PANEL_STACK_INITIAL_PANEL_STACK_MUTEX = createErrorMessage(
	"<PanelStack> requires exactly one of initialPanel and stack prop",
);
export const PANEL_STACK_REQUIRES_PANEL = createErrorMessage(
	"<PanelStack> requires at least one panel in the stack",
);

/**
 * Overflow List
 */
export const OVERFLOW_LIST_OBSERVE_PARENTS_CHANGED = createErrorMessage(
	"<OverflowList> does not support changing observeParents after mounting.",
);

/**
 * Popover
 */
export const POPOVER_REQUIRES_TARGET = createErrorMessage(
	"<Popover> requires target prop or at least one child element.",
);
export const POPOVER_HAS_BACKDROP_INTERACTION = createErrorMessage(
	"<Popover hasBackdrop={true}> requires interactionKind={PopoverInteractionKind.CLICK}.",
);
export const POPOVER_WARN_TOO_MANY_CHILDREN = createErrorMessage(
	" <Popover> supports one or two children; additional children are ignored." +
		" First child is the target, second child is the content. You may instead supply these two as props.",
);
export const POPOVER_WARN_DOUBLE_CONTENT = createErrorMessage(
	"<Popover> with two children ignores content prop; use either prop or children.",
);
export const POPOVER_WARN_DOUBLE_TARGET = createErrorMessage(
	"<Popover> with children ignores target prop; use either prop or children.",
);
export const POPOVER_WARN_EMPTY_CONTENT = createErrorMessage(
	"Disabling <Popover> with empty/whitespace content...",
);
export const POPOVER_WARN_HAS_BACKDROP_INLINE = createErrorMessage(
	"<Popover usePortal={false}> ignores hasBackdrop",
);
export const POPOVER_WARN_UNCONTROLLED_ONINTERACTION = createErrorMessage(
	"<Popover> onInteraction is ignored when uncontrolled.",
);

/**
 * Portal
 */
export const PORTAL_CONTEXT_CLASS_NAME_STRING = createErrorMessage(
	"<Portal> context blueprintPortalClassName must be string",
);

/**
 * Radio Group
 */
export const RADIOGROUP_WARN_CHILDREN_OPTIONS_MUTEX = createErrorMessage(
	"<RadioGroup> children and options prop are mutually exclusive, with options taking priority.",
);

/**
 * Slider
 */
export const SLIDER_ZERO_STEP = createErrorMessage(
	"<Slider> stepSize must be greater than zero.",
);
export const SLIDER_ZERO_LABEL_STEP = createErrorMessage(
	"<Slider> labelStepSize must be greater than zero.",
);
export const RANGESLIDER_NULL_VALUE = createErrorMessage(
	"<RangeSlider> value prop must be an array of two non-null numbers.",
);
export const MULTISLIDER_INVALID_CHILD = createErrorMessage(
	"<MultiSlider> children must be <SliderHandle>s or <SliderTrackStop>s",
);

/**
 * Spinner
 */
export const SPINNER_WARN_CLASSES_SIZE = createErrorMessage(
	"<Spinner> Classes.SMALL/LARGE are ignored if size prop is set.",
);

/**
 * Toaster
 */
export const TOASTER_CREATE_NULL = createErrorMessage(
	"Toaster.create() is not supported inside React lifecycle methods in React 16." +
		" See usage example on the docs site.",
);
export const TOASTER_WARN_INLINE = createErrorMessage(
	"Toaster.create() ignores inline prop as it always creates a new element.",
);
export const TOASTER_MAX_TOASTS_INVALID = createErrorMessage(
	"<Toaster> maxToasts is set to an invalid number, must be greater than 0",
);

/**
 * Dialog
 */
export const DIALOG_WARN_NO_HEADER_ICON = createErrorMessage(
	"<Dialog> iconName is ignored if title is omitted.",
);
export const DIALOG_WARN_NO_HEADER_CLOSE_BUTTON = createErrorMessage(
	"<Dialog> isCloseButtonShown prop is ignored if title is omitted.",
);

/**
 * Drawer
 */
export const DRAWER_VERTICAL_IS_IGNORED = createErrorMessage(
	"<Drawer> vertical is ignored if position is defined",
);
export const DRAWER_ANGLE_POSITIONS_ARE_CASTED = createErrorMessage(
	"<Drawer> all angle positions are casted into pure position (TOP, BOTTOM, LEFT or RIGHT)",
);
