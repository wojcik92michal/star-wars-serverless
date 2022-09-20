import { handlerPath } from "@app/helpers";

export const deleteCharacter = {
  handler: `${handlerPath(__dirname)}/handler.deleteCharacter`,
  events: [
    {
      http: {
        method: "delete",
        path: "character/{id}",
        responseData: {
          204: {
            description: "Character deleted successfully",
          },
          404: {
            description: "Character not found",
          },
        },
      },
    },
  ],
};
