import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit{
  //De padre  a hijo
  public widthSlider: number | undefined;
  public anchuraToSlider: number | undefined;
  public captions: boolean | undefined;

  public autor: any ={};

  @ViewChild('textos') textos:any;

  constructor(){
    this.captions = true;
  }
  

  ngOnInit() {

    /*const elemento = document.querySelector('#texto');
      if (elemento !== null) {
        const alerta = elemento.innerHTML;
        alert(alerta);
      } else {
        console.error('El elemento con ID "texto" no se encontró en el DOM.');
      }*/
  }

  ngAfterViewInit(){
    //Con viewchild
    alert(this.textos.nativeElement.textContent);
  }
  
  cargarSlider(){
    this.borrarSlider();
    this.anchuraToSlider = this.widthSlider;
  }

  borrarSlider(){
    this.anchuraToSlider = undefined;
  }

  getAutor(event:any){
    this.autor = event;
  }

}
