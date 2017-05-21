const noddsdale = require('../src/cli'),
    memoryStream = require('memory-streams'),
    assert = require('assert'),
    resources = require('../src/resourceManager/resourceMessages.js');

describe('Noddsdale Integration Tests:', () => {
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
        noddsdale.execute();
        assert.equal(output.toString(), resources.help.usage);
    });

    it('Should return unknown command information when called with an invalid command', () => {
        let commandName = 'unknowncommand',
            errorMessage = resources.help.errorUnknownCommand,
            expectedResult = errorMessage.replace(/\$\(command\)/i, commandName);

        noddsdale.execute(commandName);

        assert.equal(output.toString(), expectedResult);
    });

    describe('Initaliise:', () => {
        it('Should successfully initalise a new blog directory');

        it.skip('Should not initalise a new blog as the working directory has existing files', () => {
            let commandName = 'init',
                expectedResult = resources.init.start + resources.init.error_existing_files,
                cwd = process.cwd(),
                testFolder = '.testrun'
            tmp = cwd + '/' + testFolder,
                fs = require('fs');
            fs.mkdirSync(testFolder);
            process.chdir(tmp);

            noddsdale.execute(commandName);

            assert.equal(output.toString(), expectedResult);

            process.chdir(cwd);
            fs.rmdirSync(testFolder);
        });
    });
});