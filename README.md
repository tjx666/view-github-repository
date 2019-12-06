<div align="center">

# View GitHub Repository

Open npm package GitHub repository straight from VSCode.

[![Version](https://vsmarketplacebadge.apphb.com/version-short/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Installs](https://vsmarketplacebadge.apphb.com/installs-short/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Rating Star](https://vsmarketplacebadge.apphb.com/rating-star/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Trending Monthly](https://vsmarketplacebadge.apphb.com/trending-monthly/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/tjx666/view-github-repository.svg)](http://isitmaintained.com/project/tjx666/view-github-repository 'Average time to resolve an issue') [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/view-github-repository.svg)](http://isitmaintained.com/project/tjx666/view-github-repository 'Percentage of issues still open') [![dependencies Status](https://david-dm.org/tjx666/view-github-repository/status.svg)](https://david-dm.org/tjx666/view-github-repository) [![devDependencies Status](https://david-dm.org/tjx666/view-github-repository/dev-status.svg)](https://david-dm.org/tjx666/view-github-repository?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/view-github-repository/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/view-github-repository?targetFile=package.json)

</div>

## Features

This extension provides two commands:

1. `view github repository (active editor)`
2. `view github repository (package.json)`

## Usage

1. navigate to the file where you import/require the npm packages.
2. use the shortcut `ctrl + shift + p` or `cmd + shift + p` on macOS to expand command panel, input one of commands you need listed above.

![view github repository of active editor](https://github.com/tjx666/view-github-repository/blob/master/images/usage.gif?raw=true)

## Details

### view github repository (active editor)

With this command, you can open the github repository of npm packages which imported/required in current active editor.

Support languages:

- javascript
- javascriptreact
- vue
- typescript
- typescriptreact

If you select a node builtIn module, the extension will open the nodejs official document of selected module.

If current active editor fileName is `package.json`, the extension will list all the dependencies and devDependencies modules.

### view github repository (package.json)

This command will load all the module names from package.json exists in workspace root path.

## :handshake: Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Please feel free to make any PRs or submit an issue.
