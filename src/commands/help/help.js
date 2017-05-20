let command = 'help',
    resources,
    output;

let registerCommand = (resourceManager, userOutput) => {
    resources = resourceManager;
    output = userOutput;
    return command;
};

let process = (parameters) => {
    try {
        output.write(resources.getString(command, parameters));
        return true;
    } catch (err) {
        output.write(unknownCommandErrorMessage(parameters));
        return false;
    }
};

let unknownCommandErrorMessage = (parameters) => {
    let errorMessage = resources.getString('help', 'errorUnknownCommand');
    return errorMessage.replace(/$(command)/i, parameters);
};

module.exports = {
    registerCommand: registerCommand,
    process: process
};