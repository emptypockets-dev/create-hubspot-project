# create-hubspot-project

CLI to bootstrap new Hubspot projects.

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

- add `hubspot.config.yml` file to .gitignore so that it doesn't get shared
- add `css/styles.css` to your base layout
- import `module.css` in `module.js` files if you want PostCSS to process them

## License

MIT

## Collaborators

- Andrey Kondratyuk <andrey@fasterbetter.dev>
- Message me if you'd like to contribute

## Special Thanks

A big thank you to [@dkundel](https://github.com/dkundel) for the starter code!
