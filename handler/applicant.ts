import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { ApplicantRepository } from '../service/applicantRepository';
import { response, createDBClient } from '../models';

const applicantRepo = new ApplicantRepository(createDBClient());

export const signUp: APIGatewayProxyHandler = middleware(
  async (param) => {
    const name = param.body.name;
    const mail = param.body.mail;
    const password = param.body.password;
    try {
      const applicant = await applicantRepo.signUp(mail, name, password);
      return response(200, { applicant: applicant });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { body: ['name', 'mail', 'password'] }
)

export const getApplicant: APIGatewayProxyHandler = middleware(
  async (param) => {
    const name = param.queryParams.name;
    try {
      const applicant = await applicantRepo.getApplicant(name);
      return response(200, { applicant: applicant });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { queryParams: ['name'] }
)

export const getApplicants: APIGatewayProxyHandler = middleware(
  async () => {
    try {
      const applicants = await applicantRepo.getApplicants();
      return response(200, { applicants: applicants });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  {}
)

export const setSponser: APIGatewayProxyHandler = middleware(
  async (param) => {
    const name = param.body.name;
    const sponser = param.body.sponser;
    try {
      const applicant = await applicantRepo.setSponser(name, sponser);
      return response(200, { applicant: applicant });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { body: ['name', 'sponser'] }
)

export const setApplicantStatus: APIGatewayProxyHandler = middleware(
  async (param) => {
    const applicant = param.body.applicant;
    const sponser = param.body.sponser;
    const status = param.body.status;
    try {
      let applicants = await applicantRepo.getApplicants();
      applicants = applicants.filter(a => {
        if (a == applicant) {
          a.setStatus(sponser, status)
        }
      });
      await applicantRepo.setStatus(applicant, sponser, status);
      return response(200);
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { body: ['applicant', 'sponser', 'status'] }
)

export const signIn: APIGatewayProxyHandler = middleware(
  async (param) => {
    const mail = param.body.mail;
    const password = param.body.password;
    try {
      const isAuth = await applicantRepo.signIn(mail, password);
      return response(200, { isAuth: isAuth });
    } catch (e) {
      console.error(e);
      return response(404, e.message);
    }
  },
  { body: ['mail', 'password'] }
)