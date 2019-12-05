# View GitHub Repository

[![dependencies Status](https://david-dm.org/tjx666/view-github-repository/status.svg?style=flat-square)](https://david-dm.org/tjx666/view-github-repository) [![devDependencies Status](https://david-dm.org/tjx666/view-github-repository/dev-status.svg?style=flat-square)](https://david-dm.org/tjx666/view-github-repository?type=dev)
Open npm package GitHub repository straight from VSCode.

## Features

This extension provides two command:

1. `view github repository (active editor)`
2. `view github repository (package.json)`

## Usage

1. navigate to the file where you import/require the package.
2. Use shortcut `ctrl + shift + p` or `cmd + shift + p` on macOS to show command panel, input one of command above.

![view github repository of active editor](https://github.com/tjx666/view-github-repository/blob/master/images/activeEditor.gif?raw=true)

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

If current active editor file is package.json, the extension will list all the dependencies and devDependencies modules.

### view github repository (package.json)

This command will load all the module names from package.json exists in workspace root path.
