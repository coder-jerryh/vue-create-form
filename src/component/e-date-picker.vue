<template>
  <!-- ---------- 日期选择器 ---------- -->
  <!-- :picker-options="pickerOptions" -->
  <el-date-picker
    :type='item.type'
    v-model="value[itemKey]"
    :default-time="item.type == 'datetimerange' ? ['00:00:00', '23:59:59'] : ''"
    range-separator="至"
    :start-placeholder="`${item.label.replace('时间', '')}开始时间`"
    :end-placeholder="`${item.label.replace('时间', '')}结束时间`"
    :placeholder="parent.getPlaceholder(item)"
    :format="item.format || DateFormat[item.type]"
    :value-format="item.format || DateFormat[item.type]"
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
      DateFormat: {
        year: 'yyyy',
        month: 'MM',
        date: 'yyyy-MM-dd',
        daterange: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        datetimerange: 'yyyy-MM-dd HH:mm:ss'
      }
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
