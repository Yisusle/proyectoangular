import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit{
  public projects: Project[] | undefined;
  public url: string;

  constructor(
    private _projectService: ProjectService
  ){
    this.url = Global.url;
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      Response =>{
        console.log(Response);
        if(Response.projects){
          this.projects = Response.projects;
        }
      },error => {
        console.log(<any>error);
      }
    );
  }
}
