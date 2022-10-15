<template>
  <div>
    <!-- action: 远程服务器接口上传地址 -->
    <el-upload
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="onHttpRequest"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 预览图片的弹层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDMWSAetugEvNaZJp4DCzazBB4kETXP3Vl',
  SecretKey: '72lGZfZEj06rPlurbBYifPxJUTIuCH8l'
})
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewDialog: false,
      previewImgUrl: ''
    }
  },

  created() {

  },

  methods: {
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewDialog = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 上传之前
    beforeUpload(file) {
      // 1. 文件类型
      const allowTypes = ['image/jpeg', 'image/gif']
      // 循环 查找某一个数据 是否在数组中
      // 1. some () 某一个数据 是否在 数组中
      // 2. find () 查找, 返回找到的那一项
      // 3. findIndex() 查找, 找到的那一项的索引 更复杂的查找
      // 4. indexOf('1') 查找, 返回的索引 [{id: 1}, {id: 2}] 用于简单类型数组
      // 5. includes 查找,返回的是布尔 简单类型数组
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        this.$message.error('亲,只能上传' + allowTypes.join('、') + '类型文件')
        return false
      }

      // 限制上传的大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过1mb')
        return false
      }
    },
    // 1. 本地选择上传 原来有一个数据 + 选择的数据
    // 2. 请求上传 成功/失败 原来有一个数据
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      // console.log(file)
      cos.putObject({
        Bucket: 'ststst-1314382588', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, function(err, data) {
        // err 上传失败的信息 如果上传成功 err为null
        // data 上传成功的信息
        console.log(err || data)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.uploadImg {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
