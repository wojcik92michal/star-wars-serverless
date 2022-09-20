import { CharacterDto } from "./character.dto";

export type GetCharactersResult = {
  limit: number;
  items: CharacterDto[];
  nextId?: string;
};
