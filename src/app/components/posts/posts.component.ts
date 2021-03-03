import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { StatePipe } from '../../shared/state.pipe';
import { States } from '../../shared/states';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  data;
  enablePostForm: boolean = false;
  authorName: string;
  postDescription: string;
  idPost: string;
  state: number;
  create: boolean = false;
  update: boolean = false;
  states = States;
  keys: any[];
  typeRol: string;

  constructor(private postsService: PostsService,
              private statePipe: StatePipe) {
                this.keys = Object.keys(this.states).filter(Number);
               }

  ngOnInit(): void {    
    this.typeRol = localStorage.getItem('rol');
    this.getPosts(this.typeRol);
  }

  getPosts(rol) {    
    this.postsService.getPosts(rol)  
    .subscribe((data: {}) => {
      this.data = [];
      this.data = data;
      
      console.log(data);
    });
  }

  Edit(itemPost) {
    this.update = true;
    this.create = false;
    this.enablePostForm = !this.enablePostForm;
    this.authorName = itemPost.authorName;
    this.postDescription = itemPost.postDescription;
    this.idPost = itemPost.id;
    this.state = itemPost.state;
  }

  Create() {
    this.update = false;
    this.create = true;
    this.enablePostForm = !this.enablePostForm;
    this.authorName = '';
    this.postDescription = '';
  }

  Delete(itemPost){
    this.idPost = itemPost.id;
    if (window.confirm("Do you really want to delete this Post?")) {
      this.postsService.deletePost(this.idPost).subscribe((data: {}) => {
        window.alert("Post deleted!");
        this.cleanForm();
        this.getPosts(this.typeRol);
      });
    }    
  }

  ChangeState(itemPost){
    this.idPost = itemPost.id;
    var postDB = {
      AuthorName: itemPost.authorName,
      PostDescription : itemPost.postDescription,
      State: Number(((document.getElementById(itemPost.id)) as HTMLSelectElement).value)
    };

    this.postsService.updatePost(this.idPost, postDB)
    .subscribe((data: {}) => {
      window.alert("Post updated!");
      this.cleanForm();
      this.getPosts(this.typeRol);
    });
  }

  SavePost(itemPost) {
    if(this.create){
        var postDB = {
        AuthorName: itemPost.authorName,
        PostDescription : itemPost.postDescription,
        State: 1
      }
      this.postsService.savePosts(postDB)  
      .subscribe((data: {}) => {
        window.alert("Post saved!");
        this.cleanForm();
        this.getPosts(this.typeRol);
      });
    } else if (this.update) {
      this.updatePost(itemPost);
    }
  }

  updatePost(itemPost){
    var postDB = {
      AuthorName: itemPost.authorName,
      PostDescription : itemPost.postDescription,
      State: this.state
    }
    this.postsService.updatePost(this.idPost, postDB)
    .subscribe((data: {}) => {
      window.alert("Post updated!");
      this.cleanForm();
      this.getPosts(this.typeRol);
    });
  }

  cleanForm() {
    this.authorName = '';
    this.postDescription = '';
  }

}
