import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { middleware } from '../util/middleware';
import { response } from '../models';

export const corsHandler: APIGatewayProxyHandler = middleware(
  async () => {
    return response(201, "")
  },
  {}
)