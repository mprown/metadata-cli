import {core, flags, SfdxCommand} from '@salesforce/command';
import { Field, FieldType } from '../../node_modules/@types/jsforce';
import * as IObject from './IObject';
export class DefaultOptions {
public defaults: IObject.IObject;
constructor(objectName: string) {
    const fieldType: FieldType = 'string';
    this.defaults = {
        label: objectName,
        fullName: objectName + '__c',
        sharingModel: 'ReadWrite',
        deploymentStatus: 'Deployed',
        pluralLabel: objectName + 's',
        nameField: {
            type: 'Text',
            label: objectName + ' Name'
        }
    };
}
}

// Custom field default options
export class CustomFieldDefaults {
    public defaults: Field;
}
