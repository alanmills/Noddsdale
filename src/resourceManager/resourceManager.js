let resources = require('./resourceMessages.js');

let setSource = (source) => {
    if (source === undefined) {
        resources = require('./resourceMessages.js');
    } else {
        resources = source;
    }
};

let getString = (commandModule, resource) => {
    let commandModuleResources = getResourceNode(resources, commandModule),
        resourceName = getResourceName(resource),
        commandModuleResource = getResourceNode(commandModuleResources, resourceName);

    return commandModuleResource;
};

let getResourceName = (resource) => {
    // eslint-disable-next-line prefer-reflect
    if (Object.getPrototypeOf(resource) === Array.prototype) {
        return resource[0];
    } else {
        return resource;
    }
};

let getResourceNode = (resource, nodeName) => {
    if (resource !== undefined && nodeName !== undefined) {
        return resource[nodeName];
    } else {
        return undefined;
    }
};

module.exports = {
    setSource: setSource,
    getString: getString
};