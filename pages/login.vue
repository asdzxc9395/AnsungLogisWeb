<template>
  <NuxtLayout :name="'login'">
    <!-- <UContainer :ui="{ constrained: 'max-w-sm' }" > -->
      <div class="flex flex-col justify-center items-center gap-10">
        <div class="text-3xl font-bold" style="lign-height: 42px; text-overflow: ellipsis;">
          <span>안성종합물류</span>
        </div>        
        <UForm :validate="validate" :state="state" class="flex flex-col justify-center items-start px-12 gap-3" @submit="onSubmit" >
          <UFormGroup label="아이디" name="아이디" class="flex flex-col justify-center items-start text-sm font-medium gap-2 w-96">
            <UInput v-model="state.username" placeholder="1234" class="w-full"/>
          </UFormGroup>

          <UFormGroup label="패스워드" name="패스워드" class="flex flex-col justify-center items-start text-sm font-medium gap-2 w-96">
            <UInput v-model="state.password" type="password" class="w-full"/>
          </UFormGroup>

          <div class="flex items-center gap-3">
            <UCheckbox v-model="selected"/>
            <span class="text-sm">아이디 저장</span>
          </div>

          <UButton type="submit" class="w-full">
            로그인
          </UButton>
        </UForm>
      </div>
    <!-- </UContainer> -->
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
import { useUserStore } from '~/store/user'; // import the auth store we just created
import type { FormError, FormSubmitEvent } from '#ui/types'
import { onMounted } from 'vue';

definePageMeta({
  layout: false,
})

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const { init }: any = useUserStore(); // use authenticateUser action from  auth store

const router = useRouter();

const selected = ref(false);
const state = reactive({
  username: '1234',
  password: 'a'
})

onMounted(() => {
  init()
});

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ path: "email", message: 'Required' })
  // if (!state.password) errors.push({ path: "password", message: "Required" })
  return errors
};
  
async function onSubmit(event: FormSubmitEvent<any>) {
  await authenticateUser(state); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  // console.log(authenticated)
  if (authenticated) {
    router.push('/');
  }
}



</script>