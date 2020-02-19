import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  getExamResultsByPid(pid: string): Observable<any> {
    const _headers = new HttpHeaders()
      .append('Access-Control-Allow-Origin', '*')
    return this
      .http
      .get(`${environment.api_url}open_api/exam_result/${pid}`, { headers: _headers });
  }
}

@Injectable({ providedIn: 'root' })
export class ExamResultListResolver implements Resolve<any> {
  constructor(private resultService: ResultService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.resultService.getExamResultsByPid(route.params.pid).pipe(take(1))
  }
}
