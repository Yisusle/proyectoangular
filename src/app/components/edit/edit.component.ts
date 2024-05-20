import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { uploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrl: './edit.component.css',
  providers: [ProjectService, uploadService]
})
export class EditComponent implements OnInit {

public title: String;
public project: Project | undefined;
public save_project: any;
public status: boolean | undefined;
public filesToUpload: Array<File> = [];
public url: String;

  constructor(
    private _projectService: ProjectService,
    private _uploadServeice: uploadService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {
    this.title = "Editar Proyecto";
    this.url = Global.url;
  }

  ngOnInit() {
    
    this._route.params.subscribe(params => {
      let id = params['id'];

      this.getProject(id);
    });

  }
  //mostar proyecto vista
  getProject(id: any){
    this._projectService.getProject(id).subscribe( response => {
      this.project = response.project;
    }, error => {
      console.log(<any>error);
    });

  }

  //Para editar
  onSubmit(form:any){
    this._projectService.updateProject(this.project).subscribe(response => {
      
      
      if(response.project){
        
        //Subir Imagen
      if(this.filesToUpload.length>=1){
          this._uploadServeice.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any) =>{
            console.log(result);
            
            this.save_project =result.project;
    
            this.status = true;
            
            let inputFile: HTMLInputElement | null = document.querySelector('input[type="file"]');
            if (inputFile !== null) {
              inputFile.value = '';
            }
          });
      }else{
        this.save_project =response.project;
    
            this.status = true;
      }
    }else{
      this.status = false;
    }
    }, error => {
      console.log(<any>error);
      });
  }

  //
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
