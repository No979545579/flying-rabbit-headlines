<template>
  <el-select :value="value" @change="fn" v-model="value" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  data () {
    return {
      value: null,
      channelOptions: [],
      props: ['value']
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值 channelOptions
      this.channelOptions = data.channels
    },
    // 频道改变函数
    fn (channelId) {
      // 清空值是'' 改成null
      if (channelId === '') channelId = null
      // 把ID提交给父组件
      this.$emit('input', channelId)
    }
  }
}
</script>

<style scoped lang='less'></style>
