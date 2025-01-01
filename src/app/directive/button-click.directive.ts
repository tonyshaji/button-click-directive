import { Directive, ElementRef, Input } from '@angular/core';
import { EMPTY, exhaustMap, finalize, fromEvent, isObservable, Observable, of, Subscription, take } from 'rxjs';

export type ButtonHandler = (
  e?: MouseEvent
) => Observable<unknown> | Promise<unknown>;

const defaultHandler: ButtonHandler = (e) => EMPTY;
@Directive({
  selector: 'button[save-btn]',
  exportAs: 'saveBtn',
  host: {
    '[disabled]': ' _processing',
    '[class.loading]': '_processing',
  },
})
export class ButtonClickDirective {

  private _processing = false;
  private _sub = Subscription.EMPTY;

  // @Input()
  // disableWhenProcessing = true;

  @Input()
  handler: ButtonHandler = defaultHandler;

  get processing(): boolean {
    return this._processing;
  }

  constructor(private readonly btnElement: ElementRef<HTMLButtonElement>) {}

  ngAfterViewInit() {
    this._sub = fromEvent<MouseEvent>(this.btnElement.nativeElement, 'click')
      .pipe(exhaustMap((e) => this.wrapHandlerInObservable(e)))
      .subscribe();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private wrapHandlerInObservable(e: MouseEvent) {
    this._processing = true;
    const handleResult = this.handler(e);
    let obs: Observable<unknown>;
    if (isObservable(handleResult)) {
      obs = handleResult;
    } else {
      obs = of(handleResult);
    }
    return obs.pipe(
      take(1),
      finalize(() => (this._processing = false))
    );
  }

}
