const noddsdale = require('../src/cli'),
    memoryStream = require('memory-streams'),
    assert = require('assert'),
    resources = require('../src/resourceManager/resourceMessages.js');

describe('Noddsdale:', () => {
    let output;

    beforeEach(() => {
        output = new memoryStream.WritableStream();
        noddsdale.outputPipe(output);
    });

    afterEach(() => {
        output.end();
        noddsdale.outputPipe(undefined);
    });

    it('Should return usage information when called with no parameters', () => {
        noddsdale.process();
        assert.equal(output.toString(), resources.help.usage);
    });

    it('Should return unknown command information when called with an invalid command', () => {
        let commandName = 'unknowncommand',
            errorMessage = resources.help.errorUnknownCommand,
            expectedResult = errorMessage.replace(/\$\(command\)/i, commandName);

        noddsdale.process(commandName);

        assert.equal(output.toString(), expectedResult);
    });
});