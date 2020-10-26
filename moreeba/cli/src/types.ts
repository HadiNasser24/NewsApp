interface ContainerOptions {
  withRedux?: boolean;
  withMemo?: boolean;
  withComponent?: boolean;
}

type TemplateType = 'styled' | 'jsx' | 'feature';

interface PromptDetails {
  template: TemplateType;
  name: string;
  path: string;
  addons?: string[];
}
