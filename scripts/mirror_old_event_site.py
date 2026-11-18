from __future__ import annotations

import re
import sys
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote

import requests
from bs4 import BeautifulSoup

SOURCE = "https://biofuels-energy.magnusconferences.com"
ROOT = Path(__file__).resolve().parents[1] / "client/public/event-site/mirror"
ASSET_ROOT = Path(__file__).resolve().parents[1] / "client/public/event-site"
MAX_PAGES = 120

session = requests.Session()
session.headers.update({"User-Agent": "Velentra local event-site mirror/1.0"})


def is_internal(url: str) -> bool:
    parsed = urlparse(url)
    return parsed.scheme in {"http", "https"} and parsed.netloc.lower() == urlparse(SOURCE).netloc.lower()


def route_path(url: str) -> str:
    path = unquote(urlparse(url).path or "/").strip("/")
    return path or "index"


def page_file(url: str) -> Path:
    return ROOT / route_path(url) / "index.html"


def local_asset_file(url: str) -> Path | None:
    parsed = urlparse(url)
    if not is_internal(url):
        return None
    path = unquote(parsed.path).lstrip("/")
    if not path or path.endswith("/"):
        return None
    return ASSET_ROOT / path


def rewrite_html(html: str) -> str:
    html = html.replace(SOURCE, "")
    html = re.sub(r'(["\'(])/(assets-front|uploads)/', r'\1/event-site/\2/', html)
    html = html.replace('src="/reference-clone.js"', 'src="/event-site/reference-clone.js"')
    html = html.replace("src='/reference-clone.js'", "src='/event-site/reference-clone.js'")
    injection = '<script src="/event-site/preview-config.js"></script><script src="/event-site/event-sync.js"></script>'
    if injection not in html:
        html = html.replace("</body>", injection + "</body>")
    return html


def save_asset(url: str) -> None:
    target = local_asset_file(url)
    if target is None or target.exists():
        return
    try:
        response = session.get(url, timeout=30)
        response.raise_for_status()
    except Exception as exc:
        print(f"asset skip {url}: {exc}", file=sys.stderr)
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(response.content)
    print(f"asset {target.relative_to(ASSET_ROOT)}")


def crawl() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    queue = deque([SOURCE + "/"])
    seen: set[str] = set()
    downloaded = 0
    while queue and downloaded < MAX_PAGES:
        url = queue.popleft()
        parsed = urlparse(url)
        canonical = f"{SOURCE}{parsed.path or '/'}"
        if canonical in seen:
            continue
        seen.add(canonical)
        try:
            response = session.get(canonical, timeout=30)
            response.raise_for_status()
        except Exception as exc:
            print(f"page skip {canonical}: {exc}", file=sys.stderr)
            continue
        content_type = response.headers.get("content-type", "")
        if "text/html" not in content_type and not canonical.endswith("/"):
            save_asset(canonical)
            continue
        html = response.text
        target = page_file(canonical)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(rewrite_html(html), encoding="utf-8")
        downloaded += 1
        print(f"page {target.relative_to(ROOT)}")
        soup = BeautifulSoup(html, "html.parser")
        for node in soup.select("a[href], img[src], script[src], link[href], source[src], video[poster]"):
            raw = node.get("href") or node.get("src") or node.get("poster")
            if not raw or raw.startswith(("#", "mailto:", "tel:", "javascript:")):
                continue
            absolute = urljoin(canonical, raw)
            if is_internal(absolute):
                path = urlparse(absolute).path or "/"
                if Path(path).suffix.lower() in {".html", ".htm"} or not Path(path).suffix:
                    queue.append(f"{SOURCE}{path}")
                else:
                    save_asset(absolute)
    print(f"mirrored {downloaded} pages into {ROOT}")


if __name__ == "__main__":
    crawl()
