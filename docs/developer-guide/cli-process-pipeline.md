# CLI process pipeline
## Process Start
```
|-- noddsdale.sh
|-- src
|   |-- index.js
|   |-- cli
|   |   |-- index.js
|   |   |-- cliInput.js
|   |   |-- cliRouteCommands.js
|   |
|   |-- resourceManager
|   |   |-- index.js
|   |   |-- resourceManager.js
|   |
|   |-- commands
|   |   |-- help
|   |   |   |-- index.js
|   |   |   |-- help.js
```

Running Noddsdale can be run from the Terminal or through Node
* Termainal: `./noddsdale.sh arguments`
* Node.js: `node src/index.js arguments`

When Noddsdale start it executes the `cli.process(arguments)` function.  The `cli.process()` function:
1. Registers the Command Modules and as part of registration they are provided
    1.1. `ResourceManager` - stores all of the text strings that will be output to the user
    1.2. `UserOutput` - where text will be output, by default this is `process.stdout`

**No arguments**
2. If no arguments are passed to Noddsdale then the `help.process('usage')` function is called.  This will output the basic usage information retrieved from the `ResourceManager` and given to the user through `UserOutput`.

**Provided argument**
3. If arguments are provided `cli.process()` will call the `argument.process()` function.  The outcome of running this command is determined by the purpose of that command module.

**Invalid argument**
4. If the provided arguments do not align with a registered command module, then `cli.process()` will call `help.process('usage')` as if no arguments had been provided.

** help argument**
5. If argument `help <command>` is provided then `cli.process()` will call `help.process('command')` and as when `usage` is provided the information is retrieved from `ResourceManager` and given to the user through `UserOutput`.