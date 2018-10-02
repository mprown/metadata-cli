import {core, flags, SfdxCommand} from '@salesforce/command';
export interface IObject {
    fullName: string;
    label: string;
    deploymentStatus: string;
    sharingModel: string;
    pluralLabel: string;
    nameField: object;
    }

export  interface IField {}
