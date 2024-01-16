<template>
  <NuxtLayout :name="'login'">
    <UContainer :ui="{ constrained: 'max-w-sm' }">
      <div class="py-10">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.username" placeholder="1234"/>
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <UButton type="submit">
            Submit
          </UButton>
        </UForm>
      </div>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    </div>      
    </UContainer>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created
import type { FormError, FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: false,
})

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
const router = useRouter();

const state = reactive({
  username: '',
  password: ''
})

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