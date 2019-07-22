import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild('nav') nav: ElementRef;
  hover = false;
  fixed = false;

  constructor() {}

  ngOnInit() {}

  @HostListener('mouseover')
  onMouseOver() {
    if (window.scrollY === 0) {
      this.hover = !this.hover;
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (window.scrollY === 0) {
      this.hover = !this.hover;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (window.scrollY === 0) {
      this.hover = false;
      this.fixed = false;
    } else {
      this.hover = true;
      this.fixed = true;
    }
  }
}
