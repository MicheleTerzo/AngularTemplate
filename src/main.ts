import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {provideRouter} from '@angular/router';
import {MAIN_ROUTES} from './main.routes';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {importProvidersFrom} from '@angular/core';
import {MissingTranslationKeyHandler} from './app/utils/missing-translation-key.handler';
import {HttpBackend, HttpClientModule} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

function HttpLoaderFactory(http: HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

bootstrapApplication(AppComponent, {
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(MAIN_ROUTES),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MissingTranslationKeyHandler
        },
        useDefaultLang: false,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend]
        }
      })
    )
  ]
}).catch((err) => console.error(err));
