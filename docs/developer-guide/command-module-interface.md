# Command Module Interface
``` javascript
module.exports = {
    registerCommand
    execute
};
```

# registerCommand
When a Command Module is registered, it's `registerModule(resourceManager, userOutput, filesystem)` function is called and the `registerModule()` function returns it's command name.  Therefore for the Help Command Module `registerModule()` returns `'help`.

# Execute
When a command is called it's `execute(parameters)` function is called and the `execute()` function either `true` or `false` if it successful or unsuccessfully completes its process. 