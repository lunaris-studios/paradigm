import * as React from "react";
import * as Testing from "@testing-library/react";

import * as Util from "$abstract/util";

import * as Component from "./abstract-component";

const TEST_TIMEOUT = 10;

describe("AbstractComponent", () => {
	interface IAbstractComponentWithTimeoutProps {}

	class AbstractComponent extends Component.AbstractComponent<
		IAbstractComponentWithTimeoutProps
	> {
		public render(): JSX.Element {
			return <div />;
		}
	}

	it("renders correctly", () => {
		const { baseElement } = Testing.render(<AbstractComponent />);
		expect(baseElement).toMatchSnapshot();
	});

	interface IAbstractComponentWithTimeoutProps {}
	interface IAbstractComponentWithTimeoutState {
		flag: number;
	}

	class AbstractComponentWithTimeout extends Component.AbstractComponent<
		IAbstractComponentWithTimeoutProps,
		IAbstractComponentWithTimeoutState
	> {
		public state: IAbstractComponentWithTimeoutState = { flag: 0 };

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
		const { getByTestId } = Testing.render(<AbstractComponentWithTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		await Testing.waitFor((): void => {
			expect(getByTestId("flag")).toHaveTextContent("1");
		});
	});

	it("active timeout can be cancelled", async () => {
		const { getByTestId } = Testing.render(<AbstractComponentWithRAFTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		Testing.fireEvent.click(getByTestId("timeout"));

		Util.wait(TEST_TIMEOUT);

		expect(getByTestId("flag")).not.toHaveTextContent("1");
	});

	interface IAbstractComponentWithRAFTimeoutProps {}
	interface IAbstractComponentWithRAFTimeoutState {
		flag: number;
	}

	class AbstractComponentWithRAFTimeout extends Component.AbstractComponent<
		IAbstractComponentWithRAFTimeoutProps,
		IAbstractComponentWithRAFTimeoutState
	> {
		constructor(props: IAbstractComponentWithRAFTimeoutProps) {
			super(props);

			this.timeout = this.timeout.bind(this);
		}

		public state: IAbstractComponentWithRAFTimeoutState = { flag: 0 };

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
		const { getByTestId } = Testing.render(<AbstractComponentWithRAFTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		await Testing.waitFor(() => {
			expect(getByTestId("flag")).toHaveTextContent("1");
		});
	});

	it("active raf() timeout can be cancelled", async () => {
		const { getByTestId } = Testing.render(<AbstractComponentWithRAFTimeout />);

		expect(getByTestId("flag")).toHaveTextContent("0");

		Testing.fireEvent.click(getByTestId("timeout"));

		Util.wait(TEST_TIMEOUT);

		expect(getByTestId("flag")).not.toHaveTextContent("1");
	});
});
