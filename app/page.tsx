"use client";

import { FormEvent, useEffect, useState } from "react";

type ShortenedUrl = {
  id: string;
  original: string;
  short: string;
  createdAt: string;
};

const STORAGE_KEY = "book-url-shortener-v2";

function makeCode() {
  return Math.random().toString(36).slice(2, 8);
}
export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUrls(JSON.parse(saved) as ShortenedUrl[]);
    } catch {
      setUrls([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
  }, [urls]);

  function shortenUrl(event: FormEvent) {
    event.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Paste a destination before issuing a code.");
      return;
    }

    try {
      const parsed = new URL(trimmed);
      const next: ShortenedUrl = {
        id: crypto.randomUUID(),
        original: parsed.toString(),
        short: `https://short.link/${makeCode()}`,
        createdAt: new Date().toISOString(),
      };
      setUrls((current) => [next, ...current]);
      setUrl("");
      setError("");
    } catch {
      setError("That does not look like a complete URL. Include https://.");
    }
  }

  async function copyToClipboard(short: string) {
    try {
      await navigator.clipboard.writeText(short);
      setCopied(short);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setError("Clipboard access is unavailable. Select the code manually.");
    }
  }

  return (
    <main className="link-desk">
      <header className="link-header">
        <div className="link-mark">B/11</div>
        <div className="link-brand">
          <strong>LINK REGISTRY</strong>
          <span>SHORT ROUTES / LOCAL DESK</span>
        </div>
        <div className="link-status"><i /> DEMO WORKSPACE · NO REDIRECT SERVER</div>
      </header>

      <section className="link-hero">
        <div>
          <p className="link-kicker">BOOKCHAOWALIT / ROUTING OFFICE</p>
          <h1>Make the long<br /><em>route smaller.</em></h1>
          <p className="link-intro-copy">Issue a temporary-looking code for a link you want close at hand. This registry stays in this browser.</p>
        </div>
        <div className="route-stamp" aria-label="Local browser utility">
          <span>ROUTE</span>
          <strong>LOCAL</strong>
          <b>11 / 26</b>
        </div>
      </section>

      <section className="issue-sheet" aria-label="Create a short link">
        <div className="issue-heading">
          <span>01 / ISSUE A CODE</span>
          <h2>Address the destination.</h2>
        </div>
        <form className="issue-form" onSubmit={shortenUrl}>
          <label>
            <span>Destination URL</span>
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://bookchaowalit.com/project"
              aria-describedby={error ? "url-error" : undefined}
            />
          </label>
          <button type="submit">Issue short code <b>↗</b></button>
        </form>
        {error ? <p className="form-error" id="url-error" role="alert">{error}</p> : <p className="issue-note">A local code is generated for this browser only. It does not redirect anyone.</p>}
      </section>

      <section className="registry" aria-label="Short link registry">
        <div className="registry-header">
          <div>
            <p className="link-kicker">02 / THE REGISTER</p>
            <h2>Routes on file.</h2>
          </div>
          <span>{String(urls.length).padStart(2, "0")} ENTRIES</span>
        </div>
        {urls.length === 0 ? (
          <div className="empty-register"><span>—</span><p>No routes issued yet. The next one will appear here.</p></div>
        ) : (
          <div className="route-list">
            {urls.map((item, index) => (
              <article className="route-row" key={item.id}>
                <span className="route-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="route-target"><strong>{item.short}</strong><span>{item.original}</span></div>
                <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</time>
                <button className="copy-route" onClick={() => copyToClipboard(item.short)}>{copied === item.short ? "COPIED" : "COPY"}</button>
                <button className="remove-route" onClick={() => setUrls((current) => current.filter((route) => route.id !== item.id))}>REMOVE</button>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="link-footer"><span>BOOKCHAOWALIT / URL SHORTENER</span><span>LOCAL STATE · DEMO-GRADE</span></footer>
    </main>
  );
}
