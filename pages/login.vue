<template>
  <NuxtLayout :name="'login'">
    <UContainer :ui="{ constrained: 'max-w-sm' }">
      <div class="py-10">
        <UForm
          :validate="validate"
          key=""
          :state="state"
          @click="onSubmit"
          class="space-y-4"
        >
          <UFormGroup label="Email" name="email">
            <UInput size="lg" v-model="state.username" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput size="lg" v-model="state.password" type="password" />
          </UFormGroup>

          <UButton size="lg" type="submit" block>Submit</UButton>
        </UForm>
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
  username: 'kminchelle',
  password: '0lelplR'
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: "email", message: 'Required' })

  if (!state.password) errors.push({ path: "password", message: "Required" })
  return errors
};

async function onSubmit(event: FormSubmitEvent<any>) {
  await authenticateUser(state); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
}



</script>