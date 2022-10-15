<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <UploadImg @on-success="onSuccess1" />
    </div>
    <div>
      <UploadImg @on-success="onSuccess2" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadImg from '@/components/ImageUpload'
export default {
  name: 'Dashboard',
  components: {
    UploadImg
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onSuccess1(val) {
      alert('123')
      console.log(val)
    },
    onSuccess2(val) {
      alert('456')
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
