<template>
  <!-- 动态表单 -->
  <section class="dynamicForm">
    <el-button
      v-if="dynamic"
      class="add"
      :style="{'--label-length': labelLen}"
      :prevent='false'
      type="text"
      plain
      @click="addItem"
      :disabled='(item.max == list.length) || item.disabled'
    >(<i class="el-icon-plus"></i><i>添加</i>)</el-button>
    <ul :class="item.className">
      <li :class="`el-col-${item.itemSpan || 24}`" v-for="(dynamicItem, dynamicI) in list" :key="dynamicI">
        <slot :dynamicI='dynamicI'/>
        <el-button
          v-if="dynamic"
          class="del"
          plain
          :prevent='false'
          type="danger"
          icon="el-icon-close"
          :disabled='(item.min == list.length) || item.disabled'
          @click="removeItem(dynamicItem, dynamicI)"/>
      </li>
    </ul>
  </section>
</template>

<script>
import {deepCopy} from '../utils/index.js'
export default {
  props: {
    item: Object,
    /** @item
      defaultValue: 点击添加生成的默认值
      dynamic: 动态性
      max: 最大添加数量
      min: 最小添加数量
      disabled: 禁用
      itemSpan: 布局分栏数
      onAdd: 监听添加
      onRemove: 监听移除
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
    },
    dynamic () {
      const dynamic = this.item.dynamic
      if (typeof dynamic === 'function') {
        return dynamic()
      } else if (dynamic === undefined) {
        return true
      } else {
        return dynamic
      }
    }
  },
  methods: {
    // 添加
    addItem () {
      // 无onAdd事件或者onAdd事件无返回值时直接移除
      // 返回false时，拦截移除
      // onAdd事件需用箭头函数声明
      const onAdd = this.item.onAdd && this.item.onAdd()
      if (onAdd !== false) {
        this.list.push(deepCopy(this.item.defaultValue || {}))
      }
    },
    // 移除
    removeItem (item, i) {
      // 无onRemove事件或者onRemove事件无返回值时直接移除
      // 返回false时，拦截移除
      // onRemove事件需用箭头函数声明
      const onRemove = this.item.onRemove && this.item.onRemove(item)
      if (onRemove !== false) {
        this.list.splice(i, 1)
      }
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
      &[disabled] {
        color: #C0C4CC;
      }
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
      margin: 4px -6px -10px;
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
