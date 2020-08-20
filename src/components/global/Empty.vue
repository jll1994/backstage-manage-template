<template>
    <div class="empty-wrapper">
        <div class="image">
            <img :src="src" alt="" :style="imageStyle">
        </div>
        <p class="desc" v-if="desc">
            <slot name="desc">{{desc}}</slot>
        </p>
        <div class="extra" v-if="$slots.extra">
            <slot name="extra"></slot>
        </div>
    </div>
</template>
<script>
import empty from "@images/empty.png";
export default {
  props: {
    src: {
      type: String,
      default: empty,
    },
    imageStyle: {
      type: Object, 
      default: () => ({}),
    },
    desc: {
      type: String,
      default: "暂时还没有数据哟",
    },
  },
};
</script>
<style lang="less" scoped>
.empty-wrapper {
  margin: 0 auto;
  text-align: center;
  .image {
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .desc {
    color: #999;
    font-size: 14px;
  }
  .extra {
    margin-top: 12px;
    /deep/ .ivu-btn {
      margin: 0 8px;
    }
  }
}
</style>

