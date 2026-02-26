<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-grey-1 text-dark">
    <!-- Header -->
    <div class="q-mb-xl">
      <div class="text-h4 text-weight-bolder text-primary q-mb-xs">My Profile</div>
      <div class="text-body1 text-grey-7">
        Manage your personal information and account settings.
      </div>
    </div>

    <!-- Main Content -->
    <div class="row q-col-gutter-lg">
      <!-- Profile Picture and Basic Info -->
      <div class="col-12 col-md-4">
        <q-card class="shadow-1 border-subtle rounded-12 bg-white text-center q-pa-lg">
          <div class="q-mb-md relative-position inline-block">
            <q-avatar
              size="120px"
              color="primary"
              text-color="white"
              class="shadow-2 text-h2 text-weight-bolder"
            >
              {{ userInitials }}
            </q-avatar>
            <q-btn
              round
              color="secondary"
              text-color="primary"
              icon="photo_camera"
              size="sm"
              class="absolute-bottom-right hover-scale shadow-1 border-subtle"
              style="right: 0px; bottom: 0px"
            />
          </div>

          <div class="text-h5 text-weight-bold text-dark q-mt-md">{{ userName }}</div>
          <div class="text-body2 text-grey-6 q-mb-md">Administrator</div>

          <q-separator class="q-my-md" />

          <div class="text-left">
            <div class="q-mb-sm">
              <div class="text-caption text-grey-6 text-uppercase text-weight-bold">Status</div>
              <div class="text-weight-medium row items-center">
                <div
                  class="bg-positive q-mr-xs rounded-borders"
                  style="width: 8px; height: 8px"
                ></div>
                Active Account
              </div>
            </div>
            <div>
              <div class="text-caption text-grey-6 text-uppercase text-weight-bold">Joined On</div>
              <div class="text-weight-medium text-grey-8">{{ joinDate }}</div>
            </div>
          </div>
        </q-card>
      </div>

      <!-- Detail Forms -->
      <div class="col-12 col-md-8">
        <q-card class="shadow-1 border-subtle rounded-12 bg-white main-card">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey-7 border-bottom"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="personal" label="Personal Details" class="text-weight-bold" />
            <q-tab name="security" label="Security" class="text-weight-bold" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated class="bg-white rounded-borders">
            <!-- Personal Details Tab -->
            <q-tab-panel name="personal" class="q-pa-lg">
              <div class="text-h6 text-weight-bold q-mb-md text-dark">Personal Information</div>
              <q-form @submit.prevent="updateProfile" class="q-gutter-y-md">
                <q-banner
                  v-if="successMsg"
                  class="bg-green-1 text-positive rounded-borders q-mb-md"
                >
                  <q-icon name="check_circle" class="q-mr-sm" /> {{ successMsg }}
                </q-banner>
                <q-banner v-if="errorMsg" class="bg-red-1 text-negative rounded-borders q-mb-md">
                  <q-icon name="error" class="q-mr-sm" /> {{ errorMsg }}
                </q-banner>

                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                      Full Name
                    </div>
                    <q-input
                      v-model="form.fullName"
                      outlined
                      dense
                      color="primary"
                      class="custom-input"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                      Email Address
                    </div>
                    <q-input
                      v-model="form.email"
                      outlined
                      dense
                      readonly
                      color="primary"
                      class="custom-input bg-grey-1"
                      hint="Email address cannot be changed."
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                      Phone Number
                    </div>
                    <q-input
                      v-model="form.phone"
                      outlined
                      dense
                      color="primary"
                      class="custom-input"
                      placeholder="e.g. 071 234 5678"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                      Location
                    </div>
                    <q-input
                      v-model="form.location"
                      outlined
                      dense
                      color="primary"
                      class="custom-input"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div class="q-mt-lg flex justify-end">
                  <q-btn
                    unelevated
                    color="primary"
                    label="Save Changes"
                    type="submit"
                    class="rounded-borders hover-scale text-weight-bold"
                    :loading="saving"
                  />
                </div>
              </q-form>
            </q-tab-panel>

            <!-- Security Tab -->
            <q-tab-panel name="security" class="q-pa-lg">
              <div class="text-h6 text-weight-bold q-mb-md text-dark">Change Password</div>
              <div class="text-body2 text-grey-7 q-mb-lg">
                Ensure your account is using a long, random password to stay secure.
              </div>

              <q-form
                @submit.prevent="updatePassword"
                class="q-gutter-y-md"
                style="max-width: 400px"
              >
                <q-banner
                  v-if="pwdSuccessMsg"
                  class="bg-green-1 text-positive rounded-borders q-mb-md"
                >
                  <q-icon name="check_circle" class="q-mr-sm" /> {{ pwdSuccessMsg }}
                </q-banner>
                <q-banner v-if="pwdErrorMsg" class="bg-red-1 text-negative rounded-borders q-mb-md">
                  <q-icon name="error" class="q-mr-sm" /> {{ pwdErrorMsg }}
                </q-banner>

                <div>
                  <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                    New Password
                  </div>
                  <q-input
                    v-model="pwdForm.newPassword"
                    type="password"
                    outlined
                    dense
                    color="primary"
                    class="custom-input"
                  />
                </div>

                <div>
                  <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                    Confirm Password
                  </div>
                  <q-input
                    v-model="pwdForm.confirmPassword"
                    type="password"
                    outlined
                    dense
                    color="primary"
                    class="custom-input"
                  />
                </div>

                <div class="q-mt-md">
                  <q-btn
                    unelevated
                    color="primary"
                    label="Update Password"
                    type="submit"
                    class="rounded-borders hover-scale text-weight-bold"
                    :loading="pwdSaving"
                  />
                </div>
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { supabase } from 'src/boot/supabase'

const user = ref(null)
const tab = ref('personal')

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  location: '',
})

const pwdForm = reactive({
  newPassword: '',
  confirmPassword: '',
})

const saving = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const pwdSaving = ref(false)
const pwdSuccessMsg = ref('')
const pwdErrorMsg = ref('')

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session?.user) {
    user.value = session.user

    // Prefill form
    form.email = user.value.email
    form.fullName = user.value.user_metadata?.full_name || ''
    form.phone = user.value.user_metadata?.phone || ''
    form.location = user.value.user_metadata?.location || ''
  }
})

const userName = computed(() => {
  return form.fullName || 'User Administrator'
})

const userInitials = computed(() => {
  const name = userName.value
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

const joinDate = computed(() => {
  if (!user.value?.created_at) return 'Unknown'
  const date = new Date(user.value.created_at)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

const updateProfile = async () => {
  saving.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: form.fullName,
        phone: form.phone,
        location: form.location,
      },
    })

    if (error) throw error

    successMsg.value = 'Profile updated successfully!'
    setTimeout(() => {
      successMsg.value = ''
    }, 3000)
  } catch (err) {
    errorMsg.value = err.message || 'Failed to update profile.'
  } finally {
    saving.value = false
  }
}

const updatePassword = async () => {
  if (!pwdForm.newPassword || pwdForm.newPassword !== pwdForm.confirmPassword) {
    pwdErrorMsg.value = 'Passwords do not match or are empty.'
    return
  }

  pwdSaving.value = true
  pwdSuccessMsg.value = ''
  pwdErrorMsg.value = ''

  try {
    const { error } = await supabase.auth.updateUser({
      password: pwdForm.newPassword,
    })

    if (error) throw error

    pwdSuccessMsg.value = 'Password updated successfully!'
    pwdForm.newPassword = ''
    pwdForm.confirmPassword = ''
    setTimeout(() => {
      pwdSuccessMsg.value = ''
    }, 3000)
  } catch (err) {
    pwdErrorMsg.value = err.message || 'Failed to update password.'
  } finally {
    pwdSaving.value = false
  }
}
</script>

<style scoped>
.rounded-12 {
  border-radius: 12px;
}
.border-subtle {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.hover-scale {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.hover-scale:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
.shadow-1 {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03) !important;
}
.custom-input :deep(.q-field__control) {
  border-radius: 8px;
}
.main-card {
  height: 100%;
}
</style>
