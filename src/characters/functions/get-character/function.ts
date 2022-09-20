import { handlerPath } from "@app/helpers";

export const getCharacter = {
  handler: `${handlerPath(__dirname)}/handler.getCharacter`,
  events: [
    {
      http: {
        method: "get",
        path: "character/{id}",
        responseData: {
          200: {
            description: "Character fetched successfully",
            bodyType: "GetCharacterDto",
          },
          404: {
            description: "Character not found",
          },
        },
      },
    },
  ],
};
