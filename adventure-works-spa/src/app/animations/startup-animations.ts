import { trigger, state, style, transition, animate } from '@angular/animations';

// State-based fade animation (better for SPAs)
export const fadeInOnLoad = trigger('fadeInOnLoad', [
  state('hidden', style({ 
    opacity: 0, 
    transform: 'translateY(20px)' 
  })),
  state('visible', style({ 
    opacity: 1, 
    transform: 'translateY(0)' 
  })),
  transition('hidden => visible', animate('600ms ease-out'))
]);

// Staggered loading animation
export const staggeredLoad = trigger('staggeredLoad', [
  state('hidden', style({ 
    opacity: 0, 
    transform: 'translateY(30px)' 
  })),
  state('visible', style({ 
    opacity: 1, 
    transform: 'translateY(0)' 
  })),
  transition('hidden => visible', animate('{{duration}}ms {{delay}}ms ease-out'))
]);

// Hero section animation
export const heroAnimation = trigger('heroAnimation', [
  state('hidden', style({ 
    opacity: 0, 
    transform: 'scale(0.95) translateY(20px)' 
  })),
  state('visible', style({ 
    opacity: 1, 
    transform: 'scale(1) translateY(0)' 
  })),
  transition('hidden => visible', animate('800ms 200ms ease-out'))
]);