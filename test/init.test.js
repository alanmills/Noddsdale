const init = require('../src/commands/init'),
    resourceManager = require('../src/resourceManager'),
    memoryStream = require('memory-streams'),
    fs = require('fs'),
    assert = require('assert'),
    sinon = require('sinon');

const resource = {
    "init": {
        "start": "init is executeing",
        "finish": "init has finished",
        "error_existing_files": "Working directory contains files"
    },
    "help": {
        "error": "there is an $(err)",
        "init": "help from init"
    }
};

describe('Initalise:', () => {
    let output;

    beforeEach(() => {
        resourceManager.setSource(resource);
        output = new memoryStream.WritableStream();
    });

    afterEach(() => {
        init.registerCommand(undefined, undefined, undefined);
        output.end();
        resourceManager.setSource(undefined);
    });

    it('Should create the configuration file');

    it('Should create the base layout template');

    it('Should create the posts layout template');

    it('Should create the Welcome to Noddsdale template');

    it('Should create the default favicon');

    it('Should create the posts folder');

    it('Should output status information to the user when successfully initialising the blog directory', () => {
        let expectedOutput = resource.init.start + resource.init.finish,
            stubFs = {
                readdir: (path, callback) => {
                    callback(undefined, []);
                }
            };
        init.registerCommand(resourceManager, output, stubFs);

        init.execute();

        assert.equal(output.toString(), expectedOutput);
    });

    it('Should output error information to the user if unable to initialising the blog directory', () => {
        let errorMessage = 'Error: ' + resource.init.error_existing_files,
            errorRegEx = /\$\(err\)/i,
            expectedOutput = resource.init.start + resource.help.error.replace(errorRegEx, errorMessage),
            stubFs = {
                readdir: (path, callback) => {
                    callback(undefined, ['afile.txt']);
                }
            };
        init.registerCommand(resourceManager, output, stubFs);

        init.execute();

        assert.equal(output.toString(), expectedOutput);
    });

    it('Should output error information to the user if blog directory is invalid', () => {
        let directoryInvalidErrorMessage = 'invalid directory',
            errorMessage = 'Error: ' + directoryInvalidErrorMessage,
            errorRegEx = /\$\(err\)/i,
            expectedOutput = resource.init.start + resource.help.error.replace(errorRegEx, errorMessage),
            stubFs = {
                readdir: (path, callback) => {
                    callback(new Error(directoryInvalidErrorMessage), []);
                }
            };
        init.registerCommand(resourceManager, output, stubFs);

        init.execute();

        assert.equal(output.toString(), expectedOutput);
    });
});