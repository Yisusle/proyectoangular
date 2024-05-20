import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { event } from 'jquery';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {

  @Input() anchura: number | undefined;
  @Input('etiquetas') captions: boolean | undefined;

  @Output() conseguirautor = new EventEmitter;

  public autor:any;

    constructor(){

      this.autor = {
        nombre: "Jesus Leyva",
        website: "jesusleyva.infinityfreeapp.com",
        linkedin: "/jesusleyva00"
      };

    }
    
    ngOnInit () {
      const captions = this.captions;
      const anchura = this.anchura;

      $("#logo").click(function(e){
        e.preventDefault();
        $("header").css("background-color", "green").css("height","89px");
  
      });
  
      $(function(){
        
        $('.galeria').bxSlider({
          mode: 'fade',
          captions: captions,
          slideWidth: anchura
          //slideHeight: 600
        });
      });

      $(".slider").css("padding-left","40%").css("text-align","center");

      //Lanzar evento
      //this.conseguirautor.emit(this.autor);
    } 
    //De hijos a padres
    lanzar(event:any){
      console.log(event);
      this.conseguirautor.emit(this.autor);
    }  
}