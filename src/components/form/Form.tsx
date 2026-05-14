import { Button } from "../ui/Button";

type FormShellProps = {
  title?: string;
  description?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  submitLabel: string;
  cancelLabel?: string;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  error?: string;
};

export function FormShell({
  title,
  description,
  onSubmit,
  children,
  submitLabel,
  cancelLabel = "Cancel",
  onCancel,
  isSubmitting = false,
  submitDisabled = false,
  error,
}: FormShellProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-lg">
      {(title || description) && (
        <div className="space-y-1">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      <div className="space-y-4">{children}</div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting || submitDisabled}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline">
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
}
