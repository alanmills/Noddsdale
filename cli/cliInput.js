const routeCommands = require('./cliRouteCommands.js'),
    help = require('./cliHelp.js');

let registerCommands = () => {
    routeCommands.registerCommand(undefined, help.help);
};

let process = (params) => {
    let command = undefined;
    let options = [undefined];

    registerCommands();

    if (routeCommands.isRegisteredCommand(command)) {
        routeCommands.executeCommand(command, options);
    } else {
        routeCommands.executeCommand(undefined, options);
    }
};

module.exports = {
    process: process
};