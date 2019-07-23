import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
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
  innerWidth = 0;
  translateX = '';
  translate = '';

  constructor() {}

  ngOnInit() {
    if (window.innerWidth >= 1220) {
      this.polylineLGvisible = true;
      this.translateX = (-(2600 - 747)).toString();
      const translate = `translate(${this.translateX}, 0)`;
      this.translate = translate;
      this.innerWidth = window.innerWidth;
    } else {
      this.polylineMDvisible = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(this.polylineLG.nativeElement.getBoundingClientRect());
    // console.log(this.translate);
    if (window.innerWidth >= 1220) {
      if (window.innerWidth > this.innerWidth) {
        this.translateX = (
          parseFloat(this.translateX) +
          (window.innerWidth - this.innerWidth)
        ).toString();
        const translate = `translate(${this.translateX})`;
        this.translate = translate;
        this.innerWidth = window.innerWidth;
      } else {
        this.translateX = (
          parseFloat(this.translateX) +
          (window.innerWidth - this.innerWidth)
        ).toString();
        const translate = `translate(${this.translateX})`;
        this.translate = translate;
        this.innerWidth = window.innerWidth;
      }
    }
    // console.log(this.translate + '-');
  }
}
