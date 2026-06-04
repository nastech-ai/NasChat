export function parseLinkingUrl(url: string): URL {
  /*
   * Hack: add a third slash to naschat:// urls so that `URL.host` is empty and
   * `URL.pathname` has the full path.
   */
  if (url.startsWith('naschat://') && !url.startsWith('naschat:///')) {
    url = url.replace('naschat://', 'naschat:///')
  }
  return new URL(url)
}
