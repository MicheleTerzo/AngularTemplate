import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {provideRouter} from '@angular/router';
import {MAIN_ROUTES} from './main.routes';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {APP_INITIALIZER, importProvidersFrom} from '@angular/core';
import {MissingTranslationKeyHandler} from './app/utils/missing-translation-key.handler';
import {HttpBackend, HttpClientModule} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LANGS} from './app/utils/enum';

function HttpLoaderFactory(http: HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

function translateFactory(translate: TranslateService) {
  return async () => {
    translate.setDefaultLang(LANGS.IT);
    translate.use(LANGS.IT);
    return new Promise(resolve => {
      translate.onLangChange.subscribe(() => resolve(() => {
        })
      );
    });
  };
}

bootstrapApplication(AppComponent, {
  providers: [
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
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(MAIN_ROUTES),
    importProvidersFrom(HttpClientModule),
    DialogService,
    MessageService,
    ConfirmationService
  ]
}).catch((err) => console.error(err));
