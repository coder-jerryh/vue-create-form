<template>
  <!-- 级联选择器 -->
  <el-cascader
    v-if="item.show()"
    :props="item.option"
    v-model="value[itemKey]"
    :placeholder="parent.getPlaceholder(item)"
    filterable
    clearable/>
</template>

<script>
export default {
  props: {
    item: Object,
    itemKey: String,
    value: Object,
  },
  inject: {
    parent: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
