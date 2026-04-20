import { readdir, readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { join } from "node:path";
import { execSync } from "node:child_process";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const PACKAGES_DIR = join(ROOT, "packages");
const OUT_DIR = join(ROOT, "doc-dist");
const PKG_DOC_DIR = "doc-dist";

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function readPkgJson(dir) {
  try {
    return JSON.parse(await readFile(join(dir, "package.json"), "utf-8"));
  } catch {
    return null;
  }
}

async function main() {
  execSync("pnpm -r --if-present run build", {
    cwd: ROOT,
    stdio: "inherit",
  });
  execSync("pnpm -r --if-present run doc:build", {
    cwd: ROOT,
    stdio: "inherit",
  });

  await mkdir(OUT_DIR, { recursive: true });

  const entries = (await readdir(PACKAGES_DIR, { withFileTypes: true })).filter(
    (e) => e.isDirectory(),
  );

  const packages = await Promise.all(
    entries.map(async (entry) => {
      const name = entry.name;
      const pkgDir = join(PACKAGES_DIR, name);
      const pkg = await readPkgJson(pkgDir);
      if (!pkg) return null;

      const description = pkg.description || "";
      try {
        await cp(join(pkgDir, PKG_DOC_DIR), join(OUT_DIR, name), {
          recursive: true,
        });
        return { name, description, href: `${name}/index.html` };
      } catch {
        return { name, description, href: null };
      }
    }),
  ).then((results) => results.filter(Boolean));
  await writeFile(join(OUT_DIR, "index.html"), buildIndex(packages));

  console.log(`Assembled docs for ${packages.length} packages -> ${OUT_DIR}`);
}

function buildIndex(packages) {
  const items = packages
    .map((pkg) => {
      const name = escapeHtml(pkg.name);
      const desc = pkg.description
        ? `<span class="desc">${escapeHtml(pkg.description)}</span>`
        : "";
      if (pkg.href) {
        return `<li><a href="${pkg.href}">${name}</a>${desc}</li>`;
      }
      return `<li><span class="name">${name}</span>${desc}</li>`;
    })
    .join("\n        ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>RNA Docs</title>
  <style>
    :root {
      --fg: #2c2c2c;
      --fg-muted: #6b6b6b;
      --bg: #fdfdfd;
      --accent: #3b5998;
      --border: #e5e5e5;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --fg: #e0e0e0;
        --fg-muted: #999;
        --bg: #1a1a1a;
        --accent: #7fa8d4;
        --border: #333;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: var(--fg);
      background: var(--bg);
      line-height: 1.7;
      max-width: 600px;
      margin: 0 auto;
      padding: 4rem 1.5rem;
    }
    h1 { font-size: 1.8rem; font-weight: 600; letter-spacing: -0.02em; }
    .subtitle { color: var(--fg-muted); margin-top: 0.25rem; font-size: 1rem; }
    ul { list-style: none; margin-top: 2.5rem; }
    li {
      padding: 0.6rem 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    li:first-child { border-top: 1px solid var(--border); }
    a, .name { font-weight: 500; font-size: 1.05rem; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .name { color: var(--fg-muted); }
    .desc { color: var(--fg-muted); font-size: 0.85rem; }
    footer { margin-top: 3rem; font-size: 0.8rem; color: var(--fg-muted); }
    footer a { color: var(--fg-muted); font-size: 0.8rem; }
  </style>
</head>
<body>
  <header>
    <h1>RNA</h1>
    <p class="subtitle">Reusable Nucleus Abstractions</p>
  </header>
  <nav>
    <ul>
        ${items}
    </ul>
  </nav>
  <footer>
    <p>Built from <a href="https://github.com/hdnax/rna">source</a></p>
  </footer>
</body>
</html>`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
