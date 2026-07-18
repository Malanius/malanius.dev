---
title: nix-flakes
stage: budding
tags: [nix, tooling]
planted: 2026-03-02
tended: 2026-07-09
---

Flakes are Nix's answer to "it works on my machine" — a lockfile for your entire system. My mental model: a flake is a [[pure-function]] from pinned inputs to build outputs.

Still figuring out: how flakes interact with [[home-manager]], and whether I should split my config per host. Current answer: probably, eventually. <span class="kaomoji">(￣ヘ￣)</span>

```
$ nix flake update && nixos-rebuild switch
```
