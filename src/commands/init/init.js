const process = require('process');

let command = 'init',
    resources,
    output,
    fs;

let registerCommand = (resourceManager, userOutput, fileSystem) => {
    resources = resourceManager;
    output = userOutput;
    fs = fileSystem;
    return command;
};

let execute = () => {
    output.write(resources.getString(command, 'start'));
    try {
        workingDirectoryIsEmpty();
        output.write(resources.getString(command, 'finish'));
        return true;
    } catch (err) {
        output.write(resources.getString('help', 'error', /\$\(err\)/i, err));
        return false;
    }
};

let workingDirectoryIsEmpty = () => {
    fs.readdir(process.cwd(), (err, files) => {
        if (err) { throw err; }
        if (files.length > 0) { throw new Error(resources.getString(command, 'error_existing_files')); }
    });
    return false;
};

module.exports = {
    registerCommand: registerCommand,
    execute: execute
};