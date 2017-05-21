let resources = require('./resourceMessages.js');

let setSource = (source) => {
    if (source === undefined) {
        resources = require('./resourceMessages.js');
    } else {
        resources = source;
    }
};

let getString = (commandModule, resource, ...format) => {
    let commandModuleResources = getResourceNode(resources, commandModule),
        resourceName = getResourceName(resource),
        commandModuleResource = getResourceNode(commandModuleResources, resourceName);

    return formatString(commandModuleResource, format);
};

let formatString = (commandModuleResource, ...format) => {
    let formattedString = commandModuleResource,
        formatters = format[0];

    if (formatters.length > 0) {
        for (let index = 0; index < formatters.length; index += 2) {
            let regex = formatters[index],
                substitution = formatters[index + 1];

            formattedString = formattedString.replace(regex, substitution);
        }
    }
    return formattedString;
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