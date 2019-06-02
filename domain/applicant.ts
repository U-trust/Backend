import { Applicant } from "../models/applicant";

export interface ApplicantUsecase {
    signIn: (mail: string, password: string) => Promise<Applicant>
    signUp: (mail: string, name: string, password: string) => Promise<Applicant>
    getApplicant: (name: string) => Promise<Applicant>
    getApplicants: () => Promise<Applicant[]>
    setSponser: (name: string, sponser: string) => Promise<Applicant>
    setStatus: (applicant: string, sponser: string, status: string) => Promise<void>
    updateMyinfo: (applicant: Applicant) => Promise<void>
}