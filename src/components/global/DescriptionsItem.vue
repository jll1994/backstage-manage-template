<template>
    <div class="descriptions-item" :class="{'item-default':layout==='horizontal','item-vertical':layout==='vertical'}" :style="{width}">
        <div class="label">{{label}}</div>
        <div class="content">
            <slot/>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      layout: "horizontal",
      width: "100%",
    };
  },
  props: {
    label: {
      type: String,
    },
    // 表示占据DescriptionsItem的宽度
    span: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    let { layout, column, bordered } = this.$parent;
    this.layout = layout;
    this.calcWidth(column, this.span);
  },
  methods: {
    calcWidth(column, span) {
      let percentage = 1 / column;
      if (span && span > 1) {
        this.width = span * percentage * 100 + "%";
      } else {
        this.width = percentage * 100 + "%";
      }
    },
  },
};
</script>
<style lang="less">
.item-default {
  float: left;
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  .label {
    color: #000;
    position: relative;
    &:after {
      content: ":";
      position: relative;
      top: -0.5px;
      margin: 0 8px 0 2px;
    }
  }
  .content {
    color: rgba(0, 0, 0, 0.65);
  }
}
.item-vertical {
  float: left;
  padding-bottom: 16px;
  .label {
    color: #000;
    position: relative;
    margin-bottom: 12px;
    &:after {
      content: ":";
      position: relative;
      top: -0.5px;
      margin: 0 8px 0 2px;
    }
  }
  .content {
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 12px;
  }
}
</style>
