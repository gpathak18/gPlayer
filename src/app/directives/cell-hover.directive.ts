import { Directive } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';

@Directive({
  selector: '[cellHover]'
})
export class CellHoverDirective {

  private el: HTMLElement;
  private isSelected: boolean = false;

  @Input() defaultColor: string;
  @Input() selectColor: string;
  @Input('cellHover') hoverColor: string;
  
  @Input() selectedRowIndex: number = -1;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  // @HostListener('mouseenter') onMouseEnter() {
  //     this.highlight(this.hoverColor || this.defaultColor || 'white');      
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //     this.highlight(null);
  // }

  // @HostListener('click', ['$event']) onClick($event) {
  //   this.el.style.backgroundColor =  '#ffd561';
  //   // console.log(this.el.style.backgroundColor)
    
  // }

  private highlight(color: string) {
      this.el.style.backgroundColor = color;      
  }

}
