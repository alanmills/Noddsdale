const routeCommands = require('./cliRouteCommands.js'),
    cliOutput = require('./cliOutput'),
    help = require('../commands/help');

let resourceManager = require('../resourceManager');

let setResourceManager = (manager) => {
    resourceManager = manager;
};


let registerCommands = () => {
    routeCommands.registerCommand(help.registerCommand(resourceManager, cliOutput), help.process);
};

let process = (params) => {
    registerCommands();

    let processCommand = processParams(params);
    routeCommands.executeCommand(processCommand.command, processCommand.options);
};

let processParams = () => {
    return {
        command: 'help',
        options: ['usage']
    };
};

module.exports = {
    setResourceManager: setResourceManager,
    process: process
};