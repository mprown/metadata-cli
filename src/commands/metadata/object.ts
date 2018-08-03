'use strict';
import {core, flags, SfdxCommand} from '@salesforce/command';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsforce from 'jsforce';
import * as apiConstants from '../../utilities/customObjectConstants';
import {DefaultOptions} from '../../utilities/defaultOptions';
import * as IObject from '../../utilities/IObject';
import { MetadataInfo } from 'jsforce';
core.Messages.importMessagesDirectory(__dirname);

const messages = core.Messages.loadMessages('createcustomobject', 'org');

export default class CreateObject extends SfdxCommand {
    protected static flagsConfig = {
        // flag with a value (-n, --name=VALUE)
        name: flags.string({char: 'n', description: messages.getMessage('nameFlagDescription')}),
        fullname: flags.string({char: 'x', description: messages.getMessage('nameFlagDescription')}),
        force: flags.boolean({char: 'f', description: messages.getMessage('forceFlagDescription')}),
        defaultoptions: flags.boolean({char: 'd', description: messages.getMessage('nameFlagDescription')})
    };
    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;
    public async run(): Promise<core.AnyJson> {
        const defaultoptions = this.flags.defaultoptions;
        let userInput;
        const questions: object[] = [
            {
            name: 'objectName',
            message: 'What is the name of the object?',
            default: 'Test'
        }];
        if (!defaultoptions) {
            questions.push({
                type: 'list',
                name: 'deploymentStatus',
                message: 'Should the object be deployed?',
                choices: apiConstants.Constants.deploymentStatuses,
                default: apiConstants.Constants.deploymentStatuses[0]
                },
            {
                name: 'sharingModel',
                message: 'What is the sharing model for the object?',
                default: 'Text',
                type: 'list',
                choices: apiConstants.Constants.sharingModels
            },
            {
                name: 'plural',
                message: 'What is the plural name of the object',
                key: 'p'
            });
        }
        inquirer.prompt(questions).then(answers => {
            userInput = answers;
        }).then(x => {
            this.writeObject(userInput, this.flags.defaultoptions);
        });
        return {};
    }

    public async writeObject(answers: inquirer.answers, defaultoptions: boolean) {
        // Interface for custom object
        /*interface IObject {
        label: string;
        apiName: string;
        deploymentStatus: string;
        nameField: object;
        }*/
        let customObject: IObject.IObject;
        if (defaultoptions) {
            const objectName: string = answers.objectName;
            console.log(DefaultOptions);
            customObject = new DefaultOptions(objectName).defaults;
        }
        this.makeAPICall(customObject);

    }
    public async makeAPICall(customObject: IObject.IObject) {
        const conn = this.org.getConnection();
        const metadata: MetadataInfo[] = [customObject];
        conn.metadata.create('CustomObject', metadata, (err, results) => {
            if (err) {
                this.ux.log(err);
            }
            this.ux.log(results);
        });
    }
}
