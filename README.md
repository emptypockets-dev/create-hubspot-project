# create-hubspot-project

CLI to bootstrap new Hubspot projects.

Tested and works on Mac. In testing on Windows.

Project setup includes:

- Hubspot CMS boilerplate
- Webpack
- PostCSS
- TailwindCSS
- CSSNano
- Babel
- Hubspot specific setup
- Git

## Installation & Usage

The CLI is available as an NPM package so you don't need to clone anything in this repo. Use `npx` instead of `npm` to use the latest version without having to install anything extra. You can see more details about the npm package here: [https://www.npmjs.com/package/create-hubspot-project](https://www.npmjs.com/package/create-hubspot-project)

```bash

# 1. first install the Hubspot CLI globally
npm install -g @hubspot/cli@latest

# 2. npx uses the latest version
npx create-hubspot-project
# or pass --install to automatically install all dependencies
npx create-hubspot-project --install

# 3. connect your local project with Hubspot
hs init

```

## Next steps

- update your HubSpot theme folder name in `webpack.config.js`
- add `css/styles.css` to your `templates/layouts/base.html` file
- Add `import "./module.css"` in `module.js` files if you want PostCSS to process them

## License

MIT

## Collaborators

- Andrey Kondratyuk <andrey@fasterbetter.dev>
- Message me if you'd like to contribute

## Special Thanks

A big thank you to [@dkundel](https://github.com/dkundel) for the starter code!
