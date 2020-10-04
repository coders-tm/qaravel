// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default async ({ Vue }) => {
  console.log('loading components')
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireComponent = require.context(
    // Look for files in the current directory
    '../components',
    // Look in subdirectories
    true,
    // Match .vue viles
    /[\w-]+\.vue$/
  )

  // For each matching file name...
  requireComponent.keys().forEach((fileName) => {
    // Get the component config
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '') // remove file extension
      )
    )

    // Globally register the component
    Vue.component(
      componentName,
      componentConfig.default || componentConfig
    )
  })
}
