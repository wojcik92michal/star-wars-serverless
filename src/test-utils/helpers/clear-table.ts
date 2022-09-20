import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const clearTable = async (
  tableName: string,
  primaryKeyName: string,
  db: DocumentClient
) => {
  const { Items: items } = await db
    .scan({
      TableName: tableName,
    })
    .promise();

  if (items.length > 0) {
    await db
      .batchWrite({
        RequestItems: {
          [tableName]: items.map((item) => ({
            DeleteRequest: {
              Key: {
                [primaryKeyName]: item[primaryKeyName],
              },
            },
          })),
        },
      })
      .promise();
  }
};
