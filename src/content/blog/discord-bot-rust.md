---
title: Writing a Discord bot in Rust for no reason
date: 2025-10-11
category: tech
tags: [rust, projects]
---

There are two kinds of side projects: the ones that solve a problem, and the ones where the language *is* the problem you wanted. This was the second kind.

The bot does one thing: it posts in our server when a new episode of whatever we're watching airs. A cron job and a webhook could do this in eleven lines of Python. Instead I have a tokio runtime, a typed command framework, and opinions about serde.

```rust
#[command]
async fn airing(ctx: Context<'_>) -> Result<(), Error> {
    let next = schedule::next_episode().await?;
    ctx.say(format!("{} airs in {}", next.title, next.eta)).await?;
    Ok(())
}
```

Was it worth it? The bot has never crashed, which is more than I can say for the eleven-line Python version it replaced. The compiler and I are friends now. This is how they get you.
