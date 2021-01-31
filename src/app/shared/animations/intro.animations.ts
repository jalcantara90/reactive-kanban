import {
  animate,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
  AnimationStyleMetadata,
  AnimationAnimateMetadata,
  query,
  stagger,
  animateChild
} from '@angular/animations';


const introXAnimation = style({ opacity: 1, transform: 'translateX(0px)', offset: 1 });
const introYAnimation = style({ opacity: 1, transform: 'translateY(0px)' });

const transitionYDown: (AnimationStyleMetadata | AnimationAnimateMetadata)[] = [
  style({ opacity: 0, transform: 'translateY(-50px)' }),
  animate('.4s ease-in-out', introYAnimation)
];

const transitionYUp: (AnimationStyleMetadata | AnimationAnimateMetadata)[] = [
  style({ opacity: 0, transform: 'translateY(50px)' }),
  animate('.4s ease-in-out', introYAnimation)
];

const transitionXLeft: (AnimationStyleMetadata | AnimationAnimateMetadata)[] = [
  style({ opacity: 0, transform: 'translateX(50px)' }),
  animate('.4s ease-in-out', introXAnimation)
];

const transitionXRight: (AnimationStyleMetadata | AnimationAnimateMetadata)[] = [
  style({ opacity: 0, transform: 'translateX(-50px)' }),
  animate('.4s ease-in-out', introXAnimation)
];

export const introY: AnimationTriggerMetadata = trigger('introY', [
  transition(':enter', transitionYDown),
  transition(':leave', transitionYUp)
]);

export const introInversedY: AnimationTriggerMetadata = trigger('introInversedY', [
  transition(':enter', transitionYUp),
]);


export const introX: AnimationTriggerMetadata = trigger('introX', [
  transition(':enter', transitionXLeft),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateX(0px)' }),
    animate('.2s ease-out', style({ opacity: 0, transform: 'translateX(50px)'}))
  ])
]);

export const introInversedX: AnimationTriggerMetadata = trigger('introInversedX', [
  transition(':enter', transitionXRight),
]);

const ExitStyle = style({ opacity: 0, transform: 'translateX(50px)' });
const EnterStyle = style({ opacity: 1, transform: 'translateX(0px)' });

export const introStaggedX = trigger('introStaggedX', [
  transition(':enter', [
    query(':enter', [
      ExitStyle,
      stagger('.1s', [
        animate('.4s ease-in-out', EnterStyle)
      ]),
    ]),
  ])
]);

export const Container = [
  trigger('container', [
    transition(':enter, :leave', [query('@*', animateChild({ delay: '.1s' }))]),
  ]),
];
