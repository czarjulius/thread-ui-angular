import { UserService } from './../services/user.service';
import { CommentFormComponent } from './../components/comment-form/comment-form.component';
import { CommentService } from './../services/comment.service';
import { CommentComponent } from './../components/comment/comment.component';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../interfaces/comment.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  userService = inject(UserService);
  comments = signal<Comment[]>([]);
  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComment().subscribe((comments) => {
      return this.comments.set(comments);
    });
  }

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService
      .createComment({
        text,
        userId: user._id,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }

  commentTrackerBy(_index: number, comment: Comment) {
    return comment._id;
  }
}
