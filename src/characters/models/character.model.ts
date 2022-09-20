export type CharacterModel = {
  id: string;
  firstName: string;
  lastName: string;
  episodes: string[];
  createdAtTimestamp: number;
  updatedAtTimestamp: number;
  /**
   * Needed for sorting by creation date
   */
  constSortKey: "1";
};
