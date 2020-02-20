import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, iif, of, Subscription } from 'rxjs';
import { ResultService } from './result.service';
import { tap, flatMap, map, share } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnDestroy {

  pid = new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
  loading$: Subject<null | true> = new Subject();
  exam$: Subject<null | true> = new Subject();
  submit: EventEmitter<string> = new EventEmitter();
  result$ = this.submit.pipe(
    tap(() => this.loading$.next(true)),
    tap(() => this.exam$.next(null)),
    flatMap(pid => iif(
      () => !!pid,
      this.resultService.getExamResultsByPid(pid).pipe(
        map(r => r.success && r.data ? r.data : null),
        tap(data => {
          if (!data) {
            this.message.create('warning', `Sonuç bulunamadı...`);
          } else {
            setTimeout(() => {
              this.exam$.next(data[0])
            }, 80);
          }
        }),
        share()
      ),
      of(null)
    )),
    tap(() => this.loading$.next(null)),
  );
  subscriptions: Array<Subscription> = [];
  constructor(
    private resultService: ResultService,
    private message: NzMessageService) {
    this.subscriptions.push(this.exam$.subscribe(() => {
      const elId = `result-detail`;
      setTimeout(() => {
        if (window.document.getElementById(elId)) {
          const el: HTMLElement = window.document.getElementById(elId);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
