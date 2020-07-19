<div align="center">

# View GitHub Repository

Open npm package GitHub repository straight from VSCode.

[![Version](https://vsmarketplacebadge.apphb.com/version-short/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Installs](https://vsmarketplacebadge.apphb.com/installs-short/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Rating Star](https://vsmarketplacebadge.apphb.com/rating-star/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Trending Monthly](https://vsmarketplacebadge.apphb.com/trending-monthly/yutengjing.view-github-repository.svg)](https://marketplace.visualstudio.com/items?itemName=yutengjing.view-github-repository) [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/view-github-repository.svg)](http://isitmaintained.com/project/tjx666/view-github-repository')

[![Build Status](https://travis-ci.org/tjx666/view-github-repository.svg?branch=master)](https://travis-ci.org/tjx666/view-github-repository) [![dependencies Status](https://david-dm.org/tjx666/view-github-repository/status.svg)](https://david-dm.org/tjx666/view-github-repository) [![devDependencies Status](https://david-dm.org/tjx666/view-github-repository/dev-status.svg)](https://david-dm.org/tjx666/view-github-repository?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/view-github-repository/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/view-github-repository?targetFile=package.json)

</div>

## Features

This extension provides two commands:

1. `view github repository`
2. `view github repository (package.json)`

## Usage

1. navigate to the file where you import/require the npm packages. Support the following three forms of import statement:

   ```javascript
   const path = require('path');
   import webpack from 'webpack';
   export * from 'lodash';
   ```

2. use the shortcut <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>p</kbd>(Windows) or <kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>p</kbd>(macOS) to expand command panel, select one of commands you need listed above.

![view github repository of active editor](https://github.com/tjx666/view-github-repository/blob/master/images/usage.gif?raw=true)

## Details

### view github repository

With this command, you can open the github repository of npm packages which imported/required in current active editor.

Support languages:

- javascript(.js)
- javascriptreact(.jsx)
- vue(.vue)
- typescript(.ts)
- typescriptreact(.tsx)

If you select a node builtIn module, the extension will open the nodejs official document of selected module.

If current active editor's fileName is just `package.json`, this extension will list all the dependencies and devDependencies modules.

### view github repository (package.json)

This command will load all the module names from package.json exists in workspace root path.

### TODO

- [ ] import statement is multiple lines
- [ ] module alias

## 🧡 Backers

Thanks to `JiangShiqi` for designing the extension's logo.
