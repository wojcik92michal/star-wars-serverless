import { handlerPath } from "@app/helpers";

export const createCharacter = {
  handler: `${handlerPath(__dirname)}/handler.createCharacter`,
  events: [
    {
      http: {
        method: "post",
        path: "character",
        bodyType: "CreateCharacterDto",
        responseData: {
          200: {
            description: "Character created successfully",
            bodyType: "GetCharacterDto",
          },
          500: {
            description: "Unexpected error appeared",
          },
        },
      },
    },
  ],
};
