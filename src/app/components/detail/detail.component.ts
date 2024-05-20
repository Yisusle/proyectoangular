import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [ProjectService]
})
export class DetailComponent implements OnInit{
  public url: string;
  public project: Project | any;
  public confirm: Boolean = false;

  constructor(
    private _projecService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ){ 
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
    this._projecService.getProject(id).subscribe( response => {
      this.project = response.project;
    }, error => {
      console.log(<any>error);
    })

  }

  //Borrar Confirm
  setConfirm(confirm:boolean){
    this.confirm = confirm
  }

//borrar vista definitivamente
  deleteProject(id:any){
    this._projecService.deleteProject(id).subscribe(response =>{
      if(response.project){
        this._router.navigate(['/proyectos']);
      }
    }, error => {
      console.log(<any>error);
    });
  }

}
