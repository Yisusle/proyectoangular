import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { Global } from "./global";

@Injectable()
export class ProjectService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el Servicio de Angular';
    }

    //Guardar
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'save-project', params, {headers: headers});
    }

    //Listar
    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'projects', {headers: headers});
    }

    //obtener 1 proyecto
    getProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'project/'+id, {headers: headers});
    }

    //Borrar Proyecto
    deleteProject(id:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'project/'+id, {headers: headers});
    }

    //Editar Proyecto
    updateProject(project:any):Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.put(this.url+'project/'+project._id, params, {headers: headers});
    }
}