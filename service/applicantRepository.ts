import * as AWS from 'aws-sdk';

import { Applicant } from '../models/applicant';
import { ApplicantUsecase } from '../domain/applicant';

export class ApplicantRepository implements ApplicantUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async signUp(mail: string, name: string, password: string) {
        const applicant = new Applicant(name, mail, password);
        await this.dbClient.put(applicant.putQuery).promise();
        return applicant as Applicant;
    }

    async getApplicant(name: string) {
        const applicant = await this.dbClient.get(new Applicant(name).keyQuery).promise();
        if (!applicant) throw new Error(`not linked name : ${name}`);
        return (applicant.Item as Applicant);
    }

    async getApplicants() {
        var params = {
            TableName: "applicant"
        };
        const applicants = await this.dbClient.scan(params).promise();
        console.log("applicant-respository-log", applicants)
        if (!applicants) throw new Error(`no exist applicants`);
        return (applicants.Items as Applicant[]);
    }

    async signIn(mail, password) {
        var params = {
            TableName: 'applicant',
            Key: { mail }
        }
        const applicants = await this.dbClient.get(params).promise();
        // const applicants = await this.getApplicants()

        // const result = applicants.find(a => a.mail == mail && a.password == password)
        // console.log("signIn", result);

        // if (!!result) return result as Applicant
        // else throw new Error('signIn fail')
        console.log("signIn", applicants.Item.password);

        if (applicants.Item && applicants.Item.password === password) {
            return applicants.Item as Applicant
        } else {
            throw new Error('signIn fail')
        }
    }

    async setSponser(name: string, sponser: string) {
        const applicant = await this.dbClient.get(new Applicant(name).keyQuery).promise();
        if (!applicant) throw new Error(`not linked name : ${name}`);
        else {
            let a = applicant.Item as Applicant;
            a.sponsers.push(sponser);
            await this.dbClient.delete(new Applicant(name).keyQuery).promise();
            await this.dbClient.put(new Applicant(name, a.mail, a.password, a.sponsers,
                a.statuses, a.image, a.phone, a.selfIntroduction, a.eduLevel, a.creers,
                a.awards, a.educations, a.certifications, a.links).putQuery).promise();
            return a;
            // a = a.setSponser(sponser);
            // var params = {
            //     TableName: 'applicant',
            //     Key: {
            //         name: name
            //     },
            //     UpdateExpression: "set applicant.sponsers = :s",
            //     ExpressionAttributeValues: {
            //         ":s": a.sponsers
            //     },
            //     ReturnValues: "UPDATED_NEW"
            // };
            // await this.dbClient.update(params).promise();
            // return a
        }
    }

    async setStatus(applicant: string, sponser: string, status: string) {
        const app = await this.dbClient.get(new Applicant(applicant).keyQuery).promise();
        if (!app) throw new Error(`not linked name : ${applicant}`);
        else {
            let a = app.Item as Applicant;
            a = a.setStatus(sponser, status);
            var params = {
                TableName: 'applicant',
                Key: {
                    name: applicant
                },
                UpdateExpression: "set applicant.statuses = :s",
                ExpressionAttributeValues: {
                    ":s": a.statuses
                },
                ReturnValues: "UPDATED_NEW"
            };
            await this.dbClient.update(params).promise();
        }
    }

    async updateMyinfo(applicant: Applicant) {
        var params = {
            TableName: 'applicant',
            Key: {
                name: applicant
            },
            UpdateExpression: "set applicant = :a",
            ExpressionAttributeValues: {
                ":a": applicant
            },
            ReturnValues: "UPDATED_NEW"
        };
        await this.dbClient.update(params).promise();
    }
}