import type { ComponentType } from 'react';
import {
  IconBack311546,
  IconCloseIcon311501,
  IconCreateAdd311461,
  IconDrag311440,
  IconDropdownArrow311552,
  IconGridMission311471,
  IconInfoIdea311492,
  IconKeyboardControls311454,
  IconNewFilter61811665,
  IconPlay311410,
  IconRightFacingArrow311519,
  IconSearch311536,
  IconSortSlidder311539,
  IconTick311404,
  IconWarning311541,
  type IconProps
} from '../icons';

export type IconGlyph = ComponentType<IconProps>;

export const icons = {
  check: IconTick311404,
  chevronDown: IconDropdownArrow311552,
  chevronLeft: IconBack311546,
  chevronRight: IconRightFacingArrow311519,
  filter: IconNewFilter61811665,
  grid: IconGridMission311471,
  gripVertical: IconDrag311440,
  info: IconInfoIdea311492,
  keyboard: IconKeyboardControls311454,
  play: IconPlay311410,
  plus: IconCreateAdd311461,
  search: IconSearch311536,
  slidersHorizontal: IconSortSlidder311539,
  triangleAlert: IconWarning311541,
  x: IconCloseIcon311501
} as const;

export function Icon({ icon: IconGlyph, size = 16 }: { icon: IconGlyph; size?: number }) {
  return <IconGlyph aria-hidden="true" className="fds-icon" color="currentColor" focusable="false" size={size} />;
}
