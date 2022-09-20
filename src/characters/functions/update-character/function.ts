import { handlerPath } from "@app/helpers";

export const updateCharacter = {
  handler: `${handlerPath(__dirname)}/handler.updateCharacter`,
  events: [
    {
      http: {
        method: "put",
        path: "character/{id}",
        bodyType: "UpdateCharacterDto",
        responseData: {
          200: {
            description: "Character created successfully",
            bodyType: "GetCharacterDto",
          },
          404: {
            description: "Character not found",
          },
          500: {
            description: "Unexpected error appeared",
          },
        },
      },
    },
  ],
};
