export default function (propName = 'show', dataName = 'mixIsShow') {
  return {
    props: {
      [propName]: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        [dataName]: false
      }
    },
    watch: {
      [propName]: {
        handler (val) {
          this[dataName] = val
        },
        immediate: true
      },
      [dataName]: {
        handler (val) {
          this.$emit(`update:${propName}`, val)
        },
        immediate: true
      }
    }
  }
}
