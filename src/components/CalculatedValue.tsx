import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface CalculatedValueProps {
  value: ReactNode;
  tooltip: string;
  className?: string;
}

const VIEWPORT_PADDING = 8;

export function CalculatedValue({ value, tooltip, className }: CalculatedValueProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState({
    top: 0,
    left: 0,
    transform: 'translate(-50%, -100%)',
  });

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!trigger || !tooltipEl) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    let left = triggerRect.left + triggerRect.width / 2;
    let top = triggerRect.top - 8;
    let transform = 'translate(-50%, -100%)';

    const centeredLeft = left - tooltipWidth / 2;
    const centeredRight = left + tooltipWidth / 2;

    if (centeredRight > window.innerWidth - VIEWPORT_PADDING) {
      left = Math.min(triggerRect.right, window.innerWidth - VIEWPORT_PADDING);
      transform = 'translate(-100%, -100%)';
    } else if (centeredLeft < VIEWPORT_PADDING) {
      left = Math.max(triggerRect.left, VIEWPORT_PADDING);
      transform = 'translate(0, -100%)';
    }

    if (top - tooltipHeight < VIEWPORT_PADDING) {
      top = triggerRect.bottom + 8;
      transform = transform.replace('-100%)', '0)');
    }

    setStyle({ top, left, transform });
  }, []);

  const show = useCallback(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      const nearRightEdge = rect.right > window.innerWidth * 0.55;
      setStyle({
        top: rect.top - 8,
        left: nearRightEdge ? rect.right : rect.left + rect.width / 2,
        transform: nearRightEdge ? 'translate(-100%, -100%)' : 'translate(-50%, -100%)',
      });
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useLayoutEffect(() => {
    if (!visible) return;
    updatePosition();
  }, [visible, tooltip, updatePosition]);

  useEffect(() => {
    if (!visible) return;
    const handle = () => updatePosition();
    window.addEventListener('scroll', handle, true);
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle, true);
      window.removeEventListener('resize', handle);
    };
  }, [visible, updatePosition]);

  return (
    <>
      <span
        ref={triggerRef}
        className={['calculated-value', className].filter(Boolean).join(' ')}
        tabIndex={0}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {value}
      </span>
      {visible &&
        createPortal(
          <span
            ref={tooltipRef}
            className="calculated-value__tooltip"
            role="tooltip"
            style={{
              position: 'fixed',
              top: style.top,
              left: style.left,
              transform: style.transform,
            }}
          >
            {tooltip}
          </span>,
          document.body,
        )}
    </>
  );
}
