const cli = require('./cli');

let command = process.argv[2],
    parameters = process.argv.slice(3);

cli.execute(command, parameters);