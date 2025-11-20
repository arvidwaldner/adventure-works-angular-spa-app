import { 
  trigger, 
  state, 
  style, 
  transition, 
  animate,
  keyframes,
  query,
  stagger,
  group,
  animateChild
} from '@angular/animations';

// Fade In/Out Animation
export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);

// Slide In/Out Animation
export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('400ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('400ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);

// Scale Animation
export const scaleAnimation = trigger('scaleAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),
    animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', 
      style({ transform: 'scale(1)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', 
      style({ transform: 'scale(0.5)', opacity: 0 }))
  ])
]);

// Bounce Animation
export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    animate('600ms ease-in', keyframes([
      style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0 }),
      style({ transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2 }),
      style({ transform: 'scale3d(0.9, 0.9, 0.9)', offset: 0.4 }),
      style({ transform: 'scale3d(1.03, 1.03, 1.03)', offset: 0.6 }),
      style({ transform: 'scale3d(0.97, 0.97, 0.97)', offset: 0.8 }),
      style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 1 })
    ]))
  ])
]);

// List Stagger Animation
export const listStagger = trigger('listStagger', [
  transition('* <=> *', [
    query(':enter',
      [
        style({ opacity: 0, transform: 'translateY(-15px)' }),
        stagger('100ms',
          animate('300ms ease-out',
            style({ opacity: 1, transform: 'translateY(0px)' })))
      ],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);

// Router Transition Animation
export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(100%)' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true })
  ])
]);

// Button Hover Animation
export const buttonHover = trigger('buttonHover', [
  state('normal', style({ transform: 'scale(1)' })),
  state('hover', style({ transform: 'scale(1.05)' })),
  transition('normal <=> hover', animate('150ms ease-in-out'))
]);

// Card Flip Animation
export const cardFlip = trigger('cardFlip', [
  state('front', style({ transform: 'rotateY(0deg)' })),
  state('back', style({ transform: 'rotateY(180deg)' })),
  transition('front <=> back', animate('600ms ease-in-out'))
]);

// Card Hover Animation
export const cardHover = trigger('cardHover', [
  state('normal', style({ 
    transform: 'scale(1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderColor: 'transparent'
  })),
  state('hover', style({ 
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    borderColor: '#007bff'
  })),
  transition('normal <=> hover', animate('250ms ease-in-out'))
]);