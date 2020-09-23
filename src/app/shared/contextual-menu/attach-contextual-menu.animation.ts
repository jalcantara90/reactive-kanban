import {
  animate,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
  keyframes
} from '@angular/animations';

export const attachContextMenu: AnimationTriggerMetadata = trigger('attachContextualMenu', [
  transition(':enter', [
    animate('.4s',
      keyframes([
        style({ opacity: 0, transform: 'scale(.5)' }),
        style({ opacity: .2, transform: 'scale(.7)' }),
        style({ opacity: .4, transform: 'scale(.9)' }),
        style({ transform: 'scale(1)', opacity: .5}),
        style({ transform: 'scale(1.1)', opacity: .8}),
        style({ transform: 'scale(1)', opacity: 1}),
      ])
    )
  ])
]);
