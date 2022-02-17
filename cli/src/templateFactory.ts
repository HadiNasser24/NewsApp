import * as Templates from './templates';
import { CONFIG } from './cliconfig';
import { writeFile, appendToFile, insertInFile } from './utils/fileSystem';

const templateFactory = (promptDetails: PromptDetails) => {
  if (
    promptDetails.path.length > 0 &&
    promptDetails.path[promptDetails.path.length - 1] !== '/'
  ) {
    promptDetails.path += '/';
  }
  switch (promptDetails.template) {
    case 'styled':
      createCss(promptDetails.name, promptDetails.path);
      return;
    case 'jsx':
      createJsx(promptDetails.name, promptDetails.path);
      return;
    case 'feature':
      createFeature(promptDetails.name, promptDetails.path);
      return;
    default:
      return;
  }
};

const createCss = (name: string, path: string) => {
  writeFile(
    name + CONFIG.jsxStyledExt,
    CONFIG.reusableComponentsDefaultPath + path,
    Templates.cssTemplate(name),
  );
};

const createJsx = (name: string, path: string) => {
  writeFile(
    name + CONFIG.jsxStyledExt,
    CONFIG.reusableComponentsDefaultPath + path,
    Templates.jsxTemplate(name),
  );
};

const createFeature = (name: string, path: string) => {
  writeFile(
    name + CONFIG.componentExt,
    CONFIG.featureDefaultPath + path,
    Templates.createFeatureTemplate(name).componentTemplate,
  );
  writeFile(
    name + CONFIG.sliceExt,
    CONFIG.featureDefaultPath + path,
    Templates.createFeatureTemplate(name).sliceTemplate,
  );
  writeFile(
    name + CONFIG.i18Ext,
    CONFIG.featureDefaultPath + path,
    Templates.createFeatureTemplate(name).i18nTemplate,
  );
  writeFile(
    name + CONFIG.typeExt,
    CONFIG.featureDefaultPath + path,
    Templates.createFeatureTemplate(name).typeTemplate,
  );
  manageLocalsFs(name, path);
  manageReduxFs(name, path);
};

const manageLocalsFs = (name: string, path: string) => {
  const newPath = path[path.length - 1] === '/' ? path : path + '/';
  for (let i = 0; i < CONFIG.i18nLangs.length; i++) {
    const fileName = CONFIG.i18nLangs[i] + '.ts';
    try {
      const content = `import { ${name}NameSpace } from '${CONFIG.featurePathAlias}${newPath}${name}.i18n';`;
      appendToFile(fileName, CONFIG.i18nPath, content);
      insertInFile(
        fileName,
        CONFIG.i18nPath,
        `  ${name}: ${name}NameSpace.${CONFIG.i18nLangs[i]},`,
        CONFIG.i18nToken,
      );
    } catch (e) {
      writeFile(
        fileName,
        CONFIG.i18nPath,
        Templates.localsTemplate(CONFIG.i18nLangs[i]),
      );
      const content = `import { ${name}NameSpace } from '${CONFIG.featurePathAlias}${newPath}${name}.i18n';`;
      appendToFile(fileName, CONFIG.i18nPath, content);
      insertInFile(
        fileName,
        CONFIG.i18nPath,
        `${name}: ${name}NameSpace`,
        CONFIG.i18nToken,
      );
    }
  }
};

const manageReduxFs = (name: string, path: string) => {
  const newPath = path[path.length - 1] === '/' ? path : path + '/';
  insertInFile(
    CONFIG.reduxRootReducerFileName,
    CONFIG.reduxRootReducerPath,
    `import { ${name}Reducer } from '${CONFIG.featurePathAlias}${newPath}${name}.slice';`,
    CONFIG.reducersImportToken,
  );
  insertInFile(
    CONFIG.reduxRootReducerFileName,
    CONFIG.reduxRootReducerPath,
    `  ${name}: ${name}Reducer,`,
    CONFIG.reducersToken,
  );
};

export { templateFactory };
