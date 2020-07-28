<h1 align="center" style="border-bottom: none;">🟦 Paradigm</h1>
<h3 align="center">Paradigm is a React-based UI toolkit for the web.</h3>
<p align="center">
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>


***Paradigm*** is optimized for building complex, data-dense web interfaces for _desktop applications_ which run in modern browsers and IE11. This is not a mobile-first UI toolkit.

[**View the full documentation ▸**](http://Paradigm.lunaris.io/docs)

[**Try it out on CodeSandbox ▸**](https://codesandbox.io/s/blueprint-sandbox-et9xy)

[**Read frequently asked questions (FAQ) on the wiki ▸**](https://github.com/lunaris-studios/Paradigm/wiki/Frequently-Asked-Questions)

## Changelog

Paradigm's change log and migration guides for major verions live on the repo's [Github wiki](https://github.com/lunaris-studios/Paradigm/wiki/1.x-Changelog).

## Packages

This repository contains multiple projects in the `packages/` directory that fall into 3 categories:

### Libraries

These are the component libraries we publish to NPM.

-   [![npm](https://img.shields.io/npm/v/@paradigmjs/paradigm.svg?label=@paradigmjs/paradigm)](https://www.npmjs.com/package/@paradigmjs/paradigm) - Core styles & components.
-   [![npm](https://img.shields.io/npm/v/@paradigmjs/icons.svg?label=@paradigmjs/icons)](https://www.npmjs.com/package/@paradigmjs/icons) - Components for generating and displaying icons.
-   [![npm](https://img.shields.io/npm/v/@paradigmjs/nine.svg?label=@paradigmjs/nine)](https://www.npmjs.com/package/@paradigmjs/nine) - Components to create dynamic [9-slice](https://en.wikipedia.org/wiki/9-slice_scaling) surfaces.
-   [![npm](https://img.shields.io/npm/v/@paradigmjs/protocol.svg?label=@paradigmjs/protocol)](https://www.npmjs.com/package/@paradigmjs/protocol) - Theme-aware responsive style props for building design systems.

### Applications

These are hosted on GitHub Pages as static web applications:

- `docs` - Documentation site at Paradigm.lunaris.io

### Build tooling

These packages define development dependencies and contain build configuration. They adhere to the standard NPM package layout, which allows us to keep clear API boundaries for build configuration and isolate groups of `devDependencies`. They are published to NPM in order to allow other related projects to use this infrastructure outside this monorepo.

-   [![npm](https://img.shields.io/npm/v/@paradigmjs/scripts.svg?label=@paradigmjs/scripts)](https://www.npmjs.com/package/@paradigmjs/scripts) - various utility scripts for linting, working with CSS variables, and building icons

## Contributing

Looking for places to contribute to the codebase?
First read the [contribution guidelines](https://github.com/lunaris-studios/Paradigm/blob/develop/CONTRIBUTING.md),
then [check out the "help wanted" label](https://github.com/lunaris-studios/Paradigm/labels/help%20wanted).

## Development

[Lerna](https://lerna.js.org/) manages inter-package dependencies in this monorepo.
Builds are orchestrated via `lerna run` and NPM scripts.

**Prerequisites**: Node.js v10+, NPM v6.13.4+

### One-time setup

After cloning this repo, run:

1. `npm i` to install all dependencies.
2. If running on Windows:
    1. `npm install -g windows-build-tools` to install build tools globally
    2. Ensure `bash` is your configured script-shell by running:<br />
       `npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"`

### Incorporating upstream changes

If you were previously in a working state and have just pulled new code from `develop`:

-   If there were package dependency changes, run `npm i` at the root.
    -   This command is very quick if there are no new things to install.
-   Run `npm run compile` to get the latest built versions of the library packages in this repo.
    -   This command is quicker than `npm cache verify` since it doesn't build the application packages (`docs-app`, `landing-app`, etc.) or run tests

### Developing libraries

Run `npm run dev` from the root directory to watch changes across all packages and run the docs application with `rollup` dev server.

Alternately, each library has its own dev script to run the docs app and watch changes to just that package (and its dependencies): `npm run dev:core`, `npm run dev:nine`, etc.

### Updating documentation

Much of Paradigm's documentation lives inside source code as JSDoc comments in `.tsx` files. This documentation is extracted and converted automatically during the build of `packages/docs`.

If you are updating documentation sources you'll need to run `npm run compile` from `packages/docs` to see changes reflected in the application.

### Updating icons

The [One-time setup](#one-time-setup) and [Incorporating upstream changes](#incorporating-upstream-changes) steps should produce the generated source code in this repo used to build the icons documentation. This is sufficient for most development workflows.

If you are updating icons or adding new ones, you'll need to run `npm compile` in `packages/icons` to see those changes reflected before
running any of the dev scripts.

## License

This project is made available under the Apache 2.0 License.
