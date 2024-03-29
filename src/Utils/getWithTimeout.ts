interface Options extends RequestInit {
  /** timeout, default: 8000ms */
  timeout?: number;
}

export async function getWithTimeout(
  resource: RequestInfo | URL,
  options: Options = {}
) {
  const { timeout } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    mode: 'no-cors',
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}
