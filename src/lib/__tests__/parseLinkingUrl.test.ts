import {describe, expect, it} from '@jest/globals'

import {parseLinkingUrl} from '../parseLinkingUrl'

describe('parseLinkingUrl', () => {
  it('should correctly parse naschat:// URLs', () => {
    const url =
      'naschat://intent/age-assurance?result=success&actorDid=did:example:123'
    const urlp = parseLinkingUrl(url)
    expect(urlp.protocol).toBe('naschat:')
    expect(urlp.host).toBe('')
    expect(urlp.pathname).toBe('/intent/age-assurance')
  })

  it('should correctly parse standard URLs', () => {
    const url =
      'https://naschatai.com/intent/age-assurance?result=success&actorDid=did:example:123'
    const urlp = parseLinkingUrl(url)
    expect(urlp.protocol).toBe('https:')
    expect(urlp.host).toBe('naschatai.com')
    expect(urlp.pathname).toBe('/intent/age-assurance')
  })
})
