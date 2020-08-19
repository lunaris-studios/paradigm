# [Paradigm](http://Paradigm.lunaris.io/) 9-Slice Component

Paradigm is a React UI toolkit for the web.

This package provides a React component to generate completely dynamic [9-slice](http://rwillustrator.blogspot.com/2007/04/understanding-9-slice-scaling.html) surfaces.

## Installation

```
npm install --save @paradigmjs/nine
```

## Example

```js
import * as React from "react";
import { default as Nine } from "@paradigmjs/nine";

class MyComponent extends React.Component {
	render() {
		return (
			<Nine width={256} height={256} corner={85} image="/images/myImage.png">
				HELLO WORLD!
			</NineSlicNinee>
		);
	}
}
```

### [9-Slice Documentation](http://Paradigm.lunaris.io/docs/#table) | [Full Documentation](http://Paradigm.lunaris.io/docs) | [Source Code](https://github.com/lunaris-studios/Paradigm)
