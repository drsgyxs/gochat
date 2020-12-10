<template>
  <div class="user-profile">
    <nav class="profile-left">
      <span class="profile-left-title">{{ title }}</span>
      <ul>
        <li
          v-for="(nav, index) in navs"
          :key="nav.label"
          @click="handleNavClick(nav.comp, index)"
          :class="active === index ? 'nav-list on' : 'nav-list'"
        >
          <i :class="'nav-icon ' + nav.icon"></i>
          <span class="nav-label">
            {{ nav.label }}
          </span>
        </li>
      </ul>
    </nav>
    <div class="profile-right">
      <transition name="fade-transform" mode="out-in" appear>
        <component :is="profile" />
      </transition>
    </div>
  </div>
</template>

<script>
import Account from '../components/profile/Account'
import EmailBind from '../components/profile/EmailBind'
import PasswordUpdate from '../components/profile/PasswordUpdate'

export default {
  name: 'UserProfile',
  components: {
    Account,
    EmailBind,
    PasswordUpdate,
  },
  data() {
    return {
      profile: 'Account',
      active: 0,
      title: '个人中心',
      navs: [
        {
          label: '修改信息',
          comp: 'Account',
          icon: 'el-icon-user',
        },
        // {
        //   label: '绑定邮箱',
        //   comp: 'EmailBind',
        //   icon: 'el-icon-message',
        // },
        {
          label: '修改密码',
          comp: 'PasswordUpdate',
          icon: 'el-icon-lock',
        },
      ],
    }
  },
  methods: {
    handleNavClick(comp, index) {
      this.profile = comp
      this.active = index
    },
  },
}
</script>

<style lang="less">
.user-profile {
  width: 980px;
  display: flex;
  margin: 10px auto 100px;
  border: 1px solid #e1e2e5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  background: #fafafa;
  .profile-left {
    flex: 1;
    height: 100%;
    text-align: center;
    .profile-left-title {
      color: #99a2aa;
      display: block;
      width: 150px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e1e2e5;
    }
    ul {
      color: #717171;
      font-size: 14px;
      border-bottom: 1px solid #e1e2e5;
      .nav-list {
        width: 150px;
        height: 48px;
        line-height: 48px;
        cursor: pointer;
        &:hover {
          background: #e1e4ea;
        }
        .nav-icon {
          color: #99a2aa;
        }
        .nav-label {
          color: #222;
          margin-left: 12px;
        }
        &.on {
          background: #000;
          color: #fff;
          .nav-icon {
            color: #fff;
          }

          .nav-label {
            color: #fff;
            margin-left: 12px;
          }
        }
      }
    }
  }
  .profile-right {
    border-left: 1px solid #e1e2e5;
    background: #fff;
    flex: 6;
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
