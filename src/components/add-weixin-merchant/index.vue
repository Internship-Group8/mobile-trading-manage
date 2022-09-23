<template>
<div>
<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="微信商户添加" />
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="微信商户支付名称" prop="name">
      <a-input
        v-model="form.name"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        placeholder="公众号名称"
      />
    </a-form-model-item>

    <a-form-model-item label="所属机构" prop="orgId">
      <a-select v-model="form.orgId" placeholder="请选择">
            <a-select-option v-for="item in options" :key="item.code" :value="item.id">
              {{ item.name }}
            </a-select-option>
        </a-select>
    </a-form-model-item>


    <a-form-model-item ref="shAppId" label="商户appId" prop="shAppId">
      <a-input
        v-model="form.shAppId"
        @blur="
          () => {
            $refs.shAppId.onFieldBlur();
          }
        "
        placeholder="商户appId"
      />
    </a-form-model-item>

    <a-form-model-item ref="wxAppId" label="公众号appId" prop="wxAppId">
      <a-input
        v-model="form.wxAppId"
        @blur="
          () => {
            $refs.wxAppId.onFieldBlur();
          }
        "
        placeholder="公众号appId"
      />
    </a-form-model-item>

    <a-form-model-item ref="appSecret" label="appSecret" prop="appSecret">
      <a-input
        v-model="form.appSecret"
        @blur="
          () => {
            $refs.appSecret.onFieldBlur();
          }
        "
        placeholder="应用凭证"
      />
    </a-form-model-item>
    <a-form-model-item ref="mchId" label="mchId" prop="mchId">
      <a-input
        v-model="form.mchId"
        @blur="
          () => {
            $refs.mchId.onFieldBlur();
          }
        "
        placeholder="商户号"
      />
    </a-form-model-item>
    <a-form-model-item ref="apiKey" label="apiKey'" prop="apiKey">
      <a-input
        v-model="form.apiKey"
        @blur="
          () => {
            $refs.apiKey.onFieldBlur();
          }
        "
        placeholder="密钥"
      />
    </a-form-model-item>
    <a-form-model-item ref="jzNotifyUrl" label="jzNotifyUrl" prop="jzNotifyUrl">
      <a-input
        v-model="form.jzNotifyUrl"
        @blur="
          () => {
            $refs.jzNotifyUrl.onFieldBlur();
          }
        "
        placeholder="捐赠异步回调"
      />
    </a-form-model-item>
    <a-form-model-item label="kjNotifyUrl">
      <a-input
        v-model='form.kjNotifyUrl'
        placeholder="空间购买异步回调"
      />
    </a-form-model-item>
    <a-form-model-item label="ufdoderUrl">
      <a-input
        v-model='form.ufdoderUrl'
        readOnly
      />
    </a-form-model-item>
    <a-form-model-item  label="sendEedPackUrl">
      <a-input
        v-model='form.sendEedPackUrl'
        readOnly
      />
    </a-form-model-item>
    <a-form-model-item label="charset">
      <a-input
        v-model='form.charset'
        readOnly
      />
    </a-form-model-item>
    <a-form-model-item label="format">
      <a-input
        v-model='form.format'
        readOnly
      />
    </a-form-model-item>
    
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit()">
        {{ submitText }}
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>


<script>
import { getOrgList, setAccount, getAccount } from '@/api/add-weixin-merchant/addWeixinMerchant';

const dict = {};
// 表单对象
const form={
  id:0,
  name: '',
  orgName: '',
  shAppId: '',
  wxAppId: '',
  appSecret: '',
  mchId: '',
  apiKey: '',
  jzNotifyUrl: '',
  kjNotifyUrl: '',
  //以下表单数据为默认且不可修改
  ufdoderUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
  sendEedPackUrl: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers',
  charset: 'utf-8',
  format: 'json',
  orgCode:'',
  // 用于获取机构名和机构代码
  orgId:'',
};

//  表单规则，此处只要求必填
const rules = {
  name: [
    { required: true, trigger: 'blur' },
  ],
  orgId:[
    { required: true, trigger: 'change' },
  ],
  shAppId:[
    { required: true, trigger: 'blur' },
  ],
  wxAppId:[
    { required: true, trigger: 'blur' },
  ],
  appSecret:[
    { required: true, trigger: 'blur' },
  ],
  mchId:[
    { required: true, trigger: 'blur' },
  ],
  apiKey:[
    { required: true, trigger: 'blur' },
  ],
  jzNotifyUrl:[
    { required: true, trigger: 'blur' },
  ],
  kjNotifyUrl:[
    { required: true, trigger: 'blur' },
  ],
};
export default {
  name:'AddProductType',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      selected:false,
      accountId:0,
      form,
      rules,
      submitText:'创建账号',
      options:[],
    };
  },

  created() {

    // 获取机构号以供选择机构名
    getOrgList().then(res=>{
        // console.log(res.data.info);
        this.options=[{id:0,name:'请选择', code:0}];
        for(let i = 0;i<res.data.data.length;i++){
          this.options.push({
            id:i+1,
            name:res.data.data[i].orgName,
            code:res.data.data[i].orgCode,
          });
        }
      }).catch(errinfo=>{
           console.log(errinfo);
    });

    // 获取路由跳转传值
    this.selected=this.$route.params.selected; //false创建账号或是true编辑已有账号
    this.accountId=this.$route.params.accountId; //编辑已有账号时账号的id

    //根据路由跳转传过来的参数进行
    if(this.selected==false){
      this.submitText='创建账号';
    }else{
      this.submitText='保存编辑';
      getAccount({'id':this.accountId}).then(res=>{
        console.log(res.data.data);
        this.form.id = res.data.data.id;
        this.form.name = res.data.data.name;
        this.form.orgCode = res.data.data.orgCode;
        this.form.shAppId = res.data.data.shAppId;
        this.form.wxAppId = res.data.data.wxAppId;
        this.form.appSecret = res.data.data.appSecret;
        this.form.mchId = res.data.data.mchId;
        this.form.apiKey = res.data.data.apiKey;
        this.form.jzNotifyUrl = res.data.data.jzNotifyUrl;
        this.form.kjNotifyUrl = res.data.data.kjNotifyUrl;
        this.form.ufdoderUrl = res.data.data.ufdoderUrl;
        this.form.sendEedPackUrl = res.data.data.sendEedPackUrl;
        this.form.charset = res.data.data.charset;
        this.form.format = res.data.data.format;
        this.form.orgName = res.data.data.orgName;
      });
    }           
  },

  methods: {

    // 点击按钮时触发的提交表单事件
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {  
          this.form.orgCode = this.options[parseInt(this.form.orgId)].code;
          this.form.orgName = this.options[parseInt(this.form.orgId)].name;
          if(this.selected){ // true则代表编辑，false代表创建
            setAccount({
              'id': this.form.id,
              'name': this.form.name,
              'orgCode': this.form.orgCode,
              'shAppId': this.form.shAppId,
              'wxAppId': this.form.wxAppId,
              'appSecret': this.form.appSecret,
              'mchId': this.form.mchId,
              'apiKey': this.form.apiKey,
              'jzNotifyUrl': this.form.jzNotifyUrl,
              'kjNotifyUrl': this.form.kjNotifyUrl,
              'ufdoderUrl': this.form.ufdoderUrl,
              'sendEedPackUrl': this.form.sendEedPackUrl,
              'charset': this.form.charset,
              'format': this.form.format,
              'orgName': this.form.orgName,
            }).then(res=>{
              console.log(res);
              this.$message.success('编辑账号成功');
            });
          }else{
            setAccount({
              'name': this.form.name,
              'orgCode': this.form.orgCode,
              'shAppId': this.form.shAppId,
              'wxAppId': this.form.wxAppId,
              'appSecret': this.form.appSecret,
              'mchId': this.form.mchId,
              'apiKey': this.form.apiKey,
              'jzNotifyUrl': this.form.jzNotifyUrl,
              'kjNotifyUrl': this.form.kjNotifyUrl,
              'ufdoderUrl': this.form.ufdoderUrl,
              'sendEedPackUrl': this.form.sendEedPackUrl,
              'charset': this.form.charset,
              'format': this.form.format,
              'orgName': this.form.orgName,
            }).then(res=>{
              console.log(res);
              this.$message.success('创建账号成功');
            });
          }
          
        } else {
          this.$message.error('填写数据不符要求');
          return false;
        }
      });
    },
  },
};
</script>
