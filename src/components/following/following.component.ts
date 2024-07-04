import { Component, OnInit, Input } from '@angular/core';
import { IFollowing } from '../../app/app.interface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'following',
  templateUrl: './following.component.html',
  imports: [CommonModule],
})
export class FollowingComponent implements OnInit {

  @Input() public followingData: IFollowing[] = [];

  public ngOnInit() {}

}
