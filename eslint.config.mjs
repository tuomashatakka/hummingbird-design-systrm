import config from '@tuomashatakka/eslint-config'


export default [
  ...Array.isArray(config) ? config : [ config ],
  {
    ignores: [ '**/.next/**', '**/out/**', '**/dist/**', '**/node_modules/**', '**/next-env.d.ts' ],
  },
]
