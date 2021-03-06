createcustomobject
==================

Create custom object from sfdx

[![Version](https://img.shields.io/npm/v/createcustomobject.svg)](https://npmjs.org/package/createcustomobject)
[![CircleCI](https://circleci.com/gh/mprown/createcustomobject/tree/master.svg?style=shield)](https://circleci.com/gh/mprown/createcustomobject/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/mprown/createcustomobject?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/createcustomobject/branch/master)
[![Codecov](https://codecov.io/gh/mprown/createcustomobject/branch/master/graph/badge.svg)](https://codecov.io/gh/mprown/createcustomobject)
[![Greenkeeper](https://badges.greenkeeper.io/mprown/createcustomobject.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/mprown/createcustomobject/badge.svg)](https://snyk.io/test/github/mprown/createcustomobject)
[![Downloads/week](https://img.shields.io/npm/dw/createcustomobject.svg)](https://npmjs.org/package/createcustomobject)
[![License](https://img.shields.io/npm/l/createcustomobject.svg)](https://github.com/mprown/createcustomobject/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g createcustomobject
$ createcustomobject COMMAND
running command...
$ createcustomobject (-v|--version|version)
createcustomobject/0.0.1 darwin-x64 node-v8.9.4
$ createcustomobject --help [COMMAND]
USAGE
  $ createcustomobject COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`createcustomobject hello:org [FILE]`](#createcustomobject-helloorg-file)
* [`createcustomobject metadata:createcustomfield`](#createcustomobject-metadatacreatecustomfield)
* [`createcustomobject metadata:object`](#createcustomobject-metadataobject)
* [`createcustomobject util:newproject`](#createcustomobject-utilnewproject)
* [`createcustomobject util:package:deploy`](#createcustomobject-utilpackagedeploy)
* [`createcustomobject util:package:list`](#createcustomobject-utilpackagelist)
* [`createcustomobject util:package:retrieve`](#createcustomobject-utilpackageretrieve)

## `createcustomobject hello:org [FILE]`

Prints a greeting and your org id(s)!

```
USAGE
  $ createcustomobject hello:org [FILE]

OPTIONS
  -f, --force                                      example boolean flag
  -n, --name=name                                  name to print
  -u, --targetusername=targetusername              username or alias for the target org; overrides default target org
  -v, --targetdevhubusername=targetdevhubusername  username or alias for the dev hub org; overrides default dev hub org
  --apiversion=apiversion                          override the api version used for api requests made by this command
  --json                                           format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)   logging level for this command invocation

EXAMPLES
  $ sfdx hello:org --targetusername myOrg@example.com --targetdevhubusername devhub@org.com
     Hello world! This is org: MyOrg and I will be around until Tue Mar 20 2018!
     My hub org id is: 00Dxx000000001234
  
  $ sfdx hello:org --name myname --targetusername myOrg@example.com
     Hello myname! This is org: MyOrg and I will be around until Tue Mar 20 2018!
```

_See code: [src/commands/hello/org.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/hello/org.ts)_

## `createcustomobject metadata:createcustomfield`

```
USAGE
  $ createcustomobject metadata:createcustomfield

OPTIONS
  -d, --defaultoptions                            name to print
  -f, --force                                     example boolean flag
  -n, --name=name                                 name to print
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  -x, --fullname=fullname                         name to print
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
```

_See code: [src/commands/metadata/createcustomfield.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/metadata/createcustomfield.ts)_

## `createcustomobject metadata:object`

```
USAGE
  $ createcustomobject metadata:object

OPTIONS
  -d, --defaultoptions                            name to print
  -f, --force                                     example boolean flag
  -n, --name=name                                 name to print
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  -x, --fullname=fullname                         name to print
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
```

_See code: [src/commands/metadata/object.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/metadata/object.ts)_

## `createcustomobject util:newproject`

```
USAGE
  $ createcustomobject util:newproject

OPTIONS
  -f, --force                                     example boolean flag
  -g, --gitremote=gitremote                       Specify the desired git remote for the project
  -n, --name=name                                 name to print
  -p, --projectname=projectname                   Specify the name of this project
  -u, --defaultusername=defaultusername           Specifies which username to set as the defaultusername
  -x, --fullname=fullname                         name to print
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
```

_See code: [src/commands/util/newproject.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/util/newproject.ts)_

## `createcustomobject util:package:deploy`

```
USAGE
  $ createcustomobject util:package:deploy

OPTIONS
  -f, --force                                     example boolean flag
  -n, --name=name                                 name to print
  -x, --fullname=fullname                         name to print
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
```

_See code: [src/commands/util/package/deploy.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/util/package/deploy.ts)_

## `createcustomobject util:package:list`

```
USAGE
  $ createcustomobject util:package:list

OPTIONS
  -f, --force                                     example boolean flag
  -n, --name=name                                 name to print
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  -x, --fullname=fullname                         name to print
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
```

_See code: [src/commands/util/package/list.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/util/package/list.ts)_

## `createcustomobject util:package:retrieve`

```
USAGE
  $ createcustomobject util:package:retrieve

OPTIONS
  -f, --force                                     example boolean flag
  -n, --name=name                                 name to print
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  -x, --fullname=fullname                         name to print
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation
```

_See code: [src/commands/util/package/retrieve.ts](https://github.com/mprown/createcustomobject/blob/v0.0.1/src/commands/util/package/retrieve.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!

