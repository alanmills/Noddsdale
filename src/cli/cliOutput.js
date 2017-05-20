let output = undefined;

let outputPipe = (destination) => {
    output = destination;
    return output;
};

let write = (message) => {
    if (output !== undefined) {
        return output.write(message);
    } else {
        console.log(message); // eslint-disable-line no-console
    }
};

module.exports = {
    outputPipe: outputPipe,
    write: write
};