import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AbstractControl, NgControl} from '@angular/forms';

enum PRIMENG_NODE_NAMES {
  RADIOBUTTON = 'P-RADIOBUTTON'
}

@Directive({
  selector: '[appMarkIfMandatory]',
  standalone: true
})
export class MandatoryFieldDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private control: NgControl) {
  }

  ngOnInit(): void {
    this.checkControlValidator();
    this.control.statusChanges?.pipe(takeUntil(this.destroy))
      .subscribe(() => this.checkControlValidator());
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private checkControlValidator(): void {
    const control = this.control.control;
    const validator = control?.validator?.({} as AbstractControl);
    const labelElement = this.getLabelElement();
    if (control?.errors?.['atleastOneElementRequired'] || (validator && validator['required']) && !control?.disabled) {
      this.renderer.addClass(labelElement, 'required-field');
    }
    else {
      this.renderer.removeClass(labelElement, 'required-field');
    }
  }

  private getLabelElement(): HTMLCollectionOf<Element> {
    const nativeElement = this.el.nativeElement;
    if (nativeElement.nodeName === PRIMENG_NODE_NAMES.RADIOBUTTON) {
      return this.el.nativeElement.parentElement.parentElement.getElementsByTagName('label')[0];
    }
    const labelElement = nativeElement.parentElement.getElementsByTagName('label')[0];
    if (!labelElement) {
      return nativeElement.parentElement.parentElement.getElementsByTagName('label')[0];
    }
    return labelElement;
  }
}
