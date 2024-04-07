<template>
  <div class="address-edit-box">
    <global-header :title="state.type == 'add' ? '新增地址' : '编辑地址'"></global-header>
    <van-address-edit
      class="edit"
      :area-list="state.areaList"
      :address-info="state.addressInfo"
      :show-delete="state.type == 'edit'"
      show-set-default
      show-search-result
      :search-result="state.searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { showToast } from 'vant';
import { areaList } from '@vant/area-data';
import { addAddress, editAddress, deleteAddress, getAddressDetail } from '@/api/user';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const state = reactive({
  areaList,
  searchResult: [],
  type: 'add',
  addressId: '',
  addressInfo: {},
  from: route.query.from,
});

onMounted(async () => {
  const { addressId, type, from } = route.query;
  state.addressId = addressId;
  state.type = type;
  state.from = from || '';
  if (type == 'edit') {
    queryAddressDetail();
  }
});

const queryAddressDetail = async () => {
  const data = await getAddressDetail(state.addressId);
  const addressDetail = data?.data || {};
  if (addressDetail.addressId) {
    state.addressInfo = {
      id: addressDetail.addressId,
      name: addressDetail.userName,
      tel: addressDetail.userPhone,
      province: addressDetail.provinceName,
      city: addressDetail.cityName,
      county: addressDetail.regionName,
      addressDetail: addressDetail.detailAddress,
      areaCode: addressDetail.areaCode,
      isDefault: !!addressDetail.defaultFlag,
    };
  }
};

const onSave = async (content) => {
  const params = {
    userName: content.name,
    userPhone: content.tel,
    provinceName: content.province,
    cityName: content.city,
    regionName: content.county,
    detailAddress: content.addressDetail,
    defaultFlag: content.isDefault ? 1 : 0,
  };
  if (state.type == 'edit') {
    params['addressId'] = state.addressId;
  }
  (await state.type) == 'add' ? addAddress(params) : editAddress(params);
  showToast('保存成功');
  setTimeout(() => {
    router.back();
  }, 1000);
};

const onDelete = async () => {
  await deleteAddress(state.addressId);
  showToast('删除成功');
  setTimeout(() => {
    router.back();
  }, 1000);
};
</script>

<style lang="scss" scoped>
.edit {
  .van-field__body {
    textarea {
      height: 26px !important;
    }
  }
}
</style>
