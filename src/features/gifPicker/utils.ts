import {logger} from '#/logger'

/**
 * Rewrites a provider's CDN URL (Tenor or Klipy) to the corresponding
 * bsky proxy hostname. Leaves unrecognized hosts untouched.
 */
export function gifPreviewUrl(gifUrl: string) {
  try {
    const url = new URL(gifUrl)
    if (url.hostname === 'media.tenor.com') {
      url.hostname = 't.gifs.naschat.app'
      return url.href
    }
    if (url.hostname === 'static.klipy.com') {
      url.hostname = 'k.gifs.naschat.app'
      return url.href
    }
    return gifUrl
  } catch (e) {
    logger.debug('invalid url passed to gifPreviewUrl()')
    return ''
  }
}

/**
 * Rewrites a KLIPY static CDN URL through the bsky proxy
 * (k.gifs.naschat.app) so downstream consumers can route requests
 * through NasChat-owned infrastructure.
 */
export function klipyUrlToBskyGifUrl(klipyUrl: string) {
  let url
  try {
    url = new URL(klipyUrl)
  } catch (e) {
    logger.debug('invalid url passed to klipyUrlToBskyGifUrl()')
    return ''
  }
  url.hostname = 'k.gifs.naschat.app'
  return url.href
}
