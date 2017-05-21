# Creating a Command Module

1. Create a test for the module in the `test/` folder with the name `command.mycommand.test.js`
2. Create a folder under `src/` e.g. `src/commands/mycommand/`
3. Create an `index.js` and `mycommand.js` files
4. Add `mycommand` to by registered by the CLI `src/cli/cliInput.js`, function `registerCommands()`.

## mymodule.test.js
`command.mycommand.test.js` should follow the standard TDD Arrange Act Assert pattern.  Noddsale uses [Mocha](mochajs.org) as the test runner and [Sinon](sinonjs.org) for mocking.

``` javascript
const mycommand = require('../src/commands/mycommand'),
    resourceManager = require('../src/resourceManager'),
    memoryStream = require('memory-streams'),
    assert = require('assert'),
    sinon = require('sinon');

const resource = {
    "mycommand": {
        "start": "mycommand is processing",
        "finish": "mycommand has finished"
    },
    "help": {
        "error": "there is an error $(err)",
        "mycommand": "help from mycommand"
    }
};

describe('My Command:', () => {
    let output;

    beforeEach(() => {
        resourceManager.setSource(resource);
        output = new memoryStream.WritableStream();
        mycommand.registerCommand(resourceManager, output);
    });

    afterEach(() => {
        mycommand.registerCommand(undefined, undefined, undefined);
        output.end();
        resourceManager.setSource(undefined);
    });

    it('Should do something useful', ()=> {
        // Arrange
        // Act
        let processSuccessfully = mycommand.execute(/* any relevant arguments */);
        // Assert
        assert.equal(processSuccessfully, true/false); // Depending on if we are expecting the processing to succed or fail
    });
});
```

## index.js
`index.js` should not contain any logic, it should only contain the Module exported functions
``` javascript
const mycommand = require('./mymodule.js');

module.exports = {
    registerCommand: mycommand.registerCommand,
    execute: mycommand.execute
};
```

## mymodule.js
`mymodule.js` is where you should place your logic, in more complicated Modules you should divide the logic into the number of files you feel is appropriate.

``` javascript
let command = 'mycommand',
    resources,
    output;

let registerCommand = (resourceManager, userOutput) => {
    resources = resourceManager;
    output = userOutput;
    return command;
};

let execute = (parameters) => {
    output(resources.getString(command, 'start'));
    try {
        // Place your module logic here that you want to be executed when the users runs noddsdale mymodule
        output.write(resources.getString(command, 'finish'));
        return true;
    } catch (err) {
        output.write(resources.getString('help', 'error', err));
        return false;
    }
};

module.exports = {
    registerCommand: registerCommand,
    process: process
};
```

## Register the module in the CLI
1. Create a requires reference
2. Call the modules register method in the `registerCommands()` function

## Add User Output Strings to Resource Manager

## Add an integration test

## Run the command from the Terminal
`./noddsdale mycommand`