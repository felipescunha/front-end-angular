import { Component, OnInit } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ProfileComponent } from '../components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IUser } from './app.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmInputDirective,
    ProfileComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
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

  constructor(
    public readonly httpService: HttpClient
  ) {}

  public ngOnInit() {
    if (window.location.pathname !== '/') {
      this.username = window.location.pathname.replace('/', '');
      this.handleGetProfiles();
    }
  }

  public handleGetProfiles() {
    this.httpService
      .get(`http://127.0.0.1:8000/api/github/user/${this.username}`)
      .subscribe((data: any) => {
        console.log("usuário", data);
        this.userData = data;
      });
  }

  public changeUsername(event: any) {
    this.username = event.target.value;
    window.history.pushState({}, '', `/${this.username}`);
  }

  public clearState() {
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
