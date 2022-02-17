import { mkdirSync, createWriteStream, readFileSync, writeFileSync } from 'fs';
import { CONFIG } from '../cliconfig';

export const writeFile = (name: string, path: string, content: string) => {
  const nameAndPath = path + name;
  mkdirSync(path, {
    recursive: true,
  });
  const writeStream = createWriteStream(nameAndPath);
  writeStream.write(content);
  writeStream.close();
};

export const appendToFile = (name: string, path: string, content: string) => {
  const nameAndPath = path + name;
  const fileContent = readFileSync(nameAndPath).toString().split('\n');
  fileContent.unshift(content);
  writeFileSync(nameAndPath, fileContent.join('\n'));
};

export const insertInFile = (
  name: string,
  path: string,
  content: string,
  token: string,
) => {
  const nameAndPath = path + name;
  const fileContent = readFileSync(nameAndPath).toString().split('\n');
  const index = fileContent.findIndex((iter) => iter.includes(token));
  if (index !== -1) {
    fileContent.splice(index + 1, 0, content);
  }
  writeFileSync(nameAndPath, fileContent.join('\n'));
};
