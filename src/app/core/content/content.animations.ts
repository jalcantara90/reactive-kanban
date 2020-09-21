import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const contentAnimation: {
  readonly toogleContentWidth: AnimationTriggerMetadata;
} = {
  toogleContentWidth: trigger('toogleContentWidth', [
    state('open', style({
      width: 'calc(100vw - 260px)'
    })),
    state('close', style({
      width: 'calc(100vw - 60px)'
    })),
    transition('open => close', animate('500ms ease-in-out')),
    transition('close => open', animate('500ms ease-in-out')),
  ])
};
