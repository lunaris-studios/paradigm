import * as React from "react";
import * as Testing from "@testing-library/react";

import * as Util from "$abstract/util";

import * as Component from "./abstract-pure-component";

const TEST_TIMEOUT = 10;

describe("AbstractPureComponent", () => {
	interface IAbstractPureComponentWithTimeoutProps {}

	class AbstractPureComponent extends Component.AbstractPureComponent<
		IAbstractPureComponentWithTimeoutProps
	> {
		public render(): JSX.Element {
			return <div />;
		}
	}

	it("renders correctly", () => {
		const { baseElement } = Testing.render(<AbstractPureComponent />);
		expect(baseElement).toMatchSnapshot();
	});

	interface IAbstractPureComponentWithTimeoutProps {}
	interface IAbstractPureComponentWithTimeoutState {
		flag: number;
	}

	class AbstractPureComponentWithTimeout extends Component.AbstractPureComponent<
		IAbstractPureComponentWithTimeoutProps,
		IAbstractPureComponentWithTimeoutState
	> {
		public state: IAbstractPureComponentWithTimeoutState = { flag: 0 };

		public timeout = this.setTimeout(
			() =>
				this.setState({
					flag: 1,
				}),
			TEST_TIMEOUT,
		);

		public render(): JSX.Element {
			const { flag } = this.state;
			return (
				<React.Fragment>
					<span data-testid="flag">{flag}</span>
					<span data-testid="timeout">{flag}</span>
				</React.Fragment>
			);
		}
	}

	it("creates timeout", async () => {
		const { getByTestId } = Testing.render(<AbstractPureComponentWithTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		await Testing.waitFor((): void => {
			expect(getByTestId("flag")).toHaveTextContent("1");
		});
	});

	it("active timeout can be cancelled", async () => {
		const { getByTestId } = Testing.render(<AbstractPureComponentWithRAFTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		Testing.fireEvent.click(getByTestId("timeout"));

		Util.wait(TEST_TIMEOUT);

		expect(getByTestId("flag")).not.toHaveTextContent("1");
	});

	interface IAbstractPureComponentWithRAFTimeoutProps {}
	interface IAbstractPureComponentWithRAFTimeoutState {
		flag: number;
	}

	class AbstractPureComponentWithRAFTimeout extends Component.AbstractPureComponent<
		IAbstractPureComponentWithRAFTimeoutProps,
		IAbstractPureComponentWithRAFTimeoutState
	> {
		constructor(props: IAbstractPureComponentWithRAFTimeoutProps) {
			super(props);

			this.timeout = this.timeout.bind(this);
		}

		public state: IAbstractPureComponentWithRAFTimeoutState = { flag: 0 };

		public timeout = this.setRequestTimeout(
			() =>
				this.setState({
					flag: 1,
				}),
			TEST_TIMEOUT,
		);

		public render(): JSX.Element {
			const { flag } = this.state;
			return (
				<React.Fragment>
					<span data-testid="flag">{flag}</span>
					<button
						aria-label="timeout"
						data-testid="timeout"
						onClick={this.timeout}
						onKeyDown={this.timeout}
						type="button"
					/>
				</React.Fragment>
			);
		}
	}

	it("creates raf() timeout", async () => {
		const { getByTestId } = Testing.render(<AbstractPureComponentWithRAFTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		await Testing.waitFor(() => {
			expect(getByTestId("flag")).toHaveTextContent("1");
		});
	});

	it("active raf() timeout can be cancelled", async () => {
		const { getByTestId } = Testing.render(<AbstractPureComponentWithRAFTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		Testing.fireEvent.click(getByTestId("timeout"));

		Util.wait(TEST_TIMEOUT);

		expect(getByTestId("flag")).not.toHaveTextContent("1");
	});
});
