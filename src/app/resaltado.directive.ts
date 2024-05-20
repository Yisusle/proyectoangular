import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective implements OnInit{

  constructor(public el:ElementRef) {
  }

  ngOnInit(){
    console.log(this.el.nativeElement);
    let element = this.el.nativeElement;
    element.style.background = "blue";
    element.style.color = "white";
    element.style.padding = "20px";
    element.style.marginTop = "15px";

    console.log(element.innerHTML);
    
    element.innerText = element.innerText.toUpperCase();

  }
}
