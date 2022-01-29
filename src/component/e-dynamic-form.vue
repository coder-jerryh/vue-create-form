<template>
  <!-- 动态表单 -->
  <section class="dynamicForm">
    <el-button
      class="add"
      :style="{'--label-length': labelLen}"
      :prevent='false'
      type="text"
      plain
      @click="list.push(item.defaultValue || {})"
      :disabled='(item.max == list.length) || item.disabled'
    >(<i class="el-icon-plus"></i><i>添加</i>)</el-button>
    <ul>
      <li :class="`el-col-${item.itemSpan || 24}`" v-for="(dynamicItem, dynamicI) in list" :key="dynamicI">
        <slot :dynamicI='dynamicI'/>
        <el-button
          class="del"
          plain
          :prevent='false'
          type="danger"
          icon="el-icon-close"
          :disabled='(item.min == list.length) || item.disabled'
          @click="list.splice(dynamicI, 1)"/>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  props: {
    item: Object,
    /** @item
      defaultValue: 点击添加生成的默认值
      max: 最大添加数量
      min: 最小添加数量
      disabled: 禁用
      itemSpan: 布局分栏数
    **/
    itemKey: String,
    value: Object
  },
  computed: {
    list () {
      return this.value[this.itemKey] || []
    },
    labelLen () {
      const label = this.item.label
      let len = 0
      for (let i = 0; i < label.length; i++) {
        len += label.charCodeAt(i) > 128 ? 2 : 1
      }
      return len
    }
  }
}
</script>

<style lang='scss' scoped>
  .dynamicForm {
    .add {
      position: absolute;
      top: -1px;
      transform: translate(6px, -100%);
      border: 0;
      left: calc(var(--label-length) * 7px + 10px);
      font-size: 14px;
      font-weight: normal;
      color: #67C23A;
      background: transparent;
      .el-icon-plus {
        font-weight: bold;
      }
      i {
        position: relative;
        top: 1px;
      }
      &:hover {
        opacity: .8;
      }
    }
    ul {
      margin: 4px -6px -20px;
      display: flex;
      flex-wrap: wrap;
      &:empty {
        margin-top: 10px;
      }
      @for $i from 1 to 25 {
        .el-col-#{$i}{
          width: calc(#{percentage(($i/24))} - 12px);
        }
      }
      li {
        margin: 0 6px;
        border: 1px solid #eceef4;
        margin-bottom: 10px;
        border-radius: 4px;
        background: #f8f8f8;
        position: relative;
        /deep/ .el-form {
          min-height: inherit;
          padding: 5px 4px 10px 10px;
          margin-right: 0;
          flex: 1;
          .el-form-item {
            &:not(.is-required) .el-form-item__label::before {
              display: none;
            }
          }
        }
        .del {
          position: absolute;
          right: -1px;
          top: -1px;
          border-radius: 1px 4px;
          width: 25px;
          height: 25px;
          padding: 0;
          font-size: 16px;
        }
      }
    }
  }
</style>
