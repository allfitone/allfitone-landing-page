"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { buttonVariants } from "@allfitone/react/components/button";
import { Input } from "@allfitone/react/components/input";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import type { LocalizedContent } from "@/lib/content";
import { usePersonName, withPerson } from "@/lib/person";
import { siteConfig } from "@/lib/site-config";
import { isPlausibleEmail, isWaitlistRole, joinWaitlist, type WaitlistEntry, type WaitlistRole } from "@/lib/waitlist";

type Status = "idle" | "pending" | "joined" | "failed";
type Field = "name" | "email" | "role";
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: readonly Field[] = ["name", "email", "role"];

/**
 * The homepage's one conversion: a first name, an email, and how the person would
 * use Allfit One, so each hears about the product that is theirs.
 *
 * Validation runs on submit (the browser's own bubbles are off so the messages
 * follow the page language). Every missing field is marked under itself; only the
 * first is announced, and it takes the keyboard. A joined state replaces the form
 * and takes focus so the confirmation is announced and the keyboard is not left on
 * a button that no longer exists. «Use another email» brings the form back with the
 * name and the choice kept.
 */
export function WaitlistForm({ copy }: { copy: LocalizedContent["waitlist"] }) {
  const person = usePersonName();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [announced, setAnnounced] = useState<Field | null>(null);
  const [joined, setJoined] = useState<WaitlistEntry | null>(null);
  const [kept, setKept] = useState<{ name: string; role: WaitlistRole | null }>({ name: "", role: null });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const rolesRef = useRef<HTMLFieldSetElement>(null);
  const joinedRef = useRef<HTMLParagraphElement>(null);
  const focusNext = useRef<Field | null>(null);
  const id = useId();
  const fieldId = (field: Field) => `${id}-${field}`;
  const errorId = (field: Field) => `${id}-${field}-error`;
  const failedId = `${id}-failed`;
  const noteId = `${id}-note`;

  // Focus moves only once the swapped block or the error state exists, so it waits for the render.
  useEffect(() => {
    if (status === "joined") {
      joinedRef.current?.focus();
      return;
    }
    const field = focusNext.current;
    if (!field) return;
    focusNext.current = null;
    if (field === "name") nameRef.current?.focus();
    else if (field === "email") emailRef.current?.focus();
    else rolesRef.current?.querySelector<HTMLInputElement>("input:checked, input")?.focus();
  }, [status, errors]);

  function clearError(field: Field) {
    if (!errors[field]) return;
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (announced === field) setAnnounced(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const role = data.get("role");

    const next: Errors = {};
    if (!name) next.name = copy.errorNameEmpty;
    if (!email) next.email = copy.errorEmailEmpty;
    else if (!isPlausibleEmail(email)) next.email = withPerson(copy.errorEmailInvalid, person);
    if (!isWaitlistRole(role)) next.role = copy.errorRole;

    const first = FIELD_ORDER.find((field) => next[field]);
    if (first || !isWaitlistRole(role)) {
      const field = first ?? "role";
      focusNext.current = field;
      setErrors(next);
      setAnnounced(field);
      setStatus("idle");
      return;
    }

    setErrors({});
    setAnnounced(null);
    setStatus("pending");
    try {
      const entry = { name, email, role };
      await joinWaitlist(entry);
      setJoined(entry);
      setStatus("joined");
    } catch {
      setStatus("failed");
    }
  }

  function reset() {
    if (joined) setKept({ name: joined.name, role: joined.role });
    focusNext.current = "email";
    setErrors({});
    setAnnounced(null);
    setStatus("idle");
  }

  if (status === "joined" && joined) {
    const [before, after] = copy.joinedBody[joined.role].split("{email}");
    return (
      <div className="waitlist-joined" role="status">
        <p ref={joinedRef} tabIndex={-1} className="waitlist-joined-title">
          <FoundationIcon name="success" size="md" className="shrink-0 text-bolt" decorative />
          <span>{copy.joinedTitle.replace("{name}", joined.name)}</span>
        </p>
        <p className="waitlist-joined-body">
          {before}
          <strong className="font-semibold text-white">{joined.email}</strong>
          {after}
        </p>
        <button type="button" className="inline-link waitlist-reset" onClick={reset}>
          {copy.reset}
        </button>
      </div>
    );
  }

  const pending = status === "pending";
  const describedBy = (field: Field, ...rest: string[]) =>
    [errors[field] ? errorId(field) : null, ...rest].filter(Boolean).join(" ") || undefined;

  const fieldMessage = (field: Field) =>
    errors[field] ? (
      <p id={errorId(field)} className="waitlist-message" role={announced === field ? "alert" : undefined}>
        <FoundationIcon name="error" size="sm" className="mt-px shrink-0" decorative />
        {errors[field]}
      </p>
    ) : null;

  return (
    <form className="waitlist" noValidate onSubmit={submit} aria-busy={pending}>
      <div className="waitlist-fields">
        <div>
          <label htmlFor={fieldId("name")} className="waitlist-label">
            {copy.nameLabel}
          </label>
          <Input
            ref={nameRef}
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="given-name"
            autoCapitalize="words"
            maxLength={80}
            placeholder={withPerson(copy.namePlaceholder, person)}
            defaultValue={kept.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name", noteId)}
            readOnly={pending}
            onChange={() => clearError("name")}
            className="waitlist-input"
          />
          {fieldMessage("name")}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="waitlist-label">
            {copy.emailLabel}
          </label>
          <Input
            ref={emailRef}
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={withPerson(copy.emailPlaceholder, person)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", noteId)}
            readOnly={pending}
            onChange={() => clearError("email")}
            className="waitlist-input"
          />
          {fieldMessage("email")}
        </div>
      </div>

      {/* Native radios inside the pills: arrow keys, form data and the group's name come free. */}
      <fieldset ref={rolesRef} className="waitlist-roles">
        <legend className="waitlist-label">{copy.roleLegend}</legend>
        <div className="waitlist-role-options" data-invalid={errors.role ? "" : undefined}>
          {copy.roles.map((role) => (
            <label key={role.id} className="waitlist-role">
              <input
                type="radio"
                name="role"
                value={role.id}
                defaultChecked={kept.role === role.id}
                aria-describedby={describedBy("role")}
                onChange={() => clearError("role")}
                className="sr-only"
              />
              {role.label}
            </label>
          ))}
        </div>
        {fieldMessage("role")}
      </fieldset>

      {/* A plain button with the variants, like the hero's action: the DS <Button> paints its
          default variant with the accent gradient, which this page keeps flat. */}
      <button
        type="submit"
        disabled={pending}
        aria-describedby={status === "failed" ? failedId : undefined}
        className={cn(buttonVariants({ size: "lg" }), "waitlist-submit")}
      >
        {pending ? (
          <>
            <FoundationIcon name="loading" data-icon="inline-start" className="waitlist-spinner" decorative />
            {copy.pending}
          </>
        ) : (
          <>
            {copy.submit}
            <FoundationIcon name="forward" data-icon="inline-end" decorative />
          </>
        )}
      </button>

      {status === "failed" ? (
        <p id={failedId} className="waitlist-message" role="alert">
          <FoundationIcon name="error" size="sm" className="mt-px shrink-0" decorative />
          <span>
            {copy.failed}{" "}
            <a className="waitlist-message-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </span>
        </p>
      ) : null}

      <p id={noteId} className="waitlist-note">
        {copy.note}
      </p>
    </form>
  );
}
