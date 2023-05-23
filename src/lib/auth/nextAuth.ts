import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/pages/api/auth/[...nextauth]';

type ParametersGetServerSession =
  | []
  | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
  | [NextApiRequest, NextApiResponse];

export const getSession = async (...parameters: ParametersGetServerSession) => {
  // my shortcut to avoid having to pass the authOptions object to every page
  const session = await getServerSession(...parameters, authOptions);
  return session;
};
