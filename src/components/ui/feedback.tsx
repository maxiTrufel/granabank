import type { ReactNode } from "react";
import { AlertIcon, InboxIcon } from "./icons";

interface FeedbackProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

function Feedback({ icon, title, description, action }: FeedbackProps & { icon: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-white shadow-soft">
        {icon}
      </div>
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="mt-1 max-w-64 text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function EmptyState(props: FeedbackProps) {
  return <Feedback icon={<InboxIcon className="size-6 text-muted" />} {...props} />;
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert">
      <Feedback
        icon={<AlertIcon className="size-6 text-granate" />}
        title="Algo salió mal"
        description={message}
        action={
          onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-full bg-granate px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-granate-dark"
            >
              Reintentar
            </button>
          )
        }
      />
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-line ${className}`} />;
}
