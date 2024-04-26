'use client';

import { useState } from "react";

export default function Home() {

  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function reset() {
    setShortenedUrl('');
    setUrl('');
    setLoading(false);
    setError(false);
  }

  function shortenUrl(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true);
    setShortenedUrl('');

    const inputElement = event.currentTarget.elements[0] as HTMLInputElement;
    const inputUrl = inputElement.value;

    fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: inputUrl }),
    })
      .then(response => response.json())
      .then(data => {
        setShortenedUrl(data.shortUrl);
        setUrl('');
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }

  // TODO extract "copy" and "shorten" components
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {shortenedUrl && (
        <div className="flex flex-col items-center justify-center my-4">
          <div className="flex items-center justify-center">
            <input
              type="text"
              className="input input-bordered w-full max-w-md"
              value={shortenedUrl}
              readOnly
            />
            <button
              type="submit"
              className="btn btn-primary mx-5"
              disabled={loading}
              onClick={() => { navigator.clipboard.writeText(shortenedUrl) }}
            >
              Copy
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary my-5"
            disabled={loading}
            onClick={reset}
          >
            Shorten Another
          </button>
        </div>
      )
      }

      {!shortenedUrl &&
        <div className="flex flex-col items-center justify-center my-4">
          <div className="flex flex-col items-center justify-center">
            <form className="flex items-center justify-center" onSubmit={shortenUrl}>
              <input
                type="url"
                placeholder="paste a link to shorten it"
                className="input input-bordered w-full max-w-xs"
                value={url}
                disabled={loading}
                onChange={event => {
                  setUrl(event.target.value);
                }} />

              <button
                type="submit"
                className="btn btn-primary mx-5"
                disabled={loading}>
                Shorten
              </button>
            </form>
          </div>

          {loading && <div className="loader mx-4"></div>}

          {error && <div className="text-red-500">something is off. shorten again!</div>}
        </div>
      }
    </main >
  );
}
