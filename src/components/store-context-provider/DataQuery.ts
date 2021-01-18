import { gql } from "apollo-boost";
import { Visualization, IPackage } from "types";

export interface IStoreQueryData {
  subscription: ISubscription;
}

export const GET_STORE_DATA = gql`
  query GetStoreData($hasSubscrId: Boolean!) {
    subscription @include(if: $hasSubscrId) {
      visualizations {
        id
        name
      }
      defaultLanguage
      participantAccess {
        showResults
        showDevGuides
      }
      packages {
        id
        name
        assessments {
          id
          name
          tag
          tcPackage
        }
      }
    }
  }
`;

export interface ISubscription {
  visualizations: Visualization[];
  defaultLanguage: string;
  participantAccess: {
    showResults: boolean;
    showDevGuides: boolean;
  };
  packages: IPackage[];
}
