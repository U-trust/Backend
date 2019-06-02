import { TableModel } from "./tableModel";

export class Status {
  constructor(
    public sponser: string,
    public status: string
  ) { }
}

export class Applicant extends TableModel {
  constructor(
    public name: string,
    public mail?: string,
    public password?: string,
    public sponsers?: string[],
    public statuses: any = [],
    public image?: string,
    public phone?: string,
    public selfIntroduction?: string,
    public eduLevel?: string[],
    public creers?: string[],
    public awards?: string[],
    public educations?: string[],
    public certifications?: string[],
    public links?: string[],
  ) {
    super('applicant');
  }

  setSponser(sponser: string) {
    this.sponsers.push[sponser];
    return this;
  }

  setStatus(sponser: string, status: string) {
    if (this.statuses.length === 0 || this.statuses.find((s: Status) => s.sponser != sponser)) {
      this.statuses.push(new Status(sponser, status))
    }
    else {
      this.statuses.foreach((s: Status) => {
        if (s.sponser == sponser) {
          s.status = status;
        }
      });
    }
    return this;
  }

  get map(): { [key: string]: any; } {
    return {
      name: this.name,
      mail: this.mail,
      password: this.password,
      sponsers: this.sponsers,
      statuses: this.statuses,
      phone: this.phone,
      selfIntroduction: this.selfIntroduction,
      eduLevel: this.eduLevel,
      awards: this.awards,
      creers: this.creers,
      educations: this.educations,
      certifications: this.certifications,
      links: this.links,
    }
  };
}