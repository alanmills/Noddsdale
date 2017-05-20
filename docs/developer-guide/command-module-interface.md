# Command Module Interface
``` javascript
module.exports = {
    registerCommand
    process
};
```

# registerCommand
When a Command Module is registered, it's `registerModule(resourceManager, userOutput)` function is called and the `registerModule()` function returns it's command name.  Therefore for the Help Command Module `registerModule()` returns `'help`.

# Process
When a command is called it's `process(parameters)` function is called and the `process()` function either `true` or `false` if it successful or unsuccessfully completes its process. 