"use client";

import Image from "next/image";
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteEntryAction, saveEntryAction, uploadMediaAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getPath, setPath, type Field } from "@/lib/cms/fields";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

type FormData = Record<string, unknown>;

function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "boolean":
      return false;
    case "list":
    case "rows":
      return [];
    case "cta":
      return { label: "", href: "" };
    case "select":
      return field.options[0]?.value ?? "";
    default:
      return "";
  }
}

function initialise(fields: Field[], data: FormData | null): FormData {
  const result: FormData = {};
  for (const field of fields) {
    const value = data ? getPath(data, field.name) : undefined;
    setPath(result, field.name, value === undefined || value === null ? emptyValue(field) : value);
  }
  return result;
}

const fieldInputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring";

function ImageField({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    const formData = new window.FormData();
    formData.append("file", file);
    const result = await uploadMediaAction(formData);
    setUploading(false);
    if (result.ok) {
      onChange(result.key);
      toast.success("Uploaded.");
    } else {
      toast.error(result.message);
    }
  }

  const isPdf = value.toLowerCase().endsWith(".pdf");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      {value && !isPdf ? (
        <Image
          src={media(value)}
          alt=""
          width={120}
          height={80}
          unoptimized
          className="h-20 w-30 shrink-0 rounded-md border bg-muted object-contain"
        />
      ) : null}
      <div className="flex-1 space-y-2">
        <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Upload a file or paste an image link" />
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,application/pdf"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.target.value = "";
            }}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="animate-spin" aria-hidden /> : <Upload aria-hidden />}
            Upload
          </Button>
          {value ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
              <X aria-hidden /> Remove
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function EntryForm({
  collection,
  entryId,
  fields,
  initialData,
  isAdmin,
  canDelete,
}: {
  collection: string;
  entryId: string | null;
  fields: Field[];
  initialData: FormData | null;
  isAdmin: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<FormData>(() => initialise(fields, initialData));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const update = (name: string, value: unknown) =>
    setData((current) => {
      const next = structuredClone(current);
      setPath(next, name, value);
      return next;
    });

  function submit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await saveEntryAction(collection, entryId, data);
      if (!result.ok) {
        setErrors(result.errors ?? {});
        toast.error(result.message);
        return;
      }
      setErrors({});
      toast.success(result.message);
      router.push(`/admin/content/${collection}`);
      router.refresh();
    });
  }

  function remove() {
    if (!entryId || !window.confirm("Delete this item? This cannot be undone.")) return;
    startTransition(async () => {
      const result = await deleteEntryAction(collection, entryId);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push(`/admin/content/${collection}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-6 rounded-md border bg-background p-6">
        {fields.map((field) => {
          const id = `field-${field.name.replace(/\./g, "-")}`;
          const value = getPath(data, field.name);
          const error = errors[field.name];

          let control: React.ReactNode;
          switch (field.type) {
            case "boolean":
              control = (
                <label className="flex items-center gap-2.5 text-sm font-medium">
                  <input
                    id={id}
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) => update(field.name, event.target.checked)}
                    className="size-4 accent-[#5b41c9]"
                  />
                  {field.label}
                </label>
              );
              break;
            case "textarea":
            case "markdown":
              control = (
                <Textarea
                  id={id}
                  value={String(value ?? "")}
                  rows={field.type === "markdown" ? 18 : 4}
                  onChange={(event) => update(field.name, event.target.value)}
                  className={field.type === "markdown" ? "font-mono text-sm" : undefined}
                />
              );
              break;
            case "select":
              control = (
                <select
                  id={id}
                  value={String(value ?? "")}
                  onChange={(event) => update(field.name, event.target.value)}
                  className={cn(fieldInputClass, "h-10")}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              );
              break;
            case "list":
              control = (
                <Textarea
                  id={id}
                  rows={5}
                  value={(value as string[]).join("\n")}
                  onChange={(event) => update(field.name, event.target.value.split("\n"))}
                />
              );
              break;
            case "rows": {
              const rows = value as Record<string, unknown>[];
              control = (
                <div className="space-y-2">
                  {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-wrap items-center gap-2">
                      {field.columns.map((column) =>
                        column.type === "boolean" ? (
                          <label key={column.key} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={Boolean(row[column.key])}
                              onChange={(event) => {
                                const next = structuredClone(rows);
                                next[rowIndex][column.key] = event.target.checked;
                                update(field.name, next);
                              }}
                              className="size-4 accent-[#5b41c9]"
                            />
                            {column.label}
                          </label>
                        ) : (
                          <Input
                            key={column.key}
                            aria-label={column.label}
                            placeholder={column.label}
                            value={String(row[column.key] ?? "")}
                            onChange={(event) => {
                              const next = structuredClone(rows);
                              next[rowIndex][column.key] = event.target.value;
                              update(field.name, next);
                            }}
                            className="min-w-40 flex-1"
                          />
                        ),
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Remove row"
                        onClick={() => update(field.name, rows.filter((_, i) => i !== rowIndex))}
                      >
                        <X aria-hidden />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      update(field.name, [
                        ...rows,
                        Object.fromEntries(field.columns.map((column) => [column.key, column.type === "boolean" ? false : ""])),
                      ])
                    }
                  >
                    <Plus aria-hidden /> Add row
                  </Button>
                </div>
              );
              break;
            }
            case "cta": {
              const cta = (value as { label: string; href: string }) ?? { label: "", href: "" };
              control = (
                <div className="grid gap-2 sm:grid-cols-[1fr_1.5fr]">
                  <Input
                    id={id}
                    aria-label={`${field.label}: text`}
                    placeholder="Button text"
                    value={cta.label}
                    onChange={(event) => update(field.name, { ...cta, label: event.target.value })}
                  />
                  <Input
                    aria-label={`${field.label}: link`}
                    placeholder="Link, e.g. /contact?intent=briefing"
                    value={cta.href}
                    onChange={(event) => update(field.name, { ...cta, href: event.target.value })}
                  />
                </div>
              );
              break;
            }
            case "image":
              control = <ImageField id={id} value={String(value ?? "")} onChange={(next) => update(field.name, next)} />;
              break;
            default:
              control = (
                <Input
                  id={id}
                  type={field.type === "date" ? "date" : "text"}
                  value={String(value ?? "")}
                  onChange={(event) => update(field.name, event.target.value)}
                />
              );
          }

          return (
            <div key={field.name} className="space-y-1.5">
              {field.type === "boolean" ? null : (
                <label htmlFor={id} className="text-sm font-semibold">
                  {field.label}
                  {field.required ? <span className="text-destructive"> *</span> : null}
                </label>
              )}
              {control}
              {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
              {field.type === "list" ? <p className="text-xs text-muted-foreground">One item per line.</p> : null}
              {error ? (
                <p role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending} className="h-11 px-5">
            {pending ? <Loader2 className="animate-spin" aria-hidden /> : null}
            {isAdmin ? "Save and publish" : "Submit for approval"}
          </Button>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? "Changes go live on the website straight away."
              : "The Platform Admin reviews changes before they go live."}
          </p>
        </div>
        {canDelete ? (
          <Button type="button" variant="outline" onClick={remove} disabled={pending} className="text-destructive">
            <Trash2 aria-hidden /> {isAdmin ? "Delete" : "Request deletion"}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
