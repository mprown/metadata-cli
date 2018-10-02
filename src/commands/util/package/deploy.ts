'use strict';
import {core, flags, SfdxCommand} from '@salesforce/command';

import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsforce from 'jsforce';
import * as shell from 'shelljs';
core.Messages.importMessagesDirectory(__dirname);

const messages = core.Messages.loadMessages('createcustomobject', 'org');

export default class NewProject extends SfdxCommand {
    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
        fullname: flags.string({char: 'x', description: messages.getMessage('nameFlagDescription')}),
        force: flags.boolean({char: 'f', description: messages.getMessage('forceFlagDescription')})
        // projectname: flags.boolean({char: 'p', description: messages.getMessage('nameFlagDescription')})
    };
    // Comment this out if your command does not require an org username
    protected static requiresUsername = false;
    public async run(): Promise<core.AnyJson> {
        // get list of available orgs
        const orgs = JSON.parse(shell.exec('sfdx force:org:list --json'));
        const nonscratchorgs = orgs.result.nonScratchOrgs;
        const aliases: string[] = [];
        for (const org of nonscratchorgs) {
             aliases.push(org.alias);
        }
        const questions: object[] = [
            {
            name: 'defaultUserName',
            type: 'list',
            message: 'To which org should the project be deployed?',
            default: aliases[0],
            choices: aliases
            }];
        inquirer.prompt(questions).then(answers => {
            this.runCLI(answers);
        });
        return {};
    }

    public runCLI(userInput: inquirer.Answers): boolean {
        // convert force-app to mdapioutput
        shell.exec('sfdx force:source:convert -r ./force-app -d ./mdapioutput');
        // call sfdx to deploy
        shell.exec('sfdx force:mdapi:deploy -d ./mdapioutput -w 3 -u ' + userInput.defaultUserName);
        return true;
    }

}
