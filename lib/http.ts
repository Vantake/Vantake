type FetcherInit = RequestInit & { timeoutMs?: number }

export async function fetchJson<T>(input: RequestInfo | URL, init: FetcherInit = {}): Promise<T> {
  const { timeoutMs = 15_000, ...rest } = init
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(input, { ...rest, signal: controller.signal })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Request failed: ${res.status} ${res.statusText}${text ? ` — ${text}` : ''}`)
    }
    return (await res.json()) as T
  } finally {
    clearTimeout(t)
  }
}
