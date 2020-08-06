<template>
  <div>
    <div class="page-header">
      <div class="body">
        <Icon class="back" type="md-arrow-round-back" size="20" v-if="isBack" @click="onBack" />
        <span class="title">{{title}}</span>
        <span class="subtitle">{{subtitle}}</span>
        <slot name="tags"></slot>
      </div>
      <div class="extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    backUrl: {
      type: [Number, String],
      default: -1,
    },
    isBack: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onBack() {
      if (typeof this.backUrl === "number") {
        this.$router.go(this.backUrl);
      }
      if (typeof this.backUrl === "string") {
        this.$router.push(this.backUrl);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.page-header {
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .body {
    .back {
      margin-right: 10px;
    }
    .title {
      margin-right: 12px;
      font-size: 20px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
    }
    .subtitle {
      margin-right: 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }
  .extra {
    /deep/ .ivu-btn {
      margin-left: 12px;
    }
  }
}
</style>

