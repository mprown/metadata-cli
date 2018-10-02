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
        // Get org connection
        const conn = this.org.getConnection();
        // Set execute options
        const execOptions: jsforce.ExecuteOptions = {
            autoFetch: true,
            maxFetch: 200
        };
        // Use tooling api to query for metadata package
        conn.tooling.query('SELECT Name FROM MetadataPackage')
        .execute(execOptions, (err, metadata) => {
            if (err) { return console.error('err', err); }
            const records = metadata as Array<QueryResult<{}>>;
            // Stringify metadata response
            const recordString = JSON.stringify(metadata);
            // Parse recordString back into any
            const jsonRecords = JSON.parse(recordString);
            // Iterate through packages and echo names
            for (const jsonRecord of jsonRecords.records) {
                shell.echo(jsonRecord.Name);
            }
        });
        return {};
    }
}
