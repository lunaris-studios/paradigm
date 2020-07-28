import * as GB from "gatsby";
import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import * as Sensors from "@paradigmjs/sensors";
import * as Universal from "@paradigmjs/universal";

import Layout from "../../../components/layout";
import Image from "../../../components/image";
import SEO from "../../../components/seo";

export const HomePage = () => (
	<Layout>
		<SEO title="Home" />
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
			<Image />
		</div>
		{/* <GB.Link to="/page-2/">Go to page 2</GB.Link> <br /> */}
		{/* <GB.Link to="/using-typescript/">Go to "Using TypeScript"</GB.Link> */}
		<TestComponent bar="foo"  />
	</Layout>
);

//

interface ITestComponentProps extends SensorProps, ReduxProps {
	bar: string;
}

type ReduxProps = ReactRedux.ConnectedProps<typeof redux>;
type SensorProps = Universal.ComposedProps<typeof sensors>;

function mapState(state: { todos: string[] }) {
	const { todos } = state;
	return { todoList: todos };
}

function mapDispatch(dispatch: Redux.Dispatch) {
	return {
		increment: () => dispatch({ type: "INCREMENT" }),
	};
}

const redux = ReactRedux.connect(mapState, mapDispatch);

const sensors = Universal.compose(
	Sensors.withMouseSensor,
	Sensors.withWindowSizeSensor
);

class TestComponentImpl extends React.PureComponent<ITestComponentProps> {
	public static readonly displayName = "TestComponent";

	constructor(props: ITestComponentProps) {
		super(props);
	}

	public render() {
		const { mouse, windowSize } = this.props.sensors;

		return (
			<div
				ref={mouse.refHandlers?.target}
				style={{ height: "100px", width: "100px", background: "red" }}
			>
				{mouse.docX}
				<br />
				{mouse.docY}
				<br />
				{mouse.elX}
				<br />
				{mouse.elY}
				<br />
				{location.pathname}
				<br />
				{windowSize.height}
				<br />
				{windowSize.width}
			</div>
		);
	}
}

const TestComponent = redux(sensors(TestComponentImpl));
