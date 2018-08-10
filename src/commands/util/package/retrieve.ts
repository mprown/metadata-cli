'use strict';
import {core, flags, SfdxCommand} from '@salesforce/command';

import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsforce from 'jsforce';
import {QueryResult} from 'jsforce';
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
    protected static requiresUsername = true;
    public async run(): Promise<core.AnyJson> {
        // get aliases of orgs
        const aliases: string[] = this.getOrgs();
        // Get packages from target org
        const packages: string[] = this.queryPackages();
        // create questions for inquirer
        const questions: object[] = [
            {
            name: 'targetOrg',
            type: 'list',
            message: 'To which org should the project be retrieved?',
            default: aliases[0],
            choices: aliases
            },
            {
            name: 'packageName',
            type: 'list',
            message: 'Select the package you want to retrieve',
            default: packages[0],
            choices: packages
            }];
        inquirer.prompt(questions)
            .then( answers => {
                this.runShellCommands(answers);
            });
        return {};
    }
    public getOrgs(): string[] {
        const orgs = JSON.parse(shell.exec('sfdx force:org:list --json'));
        const nonscratchorgs = orgs.result.nonScratchOrgs;
        const aliases: string[] = [];
        for (const org of nonscratchorgs) {
             aliases.push(org.alias);
        }
        return aliases;
    }
    public queryPackages(): string[] {
        // Get org connection
        const conn = this.org.getConnection();
        // Set execute options
        const execOptions: jsforce.ExecuteOptions = {
            autoFetch: true,
            maxFetch: 200
        };
        let records: string;
        const packageNames: string[] = new Array<string>();
        // Use tooling api to query for metadata package
        conn.tooling.query('SELECT Name FROM MetadataPackage')
        .execute(execOptions, (err, metadata) => {
            if (err) { return console.error('err', err); }
            // Stringify metadata response
            records = JSON.stringify(metadata);
            // Parse recordString back into any
            const jsonRecords = JSON.parse(records);
            // iterate through packages
            for (const jsonRecord of jsonRecords.records) {
            const packageName: string = '"' + jsonRecord.Name + '"';
            packageNames.push(packageName);
            }
        });
        return packageNames;
    }
    // Method to call sfdx commands
    public runShellCommands(answers: inquirer.Answers) {
        // retrieve package using mdapi
        try {
        shell.exec('sfdx force:mdapi:retrieve -u ' + answers.targetOrg + ' -p ' + answers.packageName + ' -r ./mdapi');
        // unzip package file
        shell.exec('unzip ./mdapi/unpackaged.zip -d ./mdapi');
        // convert into source
        shell.exec('sfdx force:mdapi:convert -r ./mdapi -d ./force-app');
        } catch (e) {
            this.ux.log(e);
        }
    }
}
