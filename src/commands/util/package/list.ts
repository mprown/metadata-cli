'use strict';
import {core, flags, SfdxCommand} from '@salesforce/command';

import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsforce from 'jsforce';
import * as shell from 'shelljs';
import { ExecuteOptions } from 'jsforce';
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
        // Get org connection
        const conn = this.org.getConnection();
        // Set execute options
        const execOptions: ExecuteOptions = {
            autoFetch: true,
            maxFetch: true
        };
        const types = [{type: 'MetadataPackage', folder: null}];
        conn.tooling.query('SELECT Name FROM MetadataPackage')
        .execute(execOptions, (err, metadata) => {
            if (err) { return console.error('err', err); }
            const meta = metadata[0];
            this.ux.log(metadata);
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
