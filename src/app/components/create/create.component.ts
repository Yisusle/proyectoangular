import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { uploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService, uploadService]
})
export class CreateComponent implements OnInit{
  
public title: String;
public project: Project;
public save_project: any;
public status: boolean | undefined;
public filesToUpload: Array<File> = [];
public url: String;

  constructor(
    private _projectService: ProjectService,
    private _uploadServeice: uploadService

  ) {
    this.title = "Crear Proyecto";
    this.project = new Project('','','','',2024,'','');
    this.url = Global.url;
  }

  ngOnInit() {
    
  }

  //Guardar Datos
  onSubmit(form:any){
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response => {
        console.log(response);

        if(response.project){
          
          //Subir Imagen
          if(this.filesToUpload.length>=1){
          this._uploadServeice.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any) =>{
            console.log(result);
            
            this.save_project =result.project;

            this.status = true;

            //Vaciar el form despues de subir
            form.reset();
            let inputFile: HTMLInputElement | null = document.querySelector('input[type="file"]');
            if (inputFile !== null) {
              inputFile.value = '';
            }
          });
          }else{
            this.save_project =response.project;
            this.status = true;
            //Vaciar el form despues de subir
            form.reset();
            let inputFile: HTMLInputElement | null = document.querySelector('input[type="file"]');
            if (inputFile !== null) {
              inputFile.value = '';
            }
          }
        }else{
          this.status = false;
        }
      },error =>{
        console.log(<any>error);
      }
    );
  }
//
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
