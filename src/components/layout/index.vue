<template>
  <Layout class="layout">
    <Sider ref="sider" hide-trigger collapsible :width="256" :collapsed-width="78" v-model="isCollapsed">
      <div class="logo-con">
        <img src="@images/logo.png" alt="">
        <span>Back Manage System</span>
      </div>
      <Menu :active-name="$route.path" theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem name="/" to="/">
        <Icon type="ios-home"></Icon>
        <span>首页</span>
        </MenuItem>
        <MenuItem name="/description" to="/description">
        <Icon type="ios-search"></Icon>
        <span>描述列表</span>
        </MenuItem>
        <MenuItem name="/pHeader" to="/pHeader">
        <Icon type="ios-search"></Icon>
        <span>pageHeader</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <Header :style="{padding: 0}" class="layout-header-bar">
        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
      </Header>
      <Content :style="{margin: '20px', background: '#fff', padding: '20px'}">
        <router-view></router-view>
      </Content>
    </Layout>
  </Layout>
</template> 
<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    collapsedSider() {
      this.$refs.sider.toggleCollapse();
    },
  },
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .logo-con {
    padding: 15px 20px;
    color: #fff;
    display: flex;
    align-items: center;
    img {
      width: 34px;
    }
    span {
      margin-left: 10px;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  display: none;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>

