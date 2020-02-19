import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getExamResultsByPid(pid: string): Observable<Array<any>> {
    const _headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Content-Encoding', 'gzip')

    return this
      .http
      .get(`https://app.magistum.com/api/v1/open_api/exam_result/${pid}`, { headers: _headers })
      .pipe(
        tap(console.log),
        map((response: Array<any>) => response)
      );
  }
}

@Injectable({ providedIn: 'root' })
export class ExamResultListResolver implements Resolve<any> {
  constructor(private resultService: ResultService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.resultService.getExamResultsByPid(route.params.pid).pipe(take(1))
  }
}
