let resources = {
    "help": {
        "usage": "Usage: noddsdale <command>",
        "errorUnknownCommand": "Unknown command: $(command)",
        "init": "Usage: noddsdale init/n noddsdale-int purpose is to prepere the current directory for a new noddsdale blog"
    }
};

let setSource = (source) => {
    resources = source;
};

let getString = (module, resource) => {
    let resourceName;
    if (resources !== undefined) {
        if (resources[module] !== undefined) {
            // eslint-disable-next-line prefer-reflect
            if (Object.getPrototypeOf(resource) === Array.prototype) {
                resourceName = resource[0];
            } else {
                resourceName = resource;
            }
            return resources[module][resourceName];
        }
    }
    return undefined;
};

module.exports = {
    setSource: setSource,
    getString: getString
};