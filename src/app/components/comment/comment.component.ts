import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  isExpanded = false;
  isReplying = false;

  toggleReplying() {
    this.isReplying = !this.isReplying;
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
