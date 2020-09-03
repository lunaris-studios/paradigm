import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";

import * as Util from "$abstract/util";

/**
 * An abstract component that Paradigm components can extend
 * in order to add some common functionality like runtime props validation.
 */
export abstract class AbstractComponent<
	TProps,
	TState = Record<string, unknown>,
	TSnapshot = Record<string, unknown>
> extends React.Component<TProps, TState, TSnapshot> {
	// this should be static, not an instance method
	public getDerivedStateFromProps: never;

	// Not bothering to remove entries when their timeouts finish because clearing invalid ID is a no-op
	private timeoutIds: number[] = [];

	private requestTimeoutIds: number[] = [];

	constructor(props: TProps) {
		super(props);
		if (!Util.isNodeEnv(Protocol.Stage.PRODUCTION) && this.validateProps) {
			this.validateProps(this.props);
		}
	}

	public componentDidUpdate(
		_prevProps: TProps,
		_prevState: TState,
		_snapshot?: TSnapshot,
	): void {
		if (!Util.isNodeEnv(Protocol.Stage.PRODUCTION) && this.validateProps) {
			this.validateProps(this.props);
		}
	}

	public componentWillUnmount(): void {
		this.clearTimeouts();
		this.clearRequestTimeouts();
	}

	//

	/**
	 * Set a timeout and remember its ID.
	 * All stored timeouts will be cleared when component unmounts.
	 * @returns a "cancel" function that will clear timeout when invoked.
	 */
	public setTimeout(callback: () => void, timeout = 0): Util.RequestFn {
		const handle = window.setTimeout(callback, timeout);
		this.timeoutIds.push(handle);
		return (): void => window.clearTimeout(handle);
	}

	/**
	 * Clear all known timeouts.
	 */
	public clearTimeouts(): void {
		if (this.timeoutIds.length > 0) {
			this.requestTimeoutIds.forEach((id) => {
				Util.clearRequestTimeout(id);
			});
			this.timeoutIds = [];
		}
	}

	/**
	 * Set a timeout driven by raf() and remember
	 * its ID. All stored timeouts will be cleared when component unmounts.
	 */
	public setRequestTimeout(callback: Util.RequestFn, timeout = 0): Util.RequestFn {
		const handle = Util.requestTimeout(callback, timeout);
		this.requestTimeoutIds.push(handle.id);
		return (): void => Util.clearRequestTimeout(handle.id);
	}

	/**
	 * Clear all known raf() timeouts.
	 */
	public clearRequestTimeouts(): void {
		if (this.requestTimeoutIds.length > 0) {
			this.requestTimeoutIds.forEach((id) => {
				Util.clearRequestTimeout(id);
			});
			this.requestTimeoutIds = [];
		}
	}

	/**
	 * Ensures that the props specified for a component are valid.
	 * Implementations should check that props are valid and usually throw an Error if they are not.
	 * Implementations should not duplicate checks that the type system already guarantees.
	 *
	 * This method should be used instead of React's
	 * [propTypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) feature.
	 * Like propTypes, these runtime checks run only in development mode.
	 */
	protected validateProps?(_props: TProps): void;
}




















