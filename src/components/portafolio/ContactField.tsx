"use client";

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ContactFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  error?: string;
  /** Texto de ayuda que se muestra cuando no hay error */
  hint?: string;
  /** Contador "actual/máximo" (solo visual) */
  counter?: { current: number; max: number };
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  multiline?: boolean;
}

export function ContactField({
  id, name, label, value, onChange, onBlur, error, hint, counter,
  type = "text", autoComplete, placeholder, maxLength, disabled, multiline,
}: ContactFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    maxLength,
    disabled,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: cn(error && "border-destructive focus-visible:ring-destructive", multiline && "h-32 resize-none"),
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {multiline ? <Textarea {...shared} /> : <Input type={type} autoComplete={autoComplete} {...shared} />}
      <div className="mt-1 flex items-start justify-between gap-3 text-xs">
        {error ? (
          <p id={`${id}-error`} className="flex items-center gap-1 text-destructive">
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="text-muted-foreground">{hint}</p>
        ) : (
          <span />
        )}
        {counter && (
          <span
            aria-hidden="true"
            className={cn("shrink-0 tabular-nums", counter.current > counter.max ? "text-destructive" : "text-muted-foreground")}
          >
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
    </div>
  );
}
