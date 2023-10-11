import { CommentFormComponent } from './../comment-form/comment-form.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = false;
  isReplying = false;

  toggleReplying() {
    this.isReplying = !this.isReplying;
    if (this.isReplying) {
      this.isExpanded = true;
    }
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
