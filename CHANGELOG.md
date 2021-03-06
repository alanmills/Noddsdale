# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] [0.0.4]
#### Added
- Added the init command which prepars the current folder for a new blog
- Added an integration test for Noddsdale `test/noddsdale.test.js`
- Resource Manager now has the ability to format string with substitutions powered with regular expresssion substitution

#### Changed
- Moved the Resource Manager user interface output strings into the seperate file `src/resourceManager/resourceMessages.js`
- CLI and Help Command Module to pass through parameters associated with the `help` command to allow outputting different messages depending on the CLI input.
- Change the Help unknown command text substitution to use the version provided by the Resource Manager.

## [0.0.3] - 2017-05-21
#### Added
- Added a Developer Guide with information on the CLI Pipeline, Command Module Interface Design and a guide on how to add a new Command Module
- Added a Resource Manager for managing user interface output strings.  Currently, the resources are within the code, in future, the resources will be moved into a configuration file and potentially updated to support localisation
- Added src/commands folder for the location of the Command Modules source code
- Added the Help Command Module for outputting help to the user 
- Added Istanbul JavaScript test coverage and ESLint JavaScript linting with rules based on Node.JS & ES6 to improve the quality of the solution

#### Changed
- Moved CLI Help from the CLI module to the Help Command Module

## [0.0.2] - 2017-05-19
#### Added
- noddsdale.sh - this is a wrapper around calling node with parameters from the shell
- Command line usage information when you call noddsdale with no parameters and unknow parameters
- Mocha and Sinon.JS for testing the solution
- Added Visual Studio Code configuration for running and debugging the solution

## [0.0.1] - 2017-05-18
#### Added
- This CHANGELOG where I intend to capture the key changes to the project
- README.md - documenting the purpose of the project
- ROADMAP.md outlining the intended roadmap for noddsdale