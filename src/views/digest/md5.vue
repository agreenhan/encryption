<template>
  <div style="background-color: #f6f6f6">
    <el-card class="box-card" style="margin: 20px 20% 20px 20%; font-size: 25px">
      在线MD5加密
    </el-card>
    <el-form ref="form" :model="form" label-width="100px">
      <el-input
        v-model="form.source"
        type="textarea"
        placeholder="请输入需要加密文本数据，字数限制1000字以内。"
        :autosize="rows"
        :maxlength="maxlength"
      />
      <br>
      <br>
      <el-row :gutter="20">
        <el-col :span="3" :offset="6">
          <el-button type="primary" @click="encryption()">MD5加密</el-button>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-button type="primary" class="outcome" :data-clipboard-text="form.outcome" @click="copyOutcome()">点我复制结果</el-button>
        </el-col>
      </el-row>
      <br>
      <el-input
        v-model="form.outcome"
        type="textarea"
        placeholder="得到加密的结果"
        :autosize="rows"
        :maxlength="maxlength"
      />
    </el-form>
    <el-card class="box-card" style="margin: 20px 20% 20px 20%">
      <div class="text item">
        在线MD5加密解密工具
      </div>
      <div class="text item">
        1、在线MD5加密，采用加盐方式，使得密码更难被破解。
      </div>
      <div class="text item">
        2、MD5为不可逆加密，故只支持加密，不支持解密。
      </div>
      <div class="text item">
        3、MD5加密结果为固定长度的128位的16进制串。
      </div>
    </el-card>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { MD5Encryption } from '@/api/digest/md5'

export default {
  name: 'MD5',
  data() {
    return {
      rows: {
        // 输入文本数据最小行数
        minRows: 8,
        // 输入文本数据最大行数
        maxRows: 8
      },
      // 最大文本数
      maxlength: 1000,
      form: {
        // 待处理文本
        source: '',
        // 处理好的文本
        outcome: ''
      }
    }
  },
  methods: {
    encryption() {
      if (this.form.source === '' || this.form.source === undefined) {
        this.$message.warning('请输入待加密文本！')
        return false
      }
      MD5Encryption({
        source: this.form.source
      }).then(response => {
        this.form.outcome = response.data.outcome
      }).catch(error => {
        console.log(error)
      })
    },
    copyOutcome() {
      if (this.form.outcome === '') {
        this.$message.warning('当前结果为空')
        return
      }
      const clipboard = new ClipboardJS('.outcome')
      clipboard.on('success', e => {
        this.$message.success('复制成功！')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.warning('当前浏览器不支持自动复制，请手动复制！')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>

<style scoped>
  .el-form{
    margin: 20px 20% 0 20%;
  }
  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  .el-main {
    background-color: greenyellow;
    color: #333;
    text-align: center;
    line-height: 100px;
  }
  .el-upload__tip {
    font-size: 20px;
  }
  .el-input-textarea {
    margin: 20px 0 20px 0;
  }
  .text {
    font-size: 15px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 60%;
  }
</style>
