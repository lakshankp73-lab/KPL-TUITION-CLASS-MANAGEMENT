<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-grey-1 text-dark">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h4 text-weight-bolder text-primary q-mb-xs">Password Reset Requests</div>
        <div class="text-body1 text-grey-7">
          Review and manage password recovery requests from users.
        </div>
      </div>
    </div>

    <!-- Requests Table -->
    <q-card class="shadow-1 border-subtle rounded-12 bg-white">
      <div class="row items-center justify-between q-pa-md border-bottom">
        <div class="text-h6 text-weight-bold text-dark">Pending & Recent Requests</div>
        <q-btn flat round icon="refresh" color="grey-7" @click="fetchRequests">
          <q-tooltip>Refresh</q-tooltip>
        </q-btn>
      </div>

      <q-markup-table flat bordered class="no-shadow">
        <thead>
          <tr class="bg-grey-1 text-grey-8 text-left">
            <th class="text-weight-bold">Requested Date</th>
            <th class="text-weight-bold">User</th>
            <th class="text-weight-bold">Role</th>
            <th class="text-weight-bold">Status</th>
            <th class="text-weight-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="5" class="text-center q-pa-xl text-grey-6">
              <q-spinner-dots color="primary" size="40px" />
              <div class="q-mt-md text-weight-medium">Loading Requests...</div>
            </td>
          </tr>
          <tr v-else-if="requests.length === 0">
            <td colspan="5" class="text-center q-pa-xl text-grey-6">
              <q-icon
                name="check_circle_outline"
                size="48px"
                class="q-mb-md opacity-50 text-positive"
              />
              <div class="text-h6 text-weight-bold">No Pending Requests</div>
              <div class="text-body2">All users have access to their accounts.</div>
            </td>
          </tr>
          <tr v-else v-for="req in requests" :key="req.id" class="hover-bg">
            <td>
              <div class="text-weight-medium">{{ formatDate(req.created_at) }}</div>
              <div class="text-caption text-grey-6">{{ formatTime(req.created_at) }}</div>
            </td>
            <td>
              <div class="row items-center">
                <q-avatar
                  size="32px"
                  color="primary"
                  text-color="white"
                  class="q-mr-sm text-caption"
                >
                  {{ req.full_name ? req.full_name.charAt(0).toUpperCase() : 'U' }}
                </q-avatar>
                <div>
                  <div class="text-weight-bold text-dark">{{ req.full_name }}</div>
                  <div class="text-caption text-grey-7">{{ req.email }}</div>
                </div>
              </div>
            </td>
            <td>
              <q-chip
                dense
                :color="getRoleColor(req.role)"
                text-color="white"
                class="text-weight-bold"
              >
                {{ req.role }}
              </q-chip>
            </td>
            <td>
              <q-chip
                dense
                :color="req.status === 'Pending' ? 'orange' : 'positive'"
                text-color="white"
                class="text-weight-bold"
              >
                {{ req.status }}
              </q-chip>
            </td>
            <td class="text-right">
              <q-btn
                v-if="req.status === 'Pending'"
                unelevated
                color="primary"
                label="Generate Password"
                icon="key"
                size="sm"
                class="rounded-borders text-weight-bold"
                @click="openGenerateDialog(req)"
              />
              <q-btn
                v-else
                flat
                color="grey-5"
                label="Resolved"
                icon="done_all"
                size="sm"
                disable
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- Dialog to generate and show password -->
    <q-dialog v-model="showGenDialog" persistent>
      <q-card style="min-width: 450px; max-width: 90vw" class="rounded-12">
        <q-card-section class="row items-center border-bottom q-pb-sm">
          <div class="text-h6 text-weight-bold">Generate New Password</div>
          <q-space />
          <q-btn flat round dense icon="close" v-close-popup @click="resetDialog" />
        </q-card-section>

        <q-card-section v-if="!generatedPassword">
          <div class="q-mb-md text-grey-8">
            <p>
              Clicking <b>Confirm & Generate</b> will auto-generate a secure random password for
              <b>{{ selectedReq?.full_name }}</b
              >.
            </p>
            <p class="text-caption text-brown-8 bg-brown-1 q-pa-sm rounded-borders">
              <q-icon name="info" size="xs" /> Since automatic background emails require a paid SMTP
              setup, you will be shown the new password immediately here. You can then quickly email
              or WhatsApp it to the user.
            </p>
          </div>

          <div class="row justify-end q-mt-md">
            <q-btn
              flat
              label="Cancel"
              color="grey-8"
              v-close-popup
              class="q-mr-sm font-weight-bold"
              @click="resetDialog"
            />
            <q-btn
              unelevated
              color="primary"
              label="Confirm & Generate"
              icon="autorenew"
              :loading="generating"
              @click="doGeneratePassword"
              class="text-weight-bold rounded-borders"
            />
          </div>
        </q-card-section>

        <q-card-section v-else class="text-center q-pt-lg">
          <div class="text-positive text-weight-bold q-mb-sm text-h6">
            <q-icon name="check_circle" size="sm" class="q-mr-xs" /> Password Reset Successful!
          </div>
          <p class="text-grey-8">
            Here is the new password for <b>{{ selectedReq?.email }}</b
            >. Please copy and share it securely.
          </p>

          <div
            class="bg-grey-2 q-pa-md rounded-borders q-my-md row items-center justify-between border-subtle"
          >
            <div
              class="text-h5 text-weight-bold text-dark tracking-wide"
              style="font-family: monospace"
            >
              {{ generatedPassword }}
            </div>
            <q-btn flat round icon="content_copy" color="primary" @click="copyPassword">
              <q-tooltip>Copy</q-tooltip>
            </q-btn>
          </div>

          <div class="row justify-center q-mt-xl q-gutter-md">
            <q-btn
              unelevated
              color="primary"
              label="Share via Email"
              icon="mail"
              outline
              class="rounded-borders text-weight-bold"
              :href="
                'mailto:' +
                selectedReq?.email +
                '?subject=Your New KPL EDU Password&body=Hello ' +
                selectedReq?.full_name +
                ',%0D%0A%0D%0AYour password reset request has been processed. Your new password is:%0D%0A' +
                generatedPassword +
                '%0D%0A%0D%0APlease make sure to keep this safe. You can log in via our application link.%0D%0A%0D%0AThank you.'
              "
            />

            <q-btn
              unelevated
              color="positive"
              label="Done"
              v-close-popup
              @click="resetDialog"
              class="rounded-borders text-weight-bold"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from 'src/boot/supabase'
import { useQuasar, date } from 'quasar'

const $q = useQuasar()
const requests = ref([])
const loading = ref(true)

const showGenDialog = ref(false)
const selectedReq = ref(null)
const generating = ref(false)
const generatedPassword = ref('')

const fetchRequests = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('password_reset_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50) // Pagination logic could go here

    if (error) throw error
    requests.value = data || []
  } catch (error) {
    console.error('Error fetching requests', error)
    $q.notify({
      color: 'negative',
      message: 'Failed to load password requests',
    })
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  return date.formatDate(dateStr, 'MMM DD, YYYY')
}

const formatTime = (dateStr) => {
  return date.formatDate(dateStr, 'hh:mm A')
}

const getRoleColor = (role) => {
  if (role === 'Administrator') return 'deep-purple'
  if (role === 'Teacher') return 'teal'
  if (role === 'Student') return 'blue'
  return 'grey-7'
}

const openGenerateDialog = (req) => {
  selectedReq.value = req
  generatedPassword.value = ''
  showGenDialog.value = true
}

const resetDialog = () => {
  selectedReq.value = null
  generatedPassword.value = ''
  generating.value = false
  fetchRequests() // refresh list to show updated status
}

const doGeneratePassword = async () => {
  generating.value = true
  try {
    // Generate an 8-char secure random string (letters+numbers)
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$*'
    let pass = ''
    for (let i = 0, n = charset.length; i < 8; ++i) {
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    const newPassword = pass

    // Call custom Supabase RPC to securely update password using pgcrypto and mark requests as resolved
    const { error } = await supabase.rpc('admin_reset_user_password', {
      target_user_id: selectedReq.value.user_id,
      new_password: newPassword,
    })

    if (error) throw error

    // Show generated password instead of form
    generatedPassword.value = newPassword

    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: 'Password successfully generated and updated!',
    })
  } catch (err) {
    console.error('Failed to reset', err)
    $q.notify({
      color: 'negative',
      message: err.message || 'Failed to generate new password',
    })
  } finally {
    generating.value = false
  }
}

const copyPassword = async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.value)
    $q.notify({
      color: 'positive',
      icon: 'content_copy',
      message: 'Password copied to clipboard!',
      position: 'top',
      timeout: 1500,
    })
  } catch (err) {
    console.error('Copy failed', err)
  }
}

onMounted(() => {
  fetchRequests()
})
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
.hover-bg:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.tracking-wide {
  letter-spacing: 1.5px;
}
.shadow-1 {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03) !important;
}
</style>
