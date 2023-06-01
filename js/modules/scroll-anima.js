import debounce from './debounce.js';

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    this.checkDistance = debounce(this.animaScroll.bind(this), 200);
  }

  // Pega a distancia de cada item em relação ao topo
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offSet = section.offsetTop;
      return {
        element: section,
        offSet: Math.floor(offSet - this.windowMetade),
      };
    });
  }

  // Verifica a distancia de cada obejto em relação ao scroll do site
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offSet) {
        item.element.classList.add('ativo');
      } else if (item.classList.contains('ativo')) {
        item.classList.remove('ativo');
      }
    });
  }


  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // Remove o event de scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
