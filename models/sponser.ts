import { TableModel } from "./tableModel";

export class Sponser extends TableModel {
  constructor(
    public name: string,
    public image?: string,
    public applicants?: string[],
    public phone?: string,
    public introduction?: string,
    public predictPrice?: string,
    public interesteds?: string[],
  ) {
    super('sponser');
  }

  setApplicant(applicant) {
    this.applicants.push(applicant);
    return this;
  }

  get map(): { [key: string]: any; } {
    return {
      name: this.name,
      phone: this.phone,
      introduction: this.introduction,
      predictPrice: this.predictPrice,
      interesteds: this.interesteds,
    }
  };
}