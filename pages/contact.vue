<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: "email", message: 'Required' })

  if (!state.password) errors.push({ path: "password", message: "Required" })
  return errors
};

function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  // console.log(event.data);
}

</script>

<template>
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
          <UInput size="lg" v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput size="lg" v-model="state.password" type="password" />
        </UFormGroup>

        <UButton size="lg" type="submit" block>Submit</UButton>
      </UForm>
    </div>
  </UContainer>
</template>