---
title: docker-networking
stage: evergreen
tags: [docker, selfhosting]
planted: 2025-06-02
tended: 2026-04-22
---

The mental model that finally made Docker networking stop feeling like spellcasting:

- Every compose project gets its own bridge network; containers resolve each other by service name.
- Published ports are NAT rules on the host, nothing more.
- "Why can't the container reach the host?" — use the gateway IP, or `host.docker.internal` where supported.

Most of my self-hosting problems (see [[rss-everything]]) turn out to be DNS. It's always DNS.
