// import { clearInterval } from 'timers-browsersify';
import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  stagger,
  query
  // ...
} from '@angular/animations';

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
  @ViewChild('panelBody') panelBody: ElementRef;
  polylineXSvisible = false;
  polylineSMvisible = false;
  polylineMDvisible = false;
  polylineLGvisible = false;

  maxTime = 4;
  time = 0;
  timerStarted = false;
  timerDone = false;
  intervalTimer: any;

  translateX = '';
  translate = '';
  registeredMax = 140;
  registeredStart = 0;
  registerIntervalTime = (this.maxTime * 1000) / this.registeredMax;
  registerInterval: any;
  accountingMax = 13;
  accountingStart = 0;
  accountingIntervalTime = (this.maxTime * 1000) / this.accountingMax;
  accountingInterval: any;
  declarationMax = 197;
  declarationStart = 0;
  declarationIntervalTime = (this.maxTime * 1000) / this.declarationMax;
  declarationInterval: any;
  invoiceMax = 19;
  invoiceStart = 0;
  invoiceIntervalTime = (this.maxTime * 1000) / this.invoiceMax;
  invoiceInterval: any;

  opinionIdPressed = 1;
  opinions: { id: number; text: string; author: string }[] = [
    {
      id: 1,
      text:
        // tslint:disable-next-line: max-line-length
        'Główną zaletą systemu jest łatwy i przejrzysty panel klienta. Posługiwanie się nim nie sprawi zatem absolutnie żadnych problemów nawet największemu laikowi komputerowemu. Intuicyjne przejścia i estetyczny wygląd tylko ułatwiają użytkowanie. ',
      author: 'Justyna'
    },
    {
      id: 2,
      text:
        // tslint:disable-next-line: max-line-length
        'Program umożliwia mi przede wszystkim szybki dostęp do finansów firmy z każdego miejsca, w którym się znajduję. Dzięki temu mogę na bieżąco mieć wgląd w księgowość, a opieka ze strony ekspertów zapewnia dodatkowe poczucie bezpieczeństwa i spokoju.',
      author: 'Paweł'
    },
    {
      id: 3,
      text:
        // tslint:disable-next-line: max-line-length
        'Do tej pory księgowość była dla mnie wyzwaniem, jednak z systemem wFirma.pl jest to dużo prostsze niż wcześniej. Panel jest prosty w obsłudze, a w przypadku pytań mogę od razu skonsultować się z ekspertem. ',
      author: 'Dariusz'
    }
  ];

  managerChosen = 1;
  managers: {
    id: number;
    name;
    text: string;
    position: string;
    photo: string;
    sign: string;
  }[] = [
    {
      id: 1,
      name: 'Angelika Borowska',
      text: `Stale wspieramy naszych klientów poprzez indywidualne podejście
    do każdej sprawy. Do tej pory udzieliliśmy ponad 40 000 porad z
    zakresu księgowości, podatków, kadr i prawa gospodarczego.
    Dostarczamy niezbędną wiedzę, która bezpośrednio przekłada się
    na efektywne zarządzanie firmą.`,
      position: 'Kierownik Biura Obsługi Klienta',
      photo: '/assets/managers/bok.png',
      sign: '/assets/managers/bok-sign.png'
    },
    {
      id: 2,
      name: 'Bartłomiej Lazarowicz',
      text: `Dbamy o dostarczanie najwyższej jakości kompleksowego narzędzia
      do prowadzenia księgowości firmy. Przestrzegamy, aby wszystkie
      procesy, odbywające się w ramach modyfikacji systemu,
      przeprowadzane były zgodnie z polityką jakości ISO 9001.`,
      position: 'Kierownik Działu Jakości',
      photo: '/assets/managers/quality.png',
      sign: '/assets/managers/quality-sign.svg'
    },
    {
      id: 3,
      name: 'Beata Kostrzycka',
      text: `Zapewniamy innowacyjność serwisu popartą wieloletnim
      doświadczeniem w branży księgowości i zarządzania biznesem. Cały
      czas monitorujemy zmiany oraz trendy zachodzące w sposobie
      prowadzenia i rozwijania firmy.`,
      position: 'Kierownik Działu Rozwoju',
      photo: '/assets/managers/development.png',
      sign: '/assets/managers/quality-sign.svg'
    },
    {
      id: 4,
      name: 'Ewa Szpytko-Waszczyszyn',
      text: `Zapewniamy regularne aktualizacje systemu, które odpowiadają na
      potrzeby naszych klientów i są zgodne z obowiązującym stanem
      prawnym. Gwarantujemy bezpieczeństwo korzystania z serwisu, nad
      którym nieustannie czuwają eksperci z zakresu prawa.`,
      position: 'Kierownik Działu Prawnego',
      photo: '/assets/managers/legal.png',
      sign: '/assets/managers/legal-sign.svg'
    }
  ];

  managerVisible = true;

  constructor() {}

  ngOnInit() {
    if (window.innerWidth >= 1200) {
      this.polylineLGvisible = true;
      this.polylineMDvisible = false;
      this.setTranslate('2600');
    } else {
      this.polylineMDvisible = false;
      this.polylineMDvisible = true;
      this.setTranslate('600');
    }
  }

  setTranslate(width: string) {
    this.translateX = (-(
      parseFloat(width) -
      parseFloat(this.panelBody.nativeElement.getBoundingClientRect().width)
    )).toString();
    const translate = `translate(${this.translateX})`;
    this.translate = translate;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 1200) {
      this.setTranslate('2600');
    } else {
      this.setTranslate('600');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.scrollY > 1590) {
      if (!this.timerStarted && !this.timerDone) {
        this.timerStarted = true;
        this.intervalTimer = setInterval(() => {
          console.log(this.time);
          if (this.time < this.maxTime) {
            this.time += 1;
          } else {
            clearInterval(this.intervalTimer);
            this.timerStarted = false;
            this.timerDone = true;
          }
        }, 1000);
        this.startTimers();
      }
    }
  }

  startTimers() {
    this.registerInterval = setInterval(() => {
      if (this.registeredStart === this.registeredMax) {
        clearInterval(this.registerInterval);
      } else {
        this.registeredStart += 1;
      }
    }, this.registerIntervalTime);

    this.accountingInterval = setInterval(() => {
      if (this.accountingStart === this.accountingMax) {
        clearInterval(this.accountingInterval);
      } else {
        this.accountingStart += 1;
      }
    }, this.accountingIntervalTime);

    this.declarationInterval = setInterval(() => {
      if (this.declarationStart === this.declarationMax) {
        clearInterval(this.declarationInterval);
      } else {
        this.declarationStart += 1;
      }
    }, this.declarationIntervalTime);

    this.invoiceInterval = setInterval(() => {
      if (this.invoiceStart === this.invoiceMax) {
        clearInterval(this.invoiceInterval);
      } else {
        this.invoiceStart += 1;
      }
    }, this.invoiceIntervalTime);
  }

  changeOpinion(opinionId: number) {
    this.opinionIdPressed = opinionId;
  }

  nextManager() {
    if (this.managerChosen === this.managers[this.managers.length - 1].id) {
      this.managerChosen = this.managers[0].id;
    } else {
      this.managerChosen++;
    }
    this.managerVisible = false;
  }

  previousManager() {
    if (this.managerChosen === this.managers[0].id) {
      this.managerChosen = this.managers[this.managers.length - 1].id;
    } else {
      this.managerChosen--;
    }
  }
}
