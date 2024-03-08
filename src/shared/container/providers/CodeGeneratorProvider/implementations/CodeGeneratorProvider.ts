import { v4 } from 'uuid';
import ICodeGeneratorProvider from '../models/ICodeGeneratorProvider';

class CodeGeneratorProvider implements ICodeGeneratorProvider {
  private nanoid: () => string;

  constructor() {
    this.nanoid = (() => v4());
  }

  generate(): string {
    return this.nanoid();
  }
}

export default CodeGeneratorProvider;
