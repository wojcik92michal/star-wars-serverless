export const buildUpdateQuery = (
  data: Record<string, any>,
  expectedUpdateFields: string[]
) => {
  const filteredData = Object.entries(data).filter((item) =>
    expectedUpdateFields.includes(item[0])
  );

  const UpdateExpression = `set ${filteredData
    .map((item) => `${item[0]} = :${item[0]}`)
    .join(",")}`;

  const ExpressionAttributeValues = filteredData.reduce((acc, item) => {
    return {
      ...acc,
      [`:${item[0]}`]: item[1],
    };
  }, {});

  return {
    UpdateExpression,
    ExpressionAttributeValues,
  };
};
