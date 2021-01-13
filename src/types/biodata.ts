export interface IBiodataField {
  id: string;
  localizedName: string;
  type: string;
  userTableColumn: string;
  participantVisible: boolean;
  value: string;
  localizedListItems: Array<{
    id: string;
    name: string;
  }>;
}
