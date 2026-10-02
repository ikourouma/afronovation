import { z } from "zod";

/*
 * Field definitions drive both the admin forms and server-side validation,
 * so every collection is described once. Dotted names ("atAGlance.sector")
 * address nested objects.
 */

type FieldBase = {
  name: string;
  label: string;
  help?: string;
  /** Required fields must be non-empty. */
  required?: boolean;
  /** Empty input is stored as null instead of "". */
  nullable?: boolean;
};

export type RowColumn = { key: string; label: string; type?: "text" | "boolean" };

export type Field =
  | (FieldBase & { type: "text" | "textarea" | "markdown" | "url" | "date"; maxLength?: number })
  | (FieldBase & { type: "image" })
  | (FieldBase & { type: "boolean" })
  | (FieldBase & { type: "select"; options: { value: string; label: string }[] })
  | (FieldBase & { type: "list" })
  | (FieldBase & { type: "rows"; columns: RowColumn[] })
  | (FieldBase & { type: "cta" });

export function getPath(data: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => {
    if (value && typeof value === "object") return (value as Record<string, unknown>)[key];
    return undefined;
  }, data);
}

export function setPath(data: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let cursor: Record<string, unknown> = data;
  keys.slice(0, -1).forEach((key) => {
    if (!cursor[key] || typeof cursor[key] !== "object") cursor[key] = {};
    cursor = cursor[key] as Record<string, unknown>;
  });
  cursor[keys[keys.length - 1]] = value;
}

const trimmed = (max: number) => z.string().trim().max(max);

function textSchema(field: FieldBase, max: number) {
  const base = trimmed(max);
  if (field.nullable) {
    return base.transform((value) => (value === "" ? null : value)).nullable();
  }
  return field.required ? base.min(1, `${field.label} is required.`) : base;
}

const safeHref = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => value === "" || /^(https?:\/\/|\/|#|mailto:|tel:)/.test(value),
    "Links must start with https://, /, #, mailto: or tel:.",
  );

function fieldSchema(field: Field): z.ZodTypeAny {
  switch (field.type) {
    case "text":
    case "date":
      return textSchema(field, field.type === "date" ? 40 : (field.maxLength ?? 300));
    case "textarea":
      return textSchema(field, field.maxLength ?? 3000);
    case "markdown":
      return textSchema(field, 60000);
    case "url":
    case "image": {
      const base = field.type === "url" ? safeHref : trimmed(500);
      if (field.nullable) return base.transform((value) => (value === "" ? null : value)).nullable();
      return field.required ? base.refine((value) => value !== "", `${field.label} is required.`) : base;
    }
    case "boolean":
      return z.boolean();
    case "select": {
      const values = field.options.map((option) => option.value) as [string, ...string[]];
      return z.enum(values);
    }
    case "list":
      return z.array(trimmed(500)).transform((items) => items.filter(Boolean));
    case "rows": {
      const shape = Object.fromEntries(
        field.columns.map((column) => [
          column.key,
          column.type === "boolean" ? z.boolean() : trimmed(500),
        ]),
      );
      return z.array(z.object(shape));
    }
    case "cta": {
      const cta = z.object({ label: trimmed(80), href: safeHref });
      if (field.nullable) {
        return cta
          .nullable()
          .transform((value) => (value && value.label && value.href ? value : null));
      }
      return cta.refine((value) => value.label && value.href, `${field.label} needs a label and a link.`);
    }
  }
}

/** Validates raw form data against the field list and returns clean data. */
export function parseFields(
  fields: Field[],
  raw: Record<string, unknown>,
): { success: true; data: Record<string, unknown> } | { success: false; errors: Record<string, string> } {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const result = fieldSchema(field).safeParse(getPath(raw, field.name));
    if (result.success) {
      setPath(data, field.name, result.data);
    } else {
      errors[field.name] = result.error.issues[0]?.message ?? "Invalid value.";
    }
  }

  return Object.keys(errors).length > 0 ? { success: false, errors } : { success: true, data };
}
