const help = require('../src/commands/help'),
    resourceManager = require('../src/resourceManager'),
    memoryStream = require('memory-streams'),
    assert = require('assert'),
    sinon = require('sinon');

const resource = {
    "help": {
        "usage": "usage information from help",
        "errorUnknownCommand": "Unknown command: $(unknowncommand) error message"
    }
};

describe('Command: Help:', () => {
    let output;

    beforeEach(() => {
        resourceManager.setSource(resource);
        output = new memoryStream.WritableStream();
        help.registerCommand(resourceManager, output);
    });

    afterEach(() => {
        help.registerCommand(undefined, undefined);
        output.end();
        resourceManager.setSource(undefined);
    });

    it('Should return "help" when registering the command', () => {
        let commandName = help.registerCommand(undefined, undefined);
        assert.equal(commandName, 'help');
    });

    it('Should output "usage" message when called with "usage"', () => {
        let processSuccessfully = help.process('usage');
        assert.equal(processSuccessfully, true);
        assert.equal(output.toString(), resource.help.usage);
    });

    it('Should output unknown command error message when called with an unknown command name', () => {
        let processSuccessfully = help.process('unknowncommand');
        assert.equal(processSuccessfully, false);
        assert.equal(output.toString(), resource.help.errorUnknownCommand);
    });
});