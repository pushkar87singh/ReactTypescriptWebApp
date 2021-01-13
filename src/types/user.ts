import { IBiodataField } from "./biodata";
import { IPackage } from "./assessments";

interface IUserPermission {
  key: string;
  hasPermission: boolean;
}

export type IUser = Pick<
  ILeader,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "permissions"
  | "titleId"
  | "roles"
  | "genderId"
  | "businessFunction"
  | "yearOfBirth"
  | "location"
  | "language"
  | "experienceAvailable"
  | "behaviorAvailable"
  | "behaviorStarted"
  | "subscriptionId"
  | "opqTestUrl"
  | "biodata"
  | "reportNotification"
>;

export type ICurrentUser = IUser & {
  roles: FocusRole[];
};

export interface ILeader {
  id: string;
  language?: string;
  firstName: string;
  lastName: string;
  email: string;
  permissions?: IUserPermission[];
  performanceAvailable: boolean;
  experienceAvailable?: boolean;
  behaviorAvailable?: boolean;
  behaviorStarted?: boolean;
  allAssessmentsDone?: boolean;
  allTCAssessmentsComplete?: boolean;
  engagementCompleted?: boolean;
  opqPercentile: number;
  titleId?: string;
  genderId?: string;
  businessFunction?: string;
  yearOfBirth?: number;
  location?: string;
  roles?: string[];
  subscriptionId?: string | null;
  opqTestUrl?: string;
  participantAccess?: IUserLevelParticipantAccess;
  package?: IPackage;
  biodata?: IBiodataField[];
  reportNotification?: boolean;
}

export interface IUserLevelParticipantAccess {
  showResults: boolean | null;
  showDevGuides: boolean | null;
}

export interface IUserData {
  currentUser: IUser;
}

export interface IUserLink {
  user: IUser;
  isLinked: boolean;
}

export enum FocusRole {
  LEADER = "LEADER",
  SUBSCRIPTION_MANAGER = "SM",
  GROUP_ADMIN = "GA",
  PS_CONSULTANT = "PSCONSULTANT",
  SERVICE_MANAGER = "SVCMGR",
  SYSTEM_ADMIN = "SYSADMIN"
}

export enum UserStatus {
  UNREGISTERED = 0,
  REGISTERED = 1,
  ACTIVE = 10,
  PENDING = 100,
  INACTIVE = 999
}

export interface ILocationsFunctionsList {
  id: string;
  name: string;
}

export enum ChosenView {
  ADMIN = "admin",
  LEADER = "leader"
}

export interface UserManager {
  participantId?: string;
  providerEmail?: string;
  providerFirstName?: string;
  providerLastName?: string;
}
