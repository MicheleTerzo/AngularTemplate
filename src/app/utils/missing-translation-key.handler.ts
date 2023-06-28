import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class MissingTranslationKeyHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    console.warn(`Missing translations: "${params.key}" `);
    return `**MISSING KEY: ${params.key}**`;
  }
}
