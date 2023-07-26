import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-share-box',
  templateUrl: './share-box.component.html',
  styles: [
  ]
})
export class ShareBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;
  
  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';
  
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      this.onDebounce.emit(value) //emitimos el valor del debounce
    });
  }

  ngOnDestroy(): void {
    // console.log('destruido')
    this.debouncerSubscription?.unsubscribe()
  }

  emitValue(value: string):void {
    this.onValue.emit(value)
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm ) //usamos next para hacer la siguiente emision del observable y le enviamos searchTerm
  }

}
