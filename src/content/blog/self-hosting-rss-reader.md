---
title: Self-hosting my RSS reader was worth it
date: 2026-07-12
category: tech
tags: [selfhosting, rss]
---

I finally moved off the hosted reader I'd been using since 2019. Partly for the usual self-hosting reasons, partly because I wanted my now-playing widget to pull from the same database.

The setup is a single container behind a reverse proxy. Deploying it looked roughly like:

```yaml
# docker-compose.yml
services:
  miniflux:
    image: miniflux/miniflux:latest
```

> The best sync service is the one where you can read the sync code.

Total migration time: one evening and two episodes of Frieren. No regrets so far. <span class="kaomoji">(´。• ᵕ •。`)</span>
