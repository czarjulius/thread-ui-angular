import { CommentService } from './../../services/comment.service';
import { CommentFormComponent } from './../comment-form/comment-form.component';
import { Component, Input, effect, inject, signal } from '@angular/core';
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
  isExpanded = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComment(this.comment._id).subscribe((comments) => {
        this.nestedComments.set(comments);
      });
    }
  });

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }
  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }
}
