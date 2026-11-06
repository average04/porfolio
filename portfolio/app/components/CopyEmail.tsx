"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <div className="copy-email">
      <button type="button" onClick={copy}>
        {status === "copied" ? "Copied" : "Copy address"}
      </button>
      <span role="status">
        {status === "failed"
          ? "Your browser blocked copying. Select the address above instead."
          : status === "copied"
            ? <span className="sr-only">Email address copied</span>
            : null}
      </span>
    </div>
  );
}
