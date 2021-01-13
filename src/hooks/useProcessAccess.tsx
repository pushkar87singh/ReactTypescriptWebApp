import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { IUser, FocusRole } from "../types";

interface IProcessAuthQuery {
  processAuthorization: IProcessAuthorization[];
}

interface IProcessAuthorization {
  processId: number;
  userId: string;
  access: number;
  subscriptionId: string;
  userRole: number;
  group: number;
}

export const GET_PROCESS_AUTHORIZATION = gql`
  query ProcessAuthorization(
    $processId: Int
    $userId: String
    $group: Int
    $userRole: Int
    $subId: String
  ) {
    processAuthorization(
      processId: $processId
      userId: $userId
      group: $group
      userRole: $userRole
      subId: $subId
    ) {
      processId
      userId
      access
      subscriptionId
      userRole
      group
    }
  }
`;

const getRole = (user?: IUser) => {
  const role = user && user.roles && user.roles[0];
  switch (role) {
    case FocusRole.SYSTEM_ADMIN:
      return 1;
    case FocusRole.SERVICE_MANAGER:
      return 2;
    case FocusRole.SUBSCRIPTION_MANAGER:
      return 3;
    case FocusRole.LEADER:
      return 4;
    case FocusRole.PS_CONSULTANT:
      return 5;
    case FocusRole.GROUP_ADMIN:
      return 14;
    default:
      return -1;
  }
};

const ID = "00000000-0000-0000-0000-000000000000";
export const useProcessAccess = (processId: number, user?: IUser) => {
  const group = -1;
  const userRole = getRole(user) || -1;
  const userId = (user && user.id) || ID;
  const subId = (user && user.subscriptionId) || ID;

  const { loading, error, data } = useQuery<IProcessAuthQuery>(
    GET_PROCESS_AUTHORIZATION,
    {
      variables: { processId, userId, group, userRole, subId }
    }
  );

  if (!loading && !error && data && data.processAuthorization) {
    return data.processAuthorization[0].access === 1;
  } else {
    return false;
  }
};

// export const getProcessAccessData = (processId: number, user?: IUser) => {
//   const group = -1;
//   const userRole = getRole(user) || -1;
//   const userId = (user && user.id) || ID;
//   const subId = (user && user.subscriptionId) || ID;

//   const { loading, error, data } = useQuery<IProcessAuthQuery>(GET_PROCESS_AUTHORIZATION, {
//     variables: { processId, userId, group, userRole, subId }
//   });

//   return {
//     accessLoading: loading,
//     accessError: error,
//     accessRes: data
//   }
// }
