import { CharacterModel } from "../models/character.model";

export type CharacterDto = {
  id: string;
  firstName: string;
  lastName: string;
  episodes: string[];
};

export const fromCharacterModel = (model: CharacterModel): CharacterDto => {
  return {
    id: model.id,
    firstName: model.firstName,
    lastName: model.lastName,
    episodes: model.episodes,
  };
};
