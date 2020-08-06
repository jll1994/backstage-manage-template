<template>
  <div class="descriptions" :class="{'descriptions-bordered':bordered,'descriptions-vertical':layout==='vertical'}">
    <div class="title">{{title}}</div>
    <slot/>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    layout: {
      type: String,
      default: "horizontal",
    },
    column: {
      type: Number,
      default: 3,
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="less">
.descriptions {
  overflow: hidden;
  .title {
    color: #333;
    font-weight: 700;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 16px;
  }
  .descriptions-item {
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
}
.descriptions-bordered {
  .descriptions-item {
    display: flex;
    padding-bottom: 0;
    .label {
      flex: 200px 0 0;
      background: #fafafa;
      padding: 16px 24px;
      border: 1px solid #f0f0f0;
      &:after {
        display: none;
      }
    }
    .content {
      flex: 1;
      padding: 16px 24px;
      border: 1px solid #f0f0f0;
    }
  }
}
.descriptions-vertical {
  .descriptions-item {
    display: block;
    .label,
    .content {
      margin-bottom: 12px;
    }
  }
}
</style>


