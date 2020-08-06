<template>
  <div class="descriptions-item" :style="{width}">
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
    let { column, bordered } = this.$parent;
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
</style>
