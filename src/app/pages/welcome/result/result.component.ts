import { Component, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, iif, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from './result.service';
import { tap, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  pid = new FormControl(this.route.snapshot.params.pid || null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
  loading$: Subject<null | true> = new Subject();
  submit: EventEmitter<string> = new EventEmitter();
  result$ = this.submit.pipe(
    tap(() => this.loading$.next(true)),
    flatMap(pid => iif(
      () => !!pid,
      this.resultService.getExamResultsByPid(pid),
      of(null)
    )),
    tap(() => this.loading$.next(null)),
  );
  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService) { }
}
