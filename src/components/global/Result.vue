<template>
    <div class="result-wrapper">
        <div class="icon" :class="[`icon-${status}`]">
            <Icon :type="iconType(status)" />
        </div>
        <div class="title" v-if="title">{{title}}</div>
        <div class="subtitle" v-if="subtitle">{{subtitle}}</div>
        <div class="extra" v-if="$slots.extra">
            <slot name="extra"></slot>
        </div>
        <div class="actions" v-if="$slots.actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    status: {
      type: String,
      default: "info",
      validator: value => {
        return ["info", "success", "warning", "error"].includes(value);
      },
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
  computed: {
    iconType() {
      return function(type) {
        let obj = {
          info: "md-alert",
          success: "md-checkmark",
          warning: "md-alert",
          error: "md-close",
        };
        return obj[type];
      };
    },
  },
};
</script>

<style lang="less" scoped>
.result-wrapper {
  width: 72%;
  margin: 0 auto;
  text-align: center;
  .icon {
    margin: 0 auto 24px;
    i {
      font-size: 60px;
      color: #fff;
      width: 72px;
      height: 72px;
      text-align: center;
      line-height: 72px;
      background: #1890ff;
      border-radius: 50%;
    }
  }
  .icon-success i {
    background: #19be6b;
  }
  .icon-error i {
    background: #ed4014;
  }
  .icon-warning i {
    background: #f90;
  }
  .title {
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }
  .subtitle {
    margin-bottom: 24px;
    color: #808695;
    font-size: 14px;
    line-height: 22px;
  }
  .extra {
    padding: 24px 40px;
    text-align: left;
    background: #f8f8f9;
    border-radius: 4px;
  }
  .actions {
    margin-top: 30px;
    /deep/ .ivu-btn {
      margin: 0 10px;
    }
  }
}
</style>
