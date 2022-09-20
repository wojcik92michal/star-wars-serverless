import { db } from "@app/database";
import { ModifyCharactersService } from "./services/modify-characters.service";
import { ReadCharactersService } from "./services/read-characters.service";

export const readCharactersService = new ReadCharactersService(db);
export const modifyCharactersService = new ModifyCharactersService(db);
