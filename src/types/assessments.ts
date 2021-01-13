export interface IPackageResponse {
  subscription: {
    id: string;
    packages: [IPackage];
  };
}

export interface IPackage {
  id: string;
  name: string;
  isDefault?: boolean;
  assessments?: [IAssessment];
}

export interface IAssessment {
  id: string;
  name: string;
  tag: string;
  tcPackage: boolean;
  isCompleted?: boolean;
}
