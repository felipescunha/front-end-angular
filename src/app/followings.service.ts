import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFollowing } from './app.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingsService {

  constructor(public readonly httpService: HttpClient) { }
  private followingData$$: BehaviorSubject<IFollowing[]> = new BehaviorSubject<IFollowing[]>([]);

  public followingData$: Observable<IFollowing[]> = this.followingData$$.asObservable();

  public handleGetFollowings(username: string,) {
    this.httpService
      .get(`http://127.0.0.1:8000/api/github/user/${username}/following`)
      .subscribe((data: any) => {
        this.followingData$$.next(data);
      });
  }
}
