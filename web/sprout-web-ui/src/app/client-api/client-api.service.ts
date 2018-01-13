import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface SproutApi {
  http: HttpClient;
  route: ActivatedRoute;
  router: Router;
  zone: NgZone;
  toast(options: any);
  navigate(options: any);
}

@Injectable()
export class ClientApiService implements SproutApi {

  toastSubject = new BehaviorSubject<any>(null);

  toast(options) {
    this.zone.run(() => this.toastSubject.next(options));
  }

  navigate(options: any) {
    this.zone.run(() => {
      this.router.navigate(options);
    });
  }

  get http() {
    return this._http;
  }

  get route() {
    return this._route;
  }

  get router() {
    return this._router;
  }

  get zone() {
    return this._zone;
  }

  constructor(
    private _http: HttpClient,
    private _zone: NgZone,
    private _route: ActivatedRoute,
    private _router: Router) {}

}
