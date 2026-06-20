import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Keyboard,
  Filter,
  Grid3X3,
  Info,
  Play,
  Plus,
  Search,
  SlidersHorizontal,
  TriangleAlert,
  X,
  type LucideIcon
} from 'lucide-react';

export const icons = {
  check: Check,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  filter: Filter,
  grid: Grid3X3,
  gripVertical: GripVertical,
  info: Info,
  keyboard: Keyboard,
  play: Play,
  plus: Plus,
  search: Search,
  slidersHorizontal: SlidersHorizontal,
  triangleAlert: TriangleAlert,
  x: X
} as const;

export function Icon({ icon: IconGlyph }: { icon: LucideIcon }) {
  return <IconGlyph aria-hidden="true" className="fds-icon" focusable="false" strokeWidth={2} />;
}
