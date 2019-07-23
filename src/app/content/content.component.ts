import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @ViewChild('polylineXS') polylineXS: ElementRef;
  @ViewChild('polylineSM') polylineSM: ElementRef;
  @ViewChild('polylineMD') polylineMD: ElementRef;
  @ViewChild('polylineLG') polylineLG: ElementRef;
  polylineXSvisible = false;
  polylineSMvisible = false;
  polylineMDvisible = false;
  polylineLGvisible = false;
  translateX = '';
  translate = '';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    if (window.innerWidth >= 1220) {
      this.polylineLGvisible = true;
      this.translateX = (-(2600 - 747)).toString();
      const translate = `translate(${this.translateX}, 0)`;
      console.log(this.translateX);
      this.translate = translate;
    } else {
      this.polylineMDvisible = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 1220) {
      const translate = `translate(${this.translateX + 0.5}, 0)`;
      this.translate = translate;
      this.polylineLG.nativeElement.style.transform = this.translate;
    }
  }
}
