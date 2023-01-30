<template>
  <div style="background-color: #f6f6f6">
    <el-card class="box-card" style="margin: 20px 20% 20px 20%; font-size: 25px">
      在线RSA加密解密
    </el-card>
    <el-card class="box-card" style="margin: 20px 20% 0px 20%; font-size: 15px">
      公钥
    </el-card>
    <el-input
      v-model="form.publicKey"
      type="textarea"
      placeholder="生成的公钥"
      :autosize="rows"
      :maxlength="maxlength"
      style="margin: 0px 20% 5px 20%;width: 60%"/>
    <el-row :gutter="20" style="width: 60%; margin: 0 auto 0 auto">
      <el-col :span="3" :offset="3">
        <el-button type="primary" @click="getKey()">随机生成公钥</el-button>
      </el-col>
      <el-col :span="3" :offset="4">
        <el-button type="primary" class="public-key" :data-clipboard-text="form.publicKey" @click="copyPublicKey()">复制公钥</el-button>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-button type="primary" class="private-key" :data-clipboard-text="form.privateKey" @click="copyPrivateKey()">复制私钥</el-button>
      </el-col>
    </el-row>
    <el-card class="box-card" style="margin: 5px 20% 0px 20%; font-size: 15px">
      私钥
    </el-card>
    <el-input
      v-model="form.privateKey"
      type="textarea"
      placeholder="生成的私钥"
      :autosize="rows"
      :maxlength="maxlength"
      style="margin: 0px 20% 20px 20%;width: 60%"/>
    <el-form ref="form" :model="form" label-width="100px">
      <el-input
        v-model="form.source"
        type="textarea"
        placeholder="需要加密/解密的内容，文本限制1000字"
        :autosize="rows"
        :maxlength="maxlength"
        style="margin: 0 0 20px 0"
      />
      <el-row :gutter="20">
        <el-col :span="3" :offset="3">
          <el-button type="primary" @click="encryption()">RSA加密</el-button>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-button type="primary" @click="deciphering()">RSA解密</el-button>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-button type="primary" class="outcome" :data-clipboard-text="form.outcome" @click="copyOutcome()">复制结果</el-button>
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
        在线RSA加密解密工具
      </div>
      <div class="text item">
        1、在线RSA加密，不支持自定义公钥，公钥负责加密
      </div>
      <div class="text item">
        2、在线RSA解密，不支持自定义私钥，私钥负责解密
      </div>
    </el-card>
  </div>
</template>

<script>

import { RSAEncryption, RSADeciphering, RSAGetKey } from '@/api/asymmetric/rsa'
import ClipboardJS from 'clipboard'
export default {
  name: 'RSA',
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
        // 待处理的内容
        source: '',
        // 处理的结果
        outcome: '',
        // 私钥
        privateKey: '',
        // 公钥
        publicKey: ''
      }
    }
  },
  methods: {
    encryption() {
      if (this.form.publicKey === '') {
        this.$message.warning('请输入公钥！')
        return false
      }
      if (this.form.source === '') {
        this.$message.warning('请输入明文！')
        return false
      }
      RSAEncryption({
        'publicKey': this.form.publicKey,
        'source': this.form.source
      }).then(response => {
        this.form.outcome = response.data.outcome
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    deciphering() {
      if (this.form.privateKey === '') {
        this.$message.warning('请输入私钥！')
        return false
      }
      if (this.form.source === '') {
        this.$message.warning('请输入密文！')
        return false
      }
      RSADeciphering({
        'privateKey': this.form.privateKey,
        'source': this.form.source
      }).then(response => {
        this.form.outcome = response.data.outcome
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    getKey() {
      RSAGetKey().then(response => {
        this.form.privateKey = response.data.privateKey
        this.form.publicKey = response.data.publicKey
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    copyPrivateKey() {
      if (this.form.privateKey === '') {
        this.$message.warning('当前私钥为空')
        return
      }
      const clipboard = new ClipboardJS('.private-key')
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
    copyPublicKey() {
      if (this.form.publicKey === '') {
        this.$message.warning('当前公钥为空')
        return
      }
      const clipboard = new ClipboardJS('.public-key')
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
