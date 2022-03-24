import { h } from 'vue'

import useSpinner, { useSpinnerProps } from 'quasar/src/components/spinner/use-spinner.js'

import { createComponent } from 'quasar/src/utils/private/create.js'

export default createComponent({
  name: 'QSpinnerGradient',

  props: useSpinnerProps,

  setup (props) {
    const { cSize, classes } = useSpinner(props)

    return () => h('div', {
      class: classes.value + " q-spinner q-spinner-mat q-notification__spinner gradient-spinner border-gradient-spinner",
    })
  }
})
