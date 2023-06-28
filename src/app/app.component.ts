import {Component, inject, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {PRIMENG_GLOBAL_TRANSLATIONS} from './utils/constants';
import {TranslateService} from '@ngx-translate/core';
import {firstValueFrom} from 'rxjs';
import {RouterOutlet} from '@angular/router';
import {LANGS} from './utils/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {
  private readonly _primeNgConfig = inject(PrimeNGConfig);
  private readonly _translateService = inject(TranslateService);

  constructor() {
    this._translateService.setDefaultLang(LANGS.IT);
    this._translateService.use(LANGS.IT);
  }

  ngOnInit() {
    this.initConfig().then();
  }

  private async initConfig() {
    this._primeNgConfig.ripple = true;
    const get$ = this._translateService.get(PRIMENG_GLOBAL_TRANSLATIONS);
    const translation = await firstValueFrom(get$);
    this._primeNgConfig.setTranslation(translation);
  }
}
