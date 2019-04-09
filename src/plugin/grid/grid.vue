<script>
export default {
  name: 'MGrid',

  props: {
    columns: {
      type: String
    },
    rows: {
      type: String
    }
  },
  render () {
    return (
      <div class="grid-container" style={{ gridTemplateColumns: this.columns, gridTemplateRows: this.rows }}>
        {
          this.$slots.default
        }
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.grid-container {
  display: grid;
}
</style>