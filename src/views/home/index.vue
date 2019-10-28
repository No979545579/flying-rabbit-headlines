<template>
  <div class="container">
    <el-container class="home-container">
      <el-aside :width="isOpen?'200px':'64px'">
        <div class="logo" :class="{smallLogo:!isOpen}"></div>
        <el-menu
          default-active="/"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
          :collapse="!isOpen"
          :collapse-transition="false"
          router
        >
          <el-menu-item v-for="(iteam,i) in menu" :key="i" :index="iteam.index">
            <i :class="iteam.icon"></i>
            <span slot="title">{{iteam.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 图标 -->
          <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
          <!-- 文字 -->
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单组件 -->
          <el-dropdown class="dropdown">
            <span class="el-dropdown-link">
              <img class="headIcon" src="../../assets/avatar.jpg" alt />
              <span class="userName">用户名</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        { id: '1', name: '首页', icon: 'el-icon-s-home', index: '/' },
        {
          id: '2',
          name: '内容管理',
          icon: 'el-icon-document',
          index: '/article'
        },
        { id: '3', name: '素材管理', icon: 'el-icon-picture', index: '/image' },
        {
          id: '4',
          name: '发布文章',
          icon: 'el-icon-s-promotion',
          index: '/publish'
        },
        {
          id: '5',
          name: '评论管理',
          icon: 'el-icon-chat-dot-round',
          index: '/comment'
        },
        {
          id: '6',
          name: '粉丝管理',
          icon: 'el-icon-present',
          index: '/fans'
        },
        {
          id: '7',
          name: '个人设置',
          icon: 'el-icon-setting',
          index: '/setting'
        }
      ],
      isOpen: true
    }
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏  展开与收起
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
  }
}
.el-header {
  border-bottom: 1px solid #ddd;
  line-height: 60px;
  .icon {
    font-size: 30px;
    vertical-align: middle;
  }
  .text {
    margin-left: 10px;
    vertical-align: middle;
  }
  .dropdown {
    float: right;
    .headIcon {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .userName {
      margin-left: 5px;
      font-weight: bold;
      vertical-align: middle;
    }
  }
}
.el-aside {
  background: #002033;
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/logo_admin.png) no-repeat center /
      140px auto;
  }
  .smallLogo {
    background-image: url(../../assets/logo_admin_01.png);
    background-size: 36px auto;
  }
}
</style>
