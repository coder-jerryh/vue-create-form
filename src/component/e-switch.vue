<template>
  <!-- ---------- switch开关 ---------- -->
  <el-switch
    v-model="value[itemKey]"
    :disabled="parent.getBoolean(item.disabled)"
    :active-value="item.activeValue"
    :inactive-value="item.inactiveValue"
    @change="item.onChange && item.onChange($event, value)"
  />
</template>

<script>
export default {
  props: {
    item: Object,
    itemKey: String,
    value: Object
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
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
