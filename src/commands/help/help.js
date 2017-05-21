let command = 'help',
    resources,
    output;

let registerCommand = (resourceManager, userOutput) => {
    resources = resourceManager;
    output = userOutput;
    return command;
};

let execute = (parameters) => {
    try {
        if (parameters === undefined) {
            output.write(resources.getString(command, 'usage'));
        } else {
            output.write(resources.getString(command, parameters));
        }
        return true;
    } catch (err) {
        output.write(resources.getString('help', 'errorUnknownCommand', /\$\(command\)/i, parameters));
        return false;
    }
};

module.exports = {
    registerCommand: registerCommand,
    execute: execute
};