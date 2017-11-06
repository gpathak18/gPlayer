import { Directive, HostListener, ElementRef, Input, Renderer, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[onClickToggle]'
})
export class OnClickToggleDirective {
  
  @Output() toggleSelectionEvent:EventEmitter<any> = new EventEmitter();
  
  @Input('cellHover') hoverColor: string;

  private el: HTMLElement;
  
    constructor(el: ElementRef, private renderer: Renderer) {
        this.el = el.nativeElement;
    }
  
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('pink');      
    }
  
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }
  
    @HostListener('click', ['$event']) onClick($event) {
      this.toggleSelectionEvent.emit(this.el);
      // this.renderer.setElementStyle(this.el, 'backgroundColor', 'gray');
    }
  
    private highlight(color: string) {
      this.renderer.setElementStyle(this.el, 'color', color);
    }

}
