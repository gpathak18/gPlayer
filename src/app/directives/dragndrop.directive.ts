import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {

  @Output() private filesChangeEmiter : EventEmitter<FileList> = new EventEmitter();
  
  constructor() { }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    // this.background = '#eee';
    let files = evt.dataTransfer.files;
    if(files.length > 0){
      this.filesChangeEmiter.emit(files);
    }
  }

}
