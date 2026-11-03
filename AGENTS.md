# AGENTS.md

Personal site [malanius.dev](https://malanius.dev): a static Astro 5 site in `website/`, hosted on S3
and CloudFront, with the AWS CDK app at the repo root. `README.md` is the full reference (content
formats, styling, infra, pipeline). Read the relevant section there before changing an area; this
file lists the rules and the traps.

## Version control: jj, not git

The repo is jj (Jujutsu) colocated with git. **Use jj for every change, commit and push.**

- git shows a detached `HEAD` ("no branch"). That's normal under jj. Don't `git checkout main`,
  `git commit` or `git push`; they work against jj's state.
- jj snapshots the working copy automatically. There is no staging area and no `git add`. Any new
  file that isn't in `.gitignore` gets tracked, so don't leave scratch files in the repo.
- The working copy `@` is a change of its own. A normal cycle:

  ```sh
  jj st                                   # what changed
  jj diff                                 # the changes
  jj commit -m "feat(web): …"             # finish @, start a new empty change
  jj commit <paths> -m "…"                # commit only these files
  jj bookmark set main -r @-              # move main to the commit just made
  jj git push                             # push the main bookmark
  ```

- **lefthook hooks don't run under jj.** They are git hooks (Biome on staged files, commitlint on
  the message). Run the checks yourself before committing (see [checks](#checks)).
- Unfinished blog posts live on a side change off `main` (`jj new main -m "draft: …"`), never on
  `main`. There's no draft flag, so every file in `website/src/content/blog/` gets published.

## Pushing to main deploys to production

`.github/workflows/deploy.yaml` runs on every push to `main` and deploys with no approval gate.
Ask before pushing unless the user has said to push. There's no staging or preview environment.

Never run `mise run deploy`, `cdk deploy` or `cdk destroy` unless asked. `mise run diff` is
read-only but needs AWS credentials (`AWS_PROFILE=malanius`).

## Commit messages

Conventional Commits, enforced by commitlint (`@commitlint/config-conventional`). Conventions
from the history:

- `(web)` scope for the Astro site: pages, components, data, content.
- `(cdk)` scope for the CDK app in `src/`.
- `ci:` type, no scope, for `.github/workflows/`.
- `chore(biome|mise|gitignore):` for tool config; `docs:` for the README.

Imperative subject, no trailing period. The subject must not start with a capital letter, even
for a filename: `docs: agent guide in AGENTS.md`, not `docs: AGENTS.md for agents`. Examples: `feat(web): spectra project`,
`fix(cdk): trust GitHub's immutable OIDC subject for the deploy role`. One logical change per
commit.

Check a message with `echo "feat(web): …" | bunx commitlint`.

## Checks

Tools come from mise (`.mise.toml`): node 26, bun, aws-cdk. bun is the package manager everywhere;
don't use npm or yarn, and don't create `package-lock.json` or `yarn.lock`.

```sh
bun install && bunx projen web:install   # dependencies for the CDK app and the site
bunx projen check                        # Biome format + lint on the whole repo (writes fixes)
mise run web:build                       # build the site into website/dist/; fails on bad frontmatter
bunx projen compile                      # type-check the CDK app
bunx cdk synth                           # synthesize the stacks (site must be built first)
```

Before committing, run `bunx projen check` plus the build for whatever you touched:
`mise run web:build` for `website/`, `bunx projen compile` for `src/`. There are no real tests
(`test/main.test.ts` is a placeholder).

To see a change in the browser, `mise run web` starts the dev server on <http://localhost:4321>.
Check layout changes down to 320px wide and in both light and dark themes.

## Generated files: change the source

projen generates `package.json`, `tsconfig.json`, `cdk.json`, `biome.jsonc`, `.gitignore`,
`.gitattributes`, `.npmignore`, `LICENSE` and `.projen/*`. Each says so at the top. Edit
`.projenrc.ts` (or `projenrc/biome.ts`, `projenrc/cdk.ts`), then run `bunx projen`. Add root
dependencies through `deps`/`devDeps` in `.projenrc.ts`, not `bun add`.

`website/` is not managed by projen. Edit its `package.json` normally and use `bun add` in
`website/`.

## Website conventions

- **Site data** is hand-edited TypeScript in `website/src/data/`: `projects.ts`, `skills.ts`,
  `socials.ts`, `blogCategories.ts`, `brandIcons.ts`. Order in the file is order on the page.
- **Projects** (`projects.ts`): four lists (`code`, `contributions`, `maker`, `creative`). Entries
  are grouped by `status`: active, wip, planned, done, archived. Before writing an entry, read the
  project's own README and code. The description is one or two plain sentences on what it does
  and what makes it interesting, no marketing words. Link GitHub repos with `github('<repo>')`.
  Reuse an entry from the `tech` map, or add one there.
- **Colors** are Catppuccin CSS variables (`var(--peach)` etc., list in `global.css`). Never use
  hex values in components; both themes depend on the variables.
- **Icons**: Font Awesome 6.5.2 free classes, or `si-*` keys from `brandIcons.ts` (Simple Icons
  paths) for brands Font Awesome lacks.
- **Grids** use `minmax(0, 1fr)`, not `1fr`.
- **Blog posts**: `website/src/content/blog/<slug>.md`, frontmatter validated by
  `website/src/content.config.ts`. Images sit next to the post with relative paths and need alt
  text.
- **The garden is hidden** (`website/src/pages/_garden/`), and its notes are placeholders. Leave it
  alone unless asked. Don't use `[[wikilinks]]` in blog posts; they link to the hidden garden.
- **Now playing** fetches from MAL and Trello at build time. Without `MAL_CLIENT_ID` in
  `website/.env`, the build warns `[mal]` and falls back to the cache. That's expected locally,
  not an error to fix. Never commit `.env` or print its contents.
- Biome leaves `.astro` HTML templates and Markdown unformatted on purpose (README, quick start).
  Keep the existing formatting in those by hand.

## CDK conventions

- App entry `src/main.ts`, the prod stage and its stacks in `src/app.stage.ts`. One `prod`
  environment, region `eu-west-1`; the certificate stack is in `us-east-1`.
- The content stack reads bucket and distribution IDs from SSM parameters written by the infra
  stack. Keep the two decoupled; don't pass them as cross-stack references.
- The deploy role trusts GitHub's immutable OIDC subject for `main` only (`src/app.stage.ts`). CI
  can't fix a broken role; it has to be redeployed locally.
- CDK and library versions are pinned in `.projenrc.ts` (`cdkVersion` and friends).

## Docs

When a change affects how something works (a new data field, task, stack or workflow step),
update the matching README section in the same commit.
