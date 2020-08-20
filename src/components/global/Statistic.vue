<template>
    <div class="statistic">
        <div class="title">{{title}}</div>
        <div class="content">
            <span class="prefix" :style="valueStyle">
                {{prefix}}
                <slot name="prefix" v-if="$slots.prefix"></slot>
            </span>
            <span class="value" :style="valueStyle">{{value}}</span>
            <span class="suffix" :style="valueStyle">
                {{suffix}}
                <slot name="suffix" v-if="$slots.suffix">{{suffix}}</slot>
            </span>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: 0,
    },
    valueStyle: {
      type: Object,
      default: () => ({}),
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="less" scoped>
.statistic {
  .title {
    margin-bottom: 4px;
    color: #999;
    font-size: 14px;
  }
  .content {
    .prefix {
      margin-right: 4px;
    }
    .value {
      font-size: 24px;
    }
    .suffix {
      margin-left: 4px;
      font-size: 16px;
    }
  }
}
</style>
