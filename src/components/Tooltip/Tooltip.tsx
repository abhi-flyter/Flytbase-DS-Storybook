import { useId, type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '../Button';
import { cx, useControllableState } from '../shared';

export type TooltipType = 'plain' | 'rich';
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

/**
 * Tooltip from Figma `Tooltip`.
 *
 * Use for brief contextual help. Figma supports plain labels and rich tooltips with a heading, body,
 * and action. Tooltips appear on hover and focus.
 */
export interface TooltipProps {
  /** Trigger content. */
  children: ReactNode;
  /** Tooltip body content. */
  content: ReactNode;
  /** Controlled open state for product use. */
  open?: boolean;
  /** Initial open state for uncontrolled product use. */
  defaultOpen?: boolean;
  /** Called when hover, focus, or Escape changes open state. */
  onOpenChange?: (open: boolean) => void;
  /** Tooltip type from the Figma `Type` axis. */
  type?: TooltipType;
  /** Heading shown in rich tooltip mode. */
  title?: ReactNode;
  /** Optional action label shown in rich tooltip mode. */
  actionLabel?: string;
  /** Optional action handler shown in rich tooltip mode. */
  onAction?: () => void;
  /** Tooltip position from the Figma `Placement` axis. */
  placement?: TooltipPlacement;
  /** Optional class name for layout wrappers. */
  className?: string;
}

/** Brief contextual help attached to an explicit trigger, with plain and rich Figma variants. */
export function Tooltip({
  actionLabel,
  children,
  className,
  content,
  defaultOpen = false,
  onAction,
  onOpenChange,
  open,
  placement = 'top',
  title,
  type = 'plain'
}: TooltipProps) {
  const tooltipId = useId();
  const isRich = type === 'rich';
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: open
  });

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
    }
  }

  return (
    <span
      aria-describedby={isOpen ? tooltipId : undefined}
      className={cx('fds-tooltip', className)}
      data-open={isOpen ? 'yes' : 'no'}
      data-placement={placement}
      data-type={type}
      onBlur={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      tabIndex={0}
    >
      {children}
      {isOpen ? (
        <span className="fds-tooltip-content" id={tooltipId} role="tooltip">
          <span className="fds-tooltip-arrow" aria-hidden="true" />
          {isRich && title ? <strong>{title}</strong> : null}
          <span>{content}</span>
          {isRich && actionLabel ? (
            <Button onClick={onAction} size="small" variant="link">
              {actionLabel}
            </Button>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
