"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, BarChart3, Copy, ExternalLink, Trash2, Plus } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface Link {
  id: string;
  slug: string;
  url: string;
  title: string | null;
  createdAt: string;
  _count: {
    clicks: number;
  };
}

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLinks = async () => {
    const response = await fetch("/api/links");
    const data = await response.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, slug: customSlug || undefined }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create link");
      }

      setUrl("");
      setCustomSlug("");
      fetchLinks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const deleteLink = async (id: string) => {
    await fetch(`/api/links/${id}`, { method: "DELETE" });
    fetchLinks();
  };

  const copyToClipboard = async (slug: string, id: string) => {
    const shortUrl = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalClicks = links.reduce((sum, link) => sum + link._count.clicks, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <LinkIcon className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Hop</h1>
          </div>
          <p className="text-muted-foreground">
            Create short, memorable links in seconds
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Links</CardDescription>
              <CardTitle className="text-3xl">{links.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Clicks</CardDescription>
              <CardTitle className="text-3xl">{formatNumber(totalClicks)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Create Link Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Destination URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Custom Slug (optional)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {typeof window !== "undefined" ? window.location.origin : ""}/
                  </span>
                  <Input
                    id="slug"
                    type="text"
                    placeholder="my-link"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Link"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Links List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Your Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No links yet. Create your first one above!
              </p>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/${link.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          /{link.slug}
                        </a>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                          {link._count.clicks} clicks
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {link.url}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(link.slug, link.id)}
                        title="Copy short URL"
                      >
                        <Copy className={`h-4 w-4 ${copiedId === link.id ? "text-green-500" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        title="Open destination"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteLink(link.id)}
                        title="Delete link"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
