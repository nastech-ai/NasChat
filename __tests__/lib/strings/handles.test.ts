import {type IsValidHandle, validateServiceHandle} from '#/lib/strings/handles'

describe('handle validation', () => {
  const valid = [
    ['ali', 'naschat.social'],
    ['alice', 'naschat.social'],
    ['a-lice', 'naschat.social'],
    ['a-----lice', 'naschat.social'],
    ['123', 'naschat.social'],
    ['123456789012345678', 'naschat.social'],
    ['alice', 'custom-pds.com'],
    ['alice', 'my-custom-pds-with-long-name.social'],
    ['123456789012345678', 'my-custom-pds-with-long-name.social'],
  ]
  it.each(valid)(`should be valid: %s.%s`, (handle, service) => {
    const result = validateServiceHandle(handle, service)
    expect(result.overall).toEqual(true)
  })

  const invalid = [
    ['al', 'naschat.social', 'frontLengthNotTooShort'],
    ['-alice', 'naschat.social', 'hyphenStartOrEnd'],
    ['alice-', 'naschat.social', 'hyphenStartOrEnd'],
    ['%%%', 'naschat.social', 'handleChars'],
    ['1234567890123456789', 'naschat.social', 'frontLengthNotTooLong'],
    [
      '1234567890123456789',
      'my-custom-pds-with-long-name.social',
      'frontLengthNotTooLong',
    ],
    ['al', 'my-custom-pds-with-long-name.social', 'frontLengthNotTooShort'],
    ['a'.repeat(300), 'toolong.com', 'totalLength'],
  ] satisfies [string, string, keyof IsValidHandle][]
  it.each(invalid)(
    `should be invalid: %s.%s due to %s`,
    (handle, service, expectedError) => {
      const result = validateServiceHandle(handle, service)
      expect(result.overall).toEqual(false)
      expect(result[expectedError]).toEqual(false)
    },
  )
})
