import { Sponser } from "../models/sponser";

export interface SponserUsecase {
    getSponser: (name: string) => Promise<Sponser>
    getSponsers: () => Promise<Sponser[]>
    setApplicant: (name: string, applicant: string) => Promise<Sponser>
}