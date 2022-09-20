/**
 * Replaces fields that might have random values (e.g. ids) with some const
 * e.g. {"id": "123456"} will be changed to {"id": "__id__"}
 *
 * TODO: formatting could use some improvement.
 */

const fieldsToBeReplaced = ["id", "nextId"];

const serializer = {
  test: (value) => {
    return value && fieldsToBeReplaced.some((field) => Boolean(value[field]));
  },
  print: (value, serialize, indent) => {
    const content = [
      ...Object.entries(value).map(([key, item]) => {
        return fieldsToBeReplaced.includes(key)
          ? `"${key}": __${key}__`
          : `"${key}": ${serialize(item)}`;
      }),
    ].join("\n");
    return `Object {
   ${indent(content)}
   }`;
  },
};

module.exports = serializer;
