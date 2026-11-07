"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { buttonVariants } from "@allfitone/react/components/button";
import { Input } from "@allfitone/react/components/input";
import { FoundationIcon } from "@allfitone/react/icons";
import { cn } from "@allfitone/react/lib/utils";

import type { LocalizedContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { isPlausibleEmail, joinWaitlist } from "@/lib/waitlist";

type Status = "idle" | "pending" | "joined" | "failed";

/**
 * The homepage's one conversion: an email for the waitlist.
 *
 * Validation runs on submit (the browser's own bubbles are off so the messages
 * follow the page language), the field keeps focus on an error, and a joined
 * state replaces the form and takes focus so the confirmation is announced and
 * the keyboard is not left on a button that no longer exists.
 */
export function WaitlistForm({ copy }: { copy: LocalizedContent["waitlist"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [joinedEmail, setJoinedEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const joinedRef = useRef<HTMLParagraphElement>(null);
  const returnToField = useRef(false);
  const id = useId();
  const inputId = `${id}-email`;
  const messageId = `${id}-message`;
  const noteId = `${id}-note`;

  // Focus moves only once the swapped block exists, so it waits for the render.
  useEffect(() => {
    if (status === "joined") joinedRef.current?.focus();
    if (status === "idle" && returnToField.current) {
      returnToField.current = false;
      inputRef.current?.focus();
    }
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();

    if (!email || !isPlausibleEmail(email)) {
      setError(email ? copy.errorInvalid : copy.errorEmpty);
      setStatus("idle");
      inputRef.current?.focus();
      return;
    }

    setError(null);
    setStatus("pending");
    try {
      await joinWaitlist(email);
      setJoinedEmail(email);
      setStatus("joined");
    } catch {
      setStatus("failed");
    }
  }

  function reset() {
    returnToField.current = true;
    setStatus("idle");
    setError(null);
  }

  if (status === "joined") {
    const [before, after] = copy.joinedBody.split("{email}");
    return (
      <div className="waitlist-joined" role="status">
        <p ref={joinedRef} tabIndex={-1} className="waitlist-joined-title">
          <FoundationIcon name="success" size="md" className="text-bolt" decorative />
          {copy.joinedTitle}
        </p>
        <p className="waitlist-joined-body">
          {before}
          <strong className="font-semibold text-white">{joinedEmail}</strong>
          {after}
        </p>
        <button type="button" className="inline-link waitlist-reset" onClick={reset}>
          {copy.reset}
        </button>
      </div>
    );
  }

  const invalid = error !== null;
  const describedBy = [invalid || status === "failed" ? messageId : null, noteId].filter(Boolean).join(" ");

  return (
    <form className="waitlist" noValidate onSubmit={submit} aria-busy={status === "pending"}>
      <label htmlFor={inputId} className="waitlist-label">
        {copy.label}
      </label>
      <div className="waitlist-row">
        <Input
          ref={inputRef}
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={copy.placeholder}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          readOnly={status === "pending"}
          onChange={() => invalid && setError(null)}
          className="waitlist-input"
        />
        {/* A plain button with the variants, like the hero's action: the DS <Button> paints its
            default variant with the accent gradient, which this page keeps flat. */}
        <button type="submit" disabled={status === "pending"} className={cn(buttonVariants({ size: "lg" }), "waitlist-submit")}>
          {status === "pending" ? (
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
      </div>

      {invalid ? (
        <p id={messageId} className="waitlist-message" role="alert">
          <FoundationIcon name="error" size="sm" className="mt-px shrink-0" decorative />
          {error}
        </p>
      ) : status === "failed" ? (
        <p id={messageId} className="waitlist-message" role="alert">
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
