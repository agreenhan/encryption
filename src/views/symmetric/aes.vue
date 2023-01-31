<template>
  <div style="background-color: #f6f6f6">
    <el-card class="box-card" style="margin: 20px 20% 20px 20%; font-size: 25px">
      在线AES加密解密
    </el-card>
    <el-form ref="form" :model="form" label-width="100px">
      <el-input
        v-model="form.source"
        type="textarea"
        placeholder="请输入需要加密的文本数据，字数限制1000字以内。"
        :autosize="rows"
        :maxlength="maxlength"
      />
      <el-input
        v-model="form.key"
        type="text"
        placeholder="密钥，需要为32位十六进制数，不填入则随机生成密钥"
        style="margin: 20px 0 20px 0"
      />
      <br>
      <br>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" @click="encryption()">AES加密</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" @click="deciphering()">AES解密</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" @click="keyGenerater()">生成随机密钥</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" class="key" :data-clipboard-text="form.key" @click="copyKey()">点我复制密钥</el-button>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" class="outcome" :data-clipboard-text="form.outcome" @click="copyOutcome()">点我复制结果</el-button>
        </el-col>
      </el-row>
      <br>
      <el-input
        v-model="form.outcome"
        type="textarea"
        placeholder="得到加密/解密的结果"
        :autosize="rows"
        :maxlength="maxlength"
      />
    </el-form>
    <el-card class="box-card" style="margin: 20px 20% 20px 20%">
      <div class="text item">
        在线AES加密解密工具
      </div>
      <div class="text item">
        1、在线AES加密，可自定义密钥（密钥请牢记，解密时需要用到加密时的密码）
      </div>
      <div class="text item">
        2、在线AES解密，可自定义密钥（解密时请正确输入加密时的密钥，否则解密结果输出为空）
      </div>
      <div class="text item">
        3、密钥需为32位十六进制数
      </div>
    </el-card>
  </div>
</template>

<script>
import { AESEncryption, AESDeciphering, AESGetKey } from '@/api/symmetric/aes'
import ClipboardJS from 'clipboard'
export default {
  name: 'AES',
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
        outcome: '',
        // 密钥
        key: ''
      }
    }
  },
  methods: {
    encryption() {
      if (this.form.source === '') {
        this.$message.warning('请输入明文！')
        return false
      }
      AESEncryption({
        'key': this.form.key,
        'source': this.form.source
      }).then(response => {
        this.form.outcome = response.data.outcome
        this.form.key = response.data.key
      }).catch(error => {
        console.log(error)
      })
    },
    deciphering() {
      if (this.form.key === '') {
        this.$message.warning('解密时请输入密钥！')
      }
      console.log('解密')
      AESDeciphering({
        'key': this.form.key,
        'source': this.form.source
      }).then(response => {
        this.form.outcome = response.data.outcome
      }).catch(error => {
        console.log(error)
      })
      if (this.form.source === '') {
        this.$message.warning('请输入密文！')
        return false
      }
    },
    keyGenerater() {
      AESGetKey().then(response => {
        this.form.key = response.data.key
      }).catch((error) => {
        console.log(error)
      })
    },
    copyKey() {
      if (this.form.key === '') {
        this.$message.warning('当前密钥为空')
        return
      }
      const clipboard = new ClipboardJS('.key')
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
