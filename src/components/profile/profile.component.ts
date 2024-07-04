import { CommonModule, NgFor } from '@angular/common';
import { IUser } from '../../app/app.interface';
import { Component, Input, OnInit } from '@angular/core';
import { BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective } from '@spartan-ng/ui-alertdialog-brain';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogOverlayDirective,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';

import { FollowingsService } from '../../app/followings.service';
@Component({
  standalone: true,
  selector: 'profile',
  imports: [
    CommonModule,
    BrnAlertDialogContentDirective,
    BrnAlertDialogTriggerDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogOverlayDirective,
    HlmAlertDialogTitleDirective,
    NgFor,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  constructor(private followingsService: FollowingsService) {}

  @Input() public userData: IUser = {
    avatar_url: '',
    name: '',
    login: '',
    html_url: '',
    public_repos: 0,
    followers: 0,
    following: 0,
  };

  public ngOnInit() {}

  async getFollowings() {
    console.log('this.userData.login', this.userData.login);
    await this.followingsService.handleGetFollowings(this.userData.login);
  }

}
