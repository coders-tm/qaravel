import { boot } from 'quasar/wrappers'
import vNumber from '@coders-tm/vue-number-format'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(vNumber)
})
