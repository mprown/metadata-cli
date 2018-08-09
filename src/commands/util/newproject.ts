'use strict';
import {core, flags, SfdxCommand} from '@salesforce/command';

import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsforce from 'jsforce';
import * as shell from 'shelljs';
import * as apiConstants from '../../utilities/customObjectConstants';
import {DefaultOptions} from '../../utilities/defaultOptions';
core.Messages.importMessagesDirectory(__dirname);

const messages = core.Messages.loadMessages('createcustomobject', 'org');

export default class NewProject extends SfdxCommand {
    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
        fullname: flags.string({char: 'x', description: messages.getMessage('nameFlagDescription')}),
        force: flags.boolean({char: 'f', description: messages.getMessage('forceFlagDescription')}),
        // projectname: flags.boolean({char: 'p', description: messages.getMessage('nameFlagDescription')})
    };
    // Comment this out if your command does not require an org username
    protected static requiresUsername = false;
    public async run(): Promise<core.AnyJson> {
        const orgs = JSON.parse(shell.exec('sfdx force:org:list --json'));
        this.ux.log(orgs.result);
        const nonscratchorgs = orgs.result.nonScratchOrgs;
        let aliases: string[] = [];
        for (let org of nonscratchorgs) {
             aliases.push(org.alias);
        }
        let userInput;
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
        inquirer.prompt(questions).then(answers => {
            this.runCLI(answers);
        });
        return {};
    }

    public runCLI(userInput: inquirer.Answers): boolean {
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
        // # set default username
        shell.exec('sfdx force:config:set defaultusername=' + userInput.defaultUserName);

        return true;
    }

}
