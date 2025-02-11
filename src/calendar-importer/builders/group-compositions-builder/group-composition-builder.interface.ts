import { GroupsComposition } from "../../calendar-importer.interface";

export interface GroupCompositionBuilder {

  readonly groupsComposition: GroupsComposition;

  getGroupsComposition(): GroupsComposition;

}