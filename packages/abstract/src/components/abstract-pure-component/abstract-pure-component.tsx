import * as React from "react";
import * as Protocol from "@paradigmjs/protocol";
import * as Util from "@paradigmjs/util";
import * as _Util from "~/util";

export const add = _Util.add;

/**
 * An abstract component that Paradigm components can extend
 * in order to add some common functionality like runtime props validation.
 */
export abstract class AbstractPureComponent<
	P,
	S = {},
	SS = {}
> extends React.PureComponent<P, S, SS> {
	// unsafe lifecycle method
	public componentWillUpdate: never;
	public componentWillReceiveProps: never;
	public componentWillMount: never;
	// this should be static, not an instance method
	public getDerivedStateFromProps: never;

	/** Component displayName should be `public static`. This property exists to prevent incorrect usage. */
	protected displayName: never;

	// Not bothering to remove entries when their timeouts finish because clearing invalid ID is a no-op
	private timeoutIds: number[] = [];
	private requestTimeoutIds: number[] = [];

	constructor(props: P) {
		super(props);
		if (!Util.isNodeEnv(Protocol.Stage.PRODUCTION)) {
			this.validateProps(this.props);
		}
	}

	public componentDidUpdate = (_prevProps: P, _prevState: S, _snapshot?: SS) => {
		if (!Util.isNodeEnv(Protocol.Stage.PRODUCTION)) {
			this.validateProps(this.props);
		}
	}

	public componentWillUnmount = () => {
		this.clearTimeouts();
		this.clearRequestTimeouts();
	}

	//

	/**
	 * Set a timeout and remember its ID.
	 * All stored timeouts will be cleared when component unmounts.
	 * @returns a "cancel" function that will clear timeout when invoked.
	 */
	public setTimeout = (callback: () => void, timeout?: number) => {
		const handle = window.setTimeout(callback, timeout);
		this.timeoutIds.push(handle);
		return () => window.clearTimeout(handle);
	}

	/**
	 * Clear all known timeouts.
	 */
	public clearTimeouts = () => {
		if (this.timeoutIds.length > 0) {
			for (const timeoutId of this.timeoutIds) {
				window.clearTimeout(timeoutId);
			}
			this.timeoutIds = [];
		}
	};

	/**
	 * Set a timeout driven by raf() and remember
	 * its ID. All stored timeouts will be cleared when component unmounts.
	 */
	public setRequestTimeout = (callback: any, timeout: number = 0) => {
		const handle = Util.requestTimeout(callback, timeout);
		this.requestTimeoutIds.push(handle.id);
		return () => Util.clearRequestTimeout(handle.id);
	}

	/**
	 * Clear all known raf() timeouts.
	 */
	public clearRequestTimeouts = () => {
		if (this.requestTimeoutIds.length > 0) {
			for (const requestTimeoutId of this.requestTimeoutIds) {
				Util.clearRequestTimeout(requestTimeoutId);
			}
			this.requestTimeoutIds = [];
		}
	};

	/**
	 * Ensures that the props specified for a component are valid.
	 * Implementations should check that props are valid and usually throw an Error if they are not.
	 * Implementations should not duplicate checks that the type system already guarantees.
	 *
	 * This method should be used instead of React's
	 * [propTypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) feature.
	 * Like propTypes, these runtime checks run only in development mode.
	 */
	protected validateProps = (_props: P) => {
		// implement in subclass
	}
}
