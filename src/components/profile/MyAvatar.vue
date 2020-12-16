<template>
  <div class="my-avatar">
    <div class="profile-title">
      <span class="profile-title-icon"></span>
      <span class="profile-title-text">
        {{ title }}
      </span>
    </div>
    <div class="user-setting-wrap">
      <div class="img-selector-wrap" v-show="firstChange">
        <label for="file-input" class="first-change-lb">
          <i class="fas fa-images fa-3x image-icon"></i>
          <span>选择图片</span>
        </label>
        <input type="file" id="file-input" @change="selectImage" />
        <div class="border-line"></div>
        <div class="avatar-wrap">
          <el-avatar
            class="current-avatar"
            :size="96"
            :src="user.avatarUrl"
          ></el-avatar>
          <div class="avatar-title">
            当前头像
          </div>
        </div>
      </div>
      <div class="img-crop-modal" v-show="!firstChange">
        <div class="img-crop-wrap">
          <img class="shadow-img" src="" ref="avatar" alt="Selected image" />
          <div class="reset-img">
            <label for="file-input">
              <i class="fas fa-undo-alt"></i>
              重新选择
            </label>
          </div>
        </div>
        <div class="border-line"></div>
        <div class="img-preview-wrap">
          <div class="img-preview"></div>
          <div class="img-pre-title">
            预览头像
          </div>
        </div>
      </div>
      <div class="user-my-btn-wrap">
        <el-button class="my-btn" type="primary" @click="uploadImage"
          >更新</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { getUserInfo, uploadAvatar } from '../../api/user'

export default {
  props: ['title'],
  data() {
    return {
      user: {
        avatarUrl: null,
      },
      firstChange: true,
      avatarCropper: null,
    }
  },
  methods: {
    getInfo() {
      getUserInfo().then(res => {
        this.user = res
      })
    },
    init() {
      this.avatarCropper = new Cropper(this.$refs.avatar, {
        viewMode: 1,
        modal: true,
        background: true,
        autoCropArea: 0.8,
        zoomOnWheel: false,
        autoCrop: true,
        aspectRatio: 1,
        minContainerWidth: 180,
        preview: '.img-preview',
        checkCrossOrigin: false,
      })
    },
    selectImage(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          this.$refs.avatar.src = reader.result
          if (this.firstChange) {
            this.init()
            this.firstChange = false
          } else {
            this.avatarCropper.replace(this.$refs.avatar.src, true)
          }
        },
        false
      )
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    uploadImage() {
      this.avatarCropper
        .getCroppedCanvas({
          width: 96,
          height: 96,
        })
        .toBlob(blob => {
          const formData = new FormData()
          formData.append('image', blob)
          uploadAvatar(this.user.userId, formData).then(() => {
            this.$message.success('更新成功')
          })
        }, 'image/jpeg')
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>

<style lang="less" scoped>
.my-avatar {
  .img-selector-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    .first-change-lb {
      width: 180px;
      height: 180px;
      cursor: pointer;
      background: #f1f2f5;
      border: 1px solid #e5e9ef;
      border-radius: 4px;
      transition: all 0.6s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 40px;
      .image-icon {
        color: #888;
      }
      span {
        margin-top: 10px;
        font-size: 16px;
        color: #6d757a;
      }
      &:hover {
        background: #e5e9ef;
      }
    }
    #file-input {
      display: none;
    }
    .avatar-wrap {
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .current-avatar {
        border: 1px solid #e6eaf0;
      }
      .avatar-title {
        margin-top: 20px;
        font-size: 12px;
        color: #99a2aa;
      }
    }
  }
  .img-crop-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    .img-crop-wrap {
      width: 180px;
      height: 180px;
      margin-right: 40px;
      position: relative;
      .shadow-img {
        display: none;
      }
      .reset-img {
        position: absolute;
        bottom: -28px;
        left: 50%;
        transform: translate(-50%);
        label {
          font-size: 12px;
          color: #6d757a;
          cursor: pointer;
          &:hover {
            color: #00b5e5;
          }
        }
      }
    }
    .img-preview-wrap {
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img-preview {
        width: 96px;
        height: 96px;
        overflow: hidden;
        border-radius: 50%;
      }
      .img-pre-title {
        margin-top: 20px;
        font-size: 12px;
        color: #99a2aa;
      }
    }
  }
  .user-my-btn-wrap {
    margin-bottom: 22px;
  }
  .border-line {
    height: 182px;
    width: 1px;
    background: #e5e9ef;
  }
}
</style>
