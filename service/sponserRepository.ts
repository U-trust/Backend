import * as AWS from 'aws-sdk';
import { SponserUsecase } from '../domain/sponser';
import { Sponser } from '../models/sponser';

export class SponserRepository implements SponserUsecase {

    constructor(private dbClient: AWS.DynamoDB.DocumentClient) { }

    async getSponser(name: string) {
        const sponser = await this.dbClient.get(new Sponser(name).keyQuery).promise();
        if (!sponser) throw new Error(`not linked name : ${name}`);
        return (sponser.Item as Sponser);
    }

    async getSponsers() {
        var params = {
            TableName: "sponser"
        };
        const sponsers = await this.dbClient.scan(params).promise();
        if (!sponsers) throw new Error(`no exist sponsers`);
        return (sponsers.Items as Sponser[]);
    }

    async setApplicant(name: string, applicant: string) {
        const sponser = await this.dbClient.get(new Sponser(name).keyQuery).promise();
        if (!sponser) throw new Error(`not linked name : ${name}`);
        else {
            let s = sponser.Item as Sponser;
            s.applicants.push(applicant)
            var params = {
                TableName: 'sponser',
                Key: {
                    name: name
                },
                UpdateExpression: "set sponser.applicants = :a",
                ExpressionAttributeValues: {
                    ":a": s.applicants
                },
                ReturnValues: "UPDATED_NEW"
            };
            await this.dbClient.update(params).promise();
            return s
        }
    }
}