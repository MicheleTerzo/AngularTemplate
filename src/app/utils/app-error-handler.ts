import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, inject, Injectable, NgZone} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {MESSAGE_KEYS, MESSAGE_TYPES} from './enum';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private readonly ngZone = inject(NgZone);
  private readonly messageService = inject(MessageService);
  private readonly translateService = inject(TranslateService);

  public handleError(error: Error | HttpErrorResponse | any): void {
    console.error(error);
    if (!(error.rejection instanceof HttpErrorResponse)) {
      this.handleErrorError(error as Error);
    }
  }

  private handleErrorError(error: Error): void {
    this.ngZone.run(() => {
      this.messageService.add({
        severity: MESSAGE_TYPES.ERROR,
        key: MESSAGE_KEYS.APP_NOTIFICATIONS,
        summary: this.translateService.instant('Application error'),
        detail: error.message.length > 100 ? error.message.slice(0, 100) + '...' : error.message
      });
    });
  }
}
