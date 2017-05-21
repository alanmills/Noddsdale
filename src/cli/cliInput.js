const routeCommands = require('./cliRouteCommands.js'),
    cliOutput = require('./cliOutput'),
    help = require('../commands/help'),
    init = require('../commands/init');

let resourceManager = require('../resourceManager'),
    fs = require('fs');

let setResourceManager = (manager) => {
    if (manager === undefined) {
        resourceManager = require('../resourceManager');
    } else {
        resourceManager = manager;
    }
};


let registerCommands = () => {
    routeCommands.registerCommand(help.registerCommand(resourceManager, cliOutput), help.execute);
    routeCommands.registerCommand(init.registerCommand(resourceManager, cliOutput, fs), init.execute);
};

let execute = (params) => {
    registerCommands();

    let executeCommand = executeParams(params);
    if (routeCommands.isRegisteredCommand(executeCommand.command)) {
        routeCommands.executeCommand(executeCommand.command, executeCommand.options);
    } else {
        routeCommands.executeCommand('help', executeCommand.command);
    }
};

let executeParams = (params) => {
    let paramsResult;
    switch (typeof params) {
        case 'undefined':
            paramsResult = executeUndefinedParams();
            break;
        case 'string':
            paramsResult = executeStringParams(params);
            break;
        default:
            paramsResult = executeArrayParams(params);
            break;
    }
    return paramsResult;
};

let executeUndefinedParams = () => {
    return {
        command: 'help',
        options: 'usage'
    };
}

let executeStringParams = (params) => {
    return {
        command: params,
        options: undefined
    };
};

let executeArrayParams = (params) => {
    return {
        command: params[0],
        options: params.shift()
    };
};

module.exports = {
    setResourceManager: setResourceManager,
    execute: execute
};