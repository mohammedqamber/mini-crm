import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";

interface ErrorStateProps {
  title: string;
  error?: unknown;
  fallback?: string;
  onRetry: () => void;
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function ErrorState({
  title,
  error,
  fallback = "Something went wrong",
  onRetry,
  secondaryAction,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
      <h3 className="text-lg font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">
        {error instanceof Error ? error.message : fallback}
      </p>
      <div className="flex gap-2">
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
        {secondaryAction && (
          <Button variant="outline" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
