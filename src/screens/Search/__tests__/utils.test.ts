import {describe, expect, it} from '@jest/globals'

import {parseSearchQuery} from '#/screens/Search/utils'

describe(`parseSearchQuery`, () => {
  const tests = [
    {
      input: `naschat`,
      output: {query: `naschat`, params: {}},
    },
    {
      input: `naschat from:esb.lol`,
      output: {query: `naschat`, params: {from: `esb.lol`}},
    },
    {
      input: `naschat "from:esb.lol"`,
      output: {query: `naschat "from:esb.lol"`, params: {}},
    },
    {
      input: `naschat mentions:@esb.lol`,
      output: {query: `naschat`, params: {mentions: `@esb.lol`}},
    },
    {
      input: `naschat since:2021-01-01:00:00:00`,
      output: {query: `naschat`, params: {since: `2021-01-01:00:00:00`}},
    },
    {
      input: `naschat lang:"en"`,
      output: {query: `naschat`, params: {lang: `en`}},
    },
    {
      input: `naschat "literal" lang:en "from:invalid"`,
      output: {query: `naschat "literal" "from:invalid"`, params: {lang: `en`}},
    },
  ]

  it.each(tests)(
    `$input -> $output.query $output.params`,
    ({input, output}) => {
      expect(parseSearchQuery(input)).toEqual(output)
    },
  )
})
