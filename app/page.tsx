'use client'

import { useState } from 'react';

interface ShortenedUrl {
  original: string;
  short: string;
  clicks: number;
  createdAt: Date;
}

export default function URLShortener() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const shortenUrl = () => {
    if (!url.trim()) return;

    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortUrl = `https://short.link/${shortCode}`;

    setUrls([{
      original: url,
      short: shortUrl,
      clicks: 0,
      createdAt: new Date()
    }, ...urls]);

    setUrl('');
  };

  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(shortUrl);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteUrl = (shortUrl: string) => {
    setUrls(urls.filter(u => u.short !== shortUrl));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2">🔗 URL Shortener</h1>
          <p className="text-gray-600 dark:text-gray-300">Make long links short and memorable</p>
        </div>

        {/* URL Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && shortenUrl()}
              placeholder="Paste your long URL here..."
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 dark:bg-gray-700"
            />
            <button
              onClick={shortenUrl}
              className="px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition transform hover:scale-105"
            >
              Shorten ✨
            </button>
          </div>
        </div>

        {/* URL List */}
        {urls.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Links</h2>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {urls.map((item, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 truncate">{item.original}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-lg font-semibold text-blue-600">{item.short}</p>
                        <button
                          onClick={() => copyToClipboard(item.short)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                        >
                          {copied === item.short ? '✓ Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteUrl(item.short)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-500">
                    <span>📊 {item.clicks} clicks</span>
                    <span>📅 {item.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-500">Instant shortening with one click</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Analytics</h3>
            <p className="text-sm text-gray-500">Track clicks and engagement</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Secure</h3>
            <p className="text-sm text-gray-500">HTTPS encryption on all links</p>
          </div>
        </div>
      </div>
    </div>
  );
}
