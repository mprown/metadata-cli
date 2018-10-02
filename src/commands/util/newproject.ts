'use strict';
import {core, flags, SfdxCommand} from '@salesforce/command';

import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsforce from 'jsforce';
import * as shell from 'shelljs';
import * as apiConstants from '../../utilities/customObjectConstants';
import {DefaultOptions} from '../../utilities/defaultOptions';
import * as writeGitIgnore from '../../utilities/writeGitIgnore';
core.Messages.importMessagesDirectory(__dirname);

const messages = core.Messages.loadMessages('createcustomobject', 'project');

export default class NewProject extends SfdxCommand {
    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
        fullname: flags.string({char: 'x', description: messages.getMessage('nameFlagDescription')}),
        force: flags.boolean({char: 'f', description: messages.getMessage('forceFlagDescription')}),
        projectname: flags.string({char: 'p', description: messages.getMessage('projectNameDescription')}),
        defaultusername: flags.string({char: 'u', description: messages.getMessage('usernameDescription')}),
        gitremote: flags.string({char: 'g', description: messages.getMessage('gitRemoteDescription')})
    };
    // Comment this out if your command does not require an org username
    protected static requiresUsername = false;
    public async run(): Promise<core.AnyJson> {
        // Call project new command
        shell.exec('sfdx force:project:create -n ' + this.flags.projectname);
        // # Change to the directory of the project
        shell.cd(this.flags.projectname);
        // Initialize git
        shell.exec('git init');
        // #create mdapi directory for files pulled from org
        shell.mkdir('mdapi');
        // #create mdapioutput directory to hold files to be pushed back
        // #back to sandbox
        shell.mkdir('mdapioutput');
        // #create directory for tests
        shell.mkdir('tests');
        // create classes directory
        shell.mkdir('./force-app/main/default/classes');
        // create triggers directory
        shell.mkdir('./force-app/main/default/triggers');
        // create pages directory
        shell.mkdir('./force-app/main/default/pages');
        // # set default username
        shell.exec('sfdx force:config:set defaultusername=' + this.flags.defaultusername);
        // create .gitignore file
        writeGitIgnore.GitIgnore.createFile();
        /*const orgs = JSON.parse(shell.exec('sfdx force:org:list --json'));
        const nonscratchorgs = orgs.result.nonScratchOrgs;
        const aliases: string[] = [];
        for (const org of nonscratchorgs) {
             aliases.push(org.alias);
        }
        // const userInput;
        const questions: object[] = [
            {
            name: 'projectName',
            message: 'What is the name of the project?',
            default: 'Test'
        },
            {
            name: 'defaultUserName',
            type: 'list',
            message: 'What is the default org for the project',
            default: aliases[0],
            choices: aliases
            }];
        inquirer.prompt(questions).then(async answers => {
            await this.runCLI(answers);
        });*/
        return {};
    }

    public async runCLI(userInput: inquirer.Answers): Promise<core.AnyJson> {
        // Call project new command
        shell.exec('sfdx force:project:create -n ' + userInput.projectName);
        // # Change to the directory of the project
        shell.cd(userInput.projectName);
        // #create mdapi directory for files pulled from org
        shell.mkdir('mdapi');
        // #create mdapioutput directory to hold files to be pushed back
        // #back to sandbox
        shell.mkdir('mdapioutput');
        // #create directory for tests
        shell.mkdir('tests');
        // create classes directory
        shell.mkdir('./force-app/main/default/classes');
        // create triggers directory
        shell.mkdir('./force-app/main/default/triggers');
        // create pages directory
        shell.mkdir('./force-app/main/default/pages');
        // # set default username
        shell.exec('sfdx force:config:set defaultusername=' + userInput.defaultUserName);
        // create .gitignore file
        writeGitIgnore.GitIgnore.createFile();
        // Initialize git
        shell.exec('git init');
        // set remote for git
        return {success: true};
    }

}
