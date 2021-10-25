import GSAP from 'gsap';

class Colors {
  change({ backgroundColor, color }) {
    GSAP.set(document.body, {
      backgroundColor,
      color,
    });
  }
}

export const ColorManager = new Colors();
