import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {

  @Output() private filesChangeEmiter : EventEmitter<FileList> = new EventEmitter();
  
  constructor() { }

  @HostListener('drop', ['$event']) public onDrop(evt){
    console.log('here')
    evt.preventDefault();
    evt.stopPropagation();

    let files = evt.dataTransfer.files;
    if(files.length > 0){
      this.filesChangeEmiter.emit(files);
    }
    console.log('there')
  }
  
}
