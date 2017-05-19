const assert = require('assert'),
    sinon = require('sinon'),
    memoryStream = require('memory-streams');


describe('CLI', () => {
    describe('CLI Input', () => {
        const cli = require('../cli'),
            usageMessage = 'Usage: noddsdale <command>';

        let writer;

        beforeEach(() => {
            writer = new memoryStream.WritableStream();
            cli.outputPipe(writer);
        });

        afterEach(() => {
            cli.outputPipe(undefined);
        });

        it('should return CLI usage information when no commands provided', () => {
            cli.process();
            assert.equal(writer.toString(), usageMessage);
        });

        it('should return CLI usage information when invalid commands are provided', () => {
            cli.process('invalidCommandName');
            assert.equal(writer.toString(), usageMessage);
        });
    });

    describe('CLI Output', () => {
        const cliOutput = require('../cli/cliOutput.js');
        let consoleMock;

        beforeEach(() => {
            consoleMock = sinon.mock(console);
        });

        afterEach(() => {
            consoleMock.restore();
        });

        it('CLI should call stdout when no output pipe is provided', () => {
            consoleMock.expects('log').once();

            cliOutput.outputPipe(undefined);
            cliOutput.write('testMessage');

            assert(consoleMock.verify());
        });

        it('CLI should call provided pipe when write is called', () => {
            let testMessage = 'test message',
                outputPipeObject = { write: function() {} },
                spy = sinon.spy(outputPipeObject, 'write');

            cliOutput.outputPipe(outputPipeObject);
            cliOutput.write(testMessage);

            assert(spy.called);
            assert(spy.withArgs(testMessage).calledOnce);
        });
    });

    describe('CLI Routing', () => {
        const cliRouteCommands = require('../cli/cliRouteCommands.js'),
            commandName = 'test';

        beforeEach(() => {
            cliRouteCommands.unRegisterCommand(undefined);
            cliRouteCommands.unRegisterCommand(commandName);
        });

        it('Should register an unregisterd undefined command', () => {
            cliRouteCommands.registerCommand(undefined, () => {});
            assert(cliRouteCommands.isRegisteredCommand(undefined));
        });

        it('Should register an unregisterd named command', () => {
            cliRouteCommands.registerCommand(commandName, () => {});
            assert(cliRouteCommands.isRegisteredCommand(commandName));
        });

        it('Should unregistered an undefined commands', () => {
            cliRouteCommands.registerCommand(undefined, () => {});
            assert(cliRouteCommands.unRegisterCommand(undefined));
        });


        it('Should unregistered a named commands', () => {
            cliRouteCommands.registerCommand(commandName, () => {});
            assert(cliRouteCommands.unRegisterCommand(commandName));
        });

        it('Should unregistered the correct command when there are multiple commands', () => {
            cliRouteCommands.registerCommand(undefined, () => {});
            cliRouteCommands.registerCommand(commandName, () => {});

            assert(cliRouteCommands.isRegisteredCommand(undefined));
            assert(cliRouteCommands.isRegisteredCommand(commandName));

            assert(cliRouteCommands.unRegisterCommand(commandName));

            assert(cliRouteCommands.isRegisteredCommand(undefined));
            assert.equal(cliRouteCommands.isRegisteredCommand(commandName), false);
        });

        it('Should return false if unregistered undefined command is not registered', () => {
            assert.equal(cliRouteCommands.unRegisterCommand(undefined), false);
        });

        it('Should return false if unregistered named command is not registered', () => {
            assert.equal(cliRouteCommands.unRegisterCommand(commandName), false);
        });

        it('Call an unregisterd registerd command', () => {
            let callback = sinon.spy();
            cliRouteCommands.registerCommand(undefined, callback);

            cliRouteCommands.executeCommand(undefined);

            assert(callback.calledOnce);
        });

        it('Call a named registerd command', () => {
            let callback = sinon.spy();
            cliRouteCommands.registerCommand(commandName, callback);

            cliRouteCommands.executeCommand(commandName);

            assert(callback.calledOnce);
        });

        it('Should not call the correct command when there are multiple commands', () => {
            let undefinedCallback = sinon.spy(),
                commandNameCallback = sinon.spy();

            cliRouteCommands.registerCommand(undefined, undefinedCallback);
            cliRouteCommands.registerCommand(commandName, commandNameCallback);

            cliRouteCommands.executeCommand(commandName);

            assert(commandNameCallback.calledOnce);
            assert.equal(undefinedCallback.called, false);
        });

        it('Should not call a command from an unregistered command', () => {
            let undefinedCallback = sinon.spy(),
                commandNameCallback = sinon.spy();

            cliRouteCommands.registerCommand(undefined, undefinedCallback);
            cliRouteCommands.registerCommand(commandName, commandNameCallback);
            cliRouteCommands.unRegisterCommand(undefined);

            cliRouteCommands.executeCommand(commandName);

            assert(commandNameCallback.calledOnce);
            assert.equal(undefinedCallback.called, false);
        });

        it('Should not call a command with an invalid command', () => {
            let undefinedCallback = sinon.spy(),
                commandNameCallback = sinon.spy();

            cliRouteCommands.registerCommand(undefined, undefinedCallback);
            cliRouteCommands.registerCommand(commandName, commandNameCallback);

            cliRouteCommands.executeCommand('invalidCommandName');

            assert.equal(commandNameCallback.called, false);
            assert.equal(undefinedCallback.called, false);

        });
    });
});