const cliOutput = require('./cliOutput');

let commands = [];

let registerCommand = (name, fn) => {
    if (!isRegisteredCommand(name)) {
        commands.push({
            name: name,
            fn: fn
        });
    }
};

let unRegisterCommand = (name) => {
    if (isRegisteredCommand(name)) {
        commands = commands.filter((command) => {
            return command.name !== name;
        });
        return true;
    } else {
        return false;
    }
};

let isRegisteredCommand = (name) => {
    return commands.some((command) => {
        return command.name === name;
    });
};

let executeCommand = (name, options) => {
    let validCommands = commands.filter((command) => {
        return command.name === name;
    });



    validCommands.forEach((command) => {
        command.fn(cliOutput.write, options);
    });
};

module.exports = {
    registerCommand: registerCommand,
    unRegisterCommand: unRegisterCommand,
    isRegisteredCommand: isRegisteredCommand,
    executeCommand: executeCommand
};