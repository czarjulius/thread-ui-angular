import { CommentService } from './../services/comment.service';
import { CommentComponent } from './../components/comment/comment.component';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../interfaces/comment.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComment().subscribe((comments) => {
      return this.comments.set(comments);
    });
  }
}
