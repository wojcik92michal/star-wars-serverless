import { glob } from "glob";
import * as fs from "fs";

// why this file was added?
// serverless-auto-swagger does not allow to find files with types by pattern (e.g. *.dto.ts)...
// so instead of writing it manually, it is better to generate them

const findAllDtoFiles = async () => {
  return new Promise<string[]>((resolve, reject) => {
    const path = `${__dirname}/../**/*.dto.ts`;
    glob(path, {}, (err, files) => {
      if (err) {
        reject(err);
      }

      if (files) {
        resolve(files);
      }
    });
  });
};

const generateFileContent = (files: string[]) => {
  console.log();
  const content = `
    export const swaggerDefinitions = ${JSON.stringify(files)};
  `;

  return content;
};

const saveToFile = async (content: string) => {
  await fs.writeFileSync("swagger-types.ts", content);
};

findAllDtoFiles().then((files) => {
  const content = generateFileContent(files);
  return saveToFile(content);
});
