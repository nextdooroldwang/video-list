
<script>
export default {
  name: 'MItem',
  data () {
    return {
      itemStyle: {
        gridColumn: this.column,
        gridRow: this.row
      }
    }
  },
  computed: {
    column (val) {
      return val
    },
    row (val) {
      return val
    }
  },
  render () {
    return (
      <div class="item-container" style={this.itemStyle}>
        {
          this.$slots.default
        }
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.item-container {
}
</style>