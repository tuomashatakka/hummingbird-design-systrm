import config from '@tuomashatakka/eslint-config'

export default [
  ...(Array.isArray(config) ? config : [ config ]),
  {
    ignores: [ '.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts' ],
  },
]
