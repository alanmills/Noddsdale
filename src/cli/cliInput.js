const routeCommands = require('./cliRouteCommands.js'),
    cliOutput = require('./cliOutput'),
    help = require('../commands/help');

let resourceManager = require('../resourceManager');

let setResourceManager = (manager) => {
    if (manager === undefined) {
        resourceManager = require('../resourceManager');
    } else {
        resourceManager = manager;
    }
};


let registerCommands = () => {
    routeCommands.registerCommand(help.registerCommand(resourceManager, cliOutput), help.process);
};

let process = (params) => {
    registerCommands();

    let processCommand = processParams(params);
    if (routeCommands.isRegisteredCommand(processCommand.command)) {
        routeCommands.executeCommand(processCommand.command, processCommand.options);
    } else {
        routeCommands.executeCommand('help', processCommand.command);
    }
};

let processParams = (params) => {
    let paramsResult;
    switch (typeof params) {
        case 'undefined':
            paramsResult = processUndefinedParams();
            break;
        case 'string':
            paramsResult = processStringParams(params);
            break;
        default:
            paramsResult = processArrayParams(params);
            break;
    }
    return paramsResult;
};

let processUndefinedParams = () => {
    return {
        command: 'help',
        options: 'usage'
    };
}

let processStringParams = (params) => {
    return {
        command: params,
        options: undefined
    };
};

let processArrayParams = (params) => {
    return {
        command: params[0],
        options: params.shift()
    };
};

module.exports = {
    setResourceManager: setResourceManager,
    process: process
};