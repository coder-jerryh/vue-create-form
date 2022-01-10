<template>
  <!-- ---------- 时间选择器 ---------- -->
  <el-time-picker
    :is-range="item.type === 'timerange'"
    v-model="value[itemKey]"
    :picker-options="parent.getPickerOptions(item)"
    :start-placeholder="`${item.label.replace('时间', '')}开始时间`"
    :end-placeholder="`${item.label.replace('时间', '')}结束时间`"
    :placeholder="parent.getPlaceholder(item)"
    :format="item.format || 'HH:mm:ss'"
    :value-format="item.format || 'HH:mm:ss'"
    :disabled="parent.getBoolean(item.disabled)"
    @change="parent.getEvent(item, 'change', $event)"/>
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
  created () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
