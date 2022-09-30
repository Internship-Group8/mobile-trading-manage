
<template>
<div>
	<a-page-header style="border: 1px soilid rgb(235, 237, 240)" title="支付渠道新增" />
	<a-page-header style="border: 1px soilid rgb(235, 237, 240)" title="带有“*”号的项目为必填项，请将信息填写完整，谢谢！" />
	<a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
		<a-form-model-item label="*支付渠道名称">
			<a-input v-model="form.name" placeholder="支付渠道名称" />
		</a-form-model-item>
		<a-form-model-item label="*渠道支付类型">
			<a-select v-model="form.paymentType" placeholder="全部支付类型">
				<a-select-option v-for="option in typeOptions" :value="option.code" :key="option.id">
					{{option.name}}
				</a-select-option>
			</a-select>
		</a-form-model-item>
	</a-form-model>
</div>
</template>

<script>
import { getPaymentTypeList } from '@/api/payment-channel/paychannel'

export default {
	name:'addPaymentChannel',
	data() {
		return{
			labelCol: {span: 4},
			wrapperCol: {span: 14},
			form: {
				name: '',
				paymentType: '',
				merchantName: '',
			},
			typeOptions: [],
		}
		
	},

	created(){
		getPaymentTypeList().then(res=>{
			for(let i=0;i<res.data.data.length;i++){
				this.typeOptions.push({
					id: res.data.data.id,
					name: res.data.data.name,
					code: res.data.data.orgCode,
				})
			}
		})
	}
}
</script>
