let output = undefined;

let outputPipe = (destination) => {
    output = destination;
    return output;
};

let write = (message) => {
    if (output !== undefined) {
        return output.write(message);
    } else {
        console.log(message);
    }
};

module.exports = {
    outputPipe: outputPipe,
    write: write
};