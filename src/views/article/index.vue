<template>
  <div class="container-article">
    <!-- 筛选条件布局 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqParams.channel_id"></my-channel>
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果布局 -->
    <el-card style="margin-top:20px">
      <div class="header">
        根据筛选条件共查询到
        <b>{{ total }}</b>条结果
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px;">
                <div slot="error">
                  <img src="../../assets/error.gif" width="150" height="100" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status==1">待审核</el-tag>
              <el-tag type="success" v-if="scope.row.status==2">审核通过</el-tag>
              <el-tag type="info" v-if="scope.row.status==0">草稿</el-tag>
              <el-tag type="warning" v-if="scope.row.status==3">审核失败</el-tag>
              <el-tag type="danger" v-if="scope.row.status==4">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="toEdit(scope.row.id)"
                type="primary"
                icon="el-icon-edit"
                circle
                plain
              ></el-button>
              <el-button
                @click="delArticle(scope.row.id)"
                type="danger"
                icon="el-icon-delete"
                circle
                plain
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:20px"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
        ></el-pagination>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的参数对象
      // 由axios进行数据提交，字段的值null，axios是不会提交该字段
      reqParams: {
        status: null,
        channel_id: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dateArr: [],
      total: 0,
      tableData: []
    }
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', {
        params: this.reqParams
      })
      this.tableData = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      // 获取筛选数据（准备日期数据）
      // 处理频道空字符串问题
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 把页码换成1
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dateArr) {
      // dateArr 是数组 [date,date]  起始时间  结束时间
      // 我们需要： dateArr 是数组 [string,string]  string === '2019-10-02'
      // value-form="yyyy-MM-dd" 格式转换成功
      // 注意：清空日期之后，dateArr是null  对应的 begin end 值也该为null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    toEdit (id) {
      // 第一种  query传参方式
      // this.$router.push(`/publish?id=${id}`)
      // 第二种  query传参方式
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async delArticle (id) {
      // 发请求  restfull 接口规则（get post put patch delete）
      await this.$http.delete(`articles/${id}`)
      // 提示
      this.$message.success('删除成功')
      // 更新列表
      this.getArticles()
    }
  },
  created () {
    this.getChannelOptions()
    this.getArticles()
  }
}
</script>

<style>
</style>
