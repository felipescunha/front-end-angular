import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FollowingComponent } from '../components/following/following.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { IFollowing } from './app.interface';
import { IUser } from './app.interface';

import { FollowingsService } from './followings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    FollowingComponent,
    ProfileComponent,
    CommonModule,
    NgFor,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private followingsService: FollowingsService,
    public readonly httpService: HttpClient
  ) {
    this.followingsService.followingData$.subscribe((data) => {
      this.followingData = data;
    });
  }

  username = '';
  userData: IUser = {
    avatar_url: '',
    name: '',
    login: '',
    html_url: '',
    public_repos: 0,
    followers: 0,
    following: 0,
  };

  followingData: IFollowing[] = [];

  public ngOnInit() {
    if (window.location.pathname !== '/') {
      this.username = window.location.pathname.replace('/', '');
      this.handleGetProfiles();
    }
  }

  public handleGetProfiles() {
    this.followingData = [];
    this.httpService
      .get(`http://127.0.0.1:8000/api/github/user/${this.username}`)
      .subscribe((data: any) => {
        console.log('usuário', data);
        this.userData = data;
      });
  }

  public handleChangeUsername(event: any) {
    this.username = event.target.value;
    window.history.pushState({}, '', `/${this.username}`);
  }

  public handleClearState() {
    this.followingData = [];
    this.userData = {
      avatar_url: '',
      name: '',
      login: '',
      html_url: '',
      public_repos: 0,
      followers: 0,
      following: 0,
    };
    this.username = '';
  }
}
