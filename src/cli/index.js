const cliInput = require('./cliInput.js'),
    cliRouteCommands = require('./cliRouteCommands.js'),
    cliOutput = require('./cliOutput');

module.exports = {
    setResourceManager: cliInput.setResourceManager,
    outputPipe: cliOutput.outputPipe,
    registerCommand: cliRouteCommands.registerCommand,
    process: cliInput.process
};