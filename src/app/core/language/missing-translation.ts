import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppMissingTranslationHandler implements MissingTranslationHandler {

    constructor() { }

    handle(params: MissingTranslationHandlerParams) {
        const key = params.key;
        console.log(`${key} is not translated!`);
        return `translation-not-found[${key}]`;
    }
}
