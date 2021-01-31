import {
  animate,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
  query,
  stagger,
} from '@angular/animations';

const ExitStyle = { opacity: 0, transform: 'scale(0.8)' };
const EnterStyle = { opacity: 1, transform: 'scale(1)' };

export const fadeGrowStagger: AnimationTriggerMetadata = trigger('fadeGrowStagger', [
  transition(':enter', [
    query(':enter', [
      style(ExitStyle),
      stagger('50ms', [animate('200ms', style(EnterStyle))]),
    ]),
  ]),
  transition(':leave', [
    query(':leave', [
      stagger('-100ms', [animate('500ms', style(ExitStyle))]),
    ]),
  ]),
]);

export const fadeGrow: AnimationTriggerMetadata = trigger('fadeGrow', [
  transition(':enter', [
    style(ExitStyle),
    animate('200ms', style(EnterStyle)),
  ])
]);
