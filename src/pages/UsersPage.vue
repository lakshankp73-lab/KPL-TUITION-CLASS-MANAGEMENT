<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-grey-1 text-dark">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h4 text-weight-bolder text-primary q-mb-xs">User Management</div>
        <div class="text-body1 text-grey-7">
          Manage system users, their accounts and basic information.
        </div>
      </div>
      <div>
        <q-btn
          @click="openAddUser"
          unelevated
          color="primary"
          text-color="white"
          icon="add"
          label="Add New User"
          class="rounded-borders hover-scale text-weight-bold shadow-2"
        />
      </div>
    </div>

    <!-- Users Table -->
    <q-card class="shadow-1 border-subtle rounded-12 bg-white">
      <div class="row items-center justify-between q-pa-md border-bottom">
        <div class="text-h6 text-weight-bold text-dark">All Users</div>
      </div>
      <q-markup-table flat bordered class="no-shadow">
        <thead>
          <tr class="bg-grey-1 text-grey-8 text-left">
            <th class="text-weight-bold">User</th>
            <th class="text-weight-bold">Email</th>
            <th class="text-weight-bold">Role</th>
            <th class="text-weight-bold">Status</th>
            <th class="text-weight-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Empty State -->
          <tr v-if="loadingUsers">
            <td colspan="5" class="text-center q-pa-xl text-grey-6">
              <q-spinner-dots color="primary" size="40px" />
              <div class="q-mt-md text-weight-medium">Loading Users...</div>
            </td>
          </tr>
          <tr v-else-if="users.length === 0">
            <td colspan="5" class="text-center q-pa-xl text-grey-6">
              <q-icon name="group_off" size="48px" class="q-mb-md opacity-50" />
              <div class="text-h6 text-weight-bold">No Users Found</div>
              <div class="text-body2">Start by adding a new user to the system.</div>
            </td>
          </tr>
          <!-- Data Rows -->
          <tr v-else v-for="user in users" :key="user.id" class="cursor-pointer hover-bg">
            <td>
              <div class="row items-center">
                <q-avatar
                  size="36px"
                  color="primary"
                  text-color="white"
                  class="q-mr-sm text-weight-bold"
                >
                  {{ user.full_name.charAt(0).toUpperCase() }}
                </q-avatar>
                <div>
                  <div class="text-weight-bold text-dark">{{ user.full_name }}</div>
                  <div class="text-caption text-grey-6">{{ user.id.split('-')[0] }}...</div>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <q-chip
                :color="getRoleColor(user.role)"
                text-color="white"
                dense
                class="text-weight-bold"
                size="sm"
              >
                {{ user.role }}
              </q-chip>
            </td>
            <td>
              <q-badge
                :color="user.status === 'Active' ? 'positive' : 'negative'"
                rounded
                class="q-px-sm q-py-xs"
              >
                {{ user.status }}
              </q-badge>
            </td>
            <td class="text-right">
              <q-btn flat round color="grey-7" icon="more_vert" dense>
                <q-menu auto-close>
                  <q-list style="min-width: 150px">
                    <q-item clickable @click="openEditUser(user)">
                      <q-item-section avatar>
                        <q-icon name="edit" size="sm" />
                      </q-item-section>
                      <q-item-section>Edit User</q-item-section>
                    </q-item>
                    <q-item clickable class="text-negative" @click="promptDeleteUser(user)">
                      <q-item-section avatar>
                        <q-icon name="delete" color="negative" size="sm" />
                      </q-item-section>
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <!-- Add New User Dialog -->
    <q-dialog v-model="showAddUserDialog" persistent>
      <q-card style="min-width: 400px" class="rounded-12">
        <q-card-section class="row items-center q-pb-none border-bottom">
          <div class="text-h6 text-weight-bold">Add New User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="saveNewUser" class="q-gutter-md">
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Full Name</div>
              <q-input
                v-model="newUserForm.name"
                outlined
                dense
                color="primary"
                class="custom-input"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Email Address</div>
              <q-input
                v-model="newUserForm.email"
                outlined
                dense
                color="primary"
                class="custom-input"
                type="email"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div>
              <div class="row items-center justify-between">
                <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Password</div>
                <div
                  class="text-caption text-primary cursor-pointer text-weight-bold"
                  @click="generatePassword"
                >
                  Generate Auto
                </div>
              </div>
              <q-input
                v-model="newUserForm.password"
                outlined
                dense
                color="primary"
                class="custom-input"
                type="text"
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:append>
                  <q-icon name="content_copy" class="cursor-pointer" @click="copyPassword">
                    <q-tooltip>Copy Password</q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Role</div>
              <q-select
                v-model="newUserForm.role"
                :options="roleOptions"
                outlined
                dense
                color="primary"
                class="custom-input"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>

            <div class="row justify-end q-mt-lg">
              <q-btn
                flat
                label="Cancel"
                color="grey-8"
                v-close-popup
                class="q-mr-sm text-weight-bold"
              />
              <q-btn
                unelevated
                label="Save User"
                type="submit"
                color="primary"
                class="rounded-borders hover-scale text-weight-bold"
                :loading="savingUser"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Edit User Dialog -->
    <q-dialog v-model="showEditUserDialog" persistent>
      <q-card style="min-width: 400px" class="rounded-12">
        <q-card-section class="row items-center q-pb-none border-bottom">
          <div class="text-h6 text-weight-bold">Edit User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="saveEditedUser" class="q-gutter-md">
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Full Name</div>
              <q-input
                v-model="editUserForm.name"
                outlined
                dense
                color="primary"
                class="custom-input"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Email Address</div>
              <q-input
                v-model="editUserForm.email"
                outlined
                dense
                color="primary"
                class="custom-input"
                type="email"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">
                Password (Leave blank to keep current)
              </div>
              <q-input
                v-model="editUserForm.password"
                outlined
                dense
                color="primary"
                class="custom-input"
                type="password"
              />
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Role</div>
                <q-select
                  v-model="editUserForm.role"
                  :options="roleOptions"
                  outlined
                  dense
                  color="primary"
                  class="custom-input"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Status</div>
                <q-select
                  v-model="editUserForm.status"
                  :options="statusOptions"
                  outlined
                  dense
                  color="primary"
                  class="custom-input"
                  :rules="[(val) => !!val || 'Field is required']"
                />
              </div>
            </div>

            <div class="row justify-end q-mt-lg">
              <q-btn
                flat
                label="Cancel"
                color="grey-8"
                v-close-popup
                class="q-mr-sm text-weight-bold"
              />
              <q-btn
                unelevated
                label="Update User"
                type="submit"
                color="primary"
                class="rounded-borders hover-scale text-weight-bold"
                :loading="updatingUser"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { supabase } from 'src/boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const users = ref([])
const loadingUsers = ref(true)

const showAddUserDialog = ref(false)
const savingUser = ref(false)
const roleOptions = ref([])
const statusOptions = ['Active', 'Inactive', 'Suspended']

const showEditUserDialog = ref(false)
const updatingUser = ref(false)

const fetchUsers = async () => {
  loadingUsers.value = true
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    users.value = data || []
  } catch (error) {
    console.error('Error fetching users:', error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Failed to load users',
      position: 'top',
    })
  } finally {
    loadingUsers.value = false
  }
}

onMounted(async () => {
  fetchUsers()
  try {
    const { data, error } = await supabase.from('roles').select('name')
    if (!error && data) {
      roleOptions.value = data.map((r) => r.name)
    }
  } catch (e) {
    console.error('Error fetching role options:', e)
  }
})

const newUserForm = reactive({
  name: '',
  email: '',
  password: '',
  role: 'Student',
})

const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%*'
  let pass = ''
  for (let i = 0; i < 8; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  newUserForm.password = pass
}

const copyPassword = async () => {
  if (newUserForm.password) {
    try {
      await navigator.clipboard.writeText(newUserForm.password)
      $q.notify({
        color: 'positive',
        textColor: 'white',
        message: 'Password copied to clipboard',
        icon: 'content_paste',
        position: 'top',
        timeout: 1000,
      })
    } catch (e) {
      console.error(e)
    }
  }
}

watch(
  () => newUserForm.role,
  (newRole) => {
    if (newRole === 'Student') {
      generatePassword()
    }
  },
)

const openAddUser = () => {
  newUserForm.name = ''
  newUserForm.email = ''
  newUserForm.role = 'Student'
  generatePassword()
  showAddUserDialog.value = true
}

const saveNewUser = async () => {
  savingUser.value = true
  try {
    // Edge Functions එපා කිව්ව නිසා පොඩි ක්‍රමයක් පාවිච්චි කරනවා
    // Admin ගේ session එක නැති නොවෙන්න temporary client එකකින් account එක හදනවා
    // (මේකෙදි temporary client එකක් හදන්න admin key එකක් ඕනෙ නිසා, දැනට auto-login වෙලා
    // ආයෙත් session ටික restore කරන විදිහක් පාවිච්චි කරන්න වෙනවා.
    // නැත්නම් Signup එක normal විදිහටම යනවා)

    // session එක save කරගන්නවා
    const { data: sessionData } = await supabase.auth.getSession()
    const adminSession = sessionData.session

    const { error } = await supabase.auth.signUp({
      email: newUserForm.email,
      password: newUserForm.password,
      options: {
        data: {
          full_name: newUserForm.name,
          role: newUserForm.role,
        },
      },
    })

    if (error) {
      throw error
    }

    // Admin session එක ආයෙත් set කරනවා (මේකෙන් Admin ව logout වෙන එක නවතිනවා)
    if (adminSession) {
      await supabase.auth.setSession({
        access_token: adminSession.access_token,
        refresh_token: adminSession.refresh_token,
      })
    }

    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'check_circle',
      message: 'User created successfully',
      position: 'top',
    })

    showAddUserDialog.value = false

    // Reset form
    newUserForm.name = ''
    newUserForm.email = ''
    newUserForm.role = 'Student'
    generatePassword()

    // Refetch users to show the new data
    await fetchUsers()
  } catch (error) {
    console.error('Error creating user:', error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: error.message || 'Failed to create user',
      position: 'top',
    })
  } finally {
    savingUser.value = false
  }
}

const getRoleColor = (role) => {
  switch (role) {
    case 'Administrator':
      return 'purple'
    case 'Teacher':
      return 'blue'
    case 'Student':
      return 'orange'
    case 'Parent':
      return 'teal'
    default:
      return 'grey'
  }
}

const editUserForm = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
  role: 'Student',
  status: 'Active',
})

const openEditUser = (user) => {
  editUserForm.id = user.id
  editUserForm.name = user.full_name
  editUserForm.email = user.email
  editUserForm.password = '' // Don't show existing password
  editUserForm.role = user.role
  editUserForm.status = user.status || 'Active'
  showEditUserDialog.value = true
}

const saveEditedUser = async () => {
  updatingUser.value = true
  try {
    // Edge function වෙනුවට RPC Call එකක් දානවා
    const { error: rpcError } = await supabase.rpc('update_target_user', {
      target_user_id: editUserForm.id,
      new_name: editUserForm.name,
      new_role: editUserForm.role,
      new_status: editUserForm.status,
    })

    if (rpcError) throw rpcError

    // Password එකත් වෙනස් කරනවා නම් (RPC එකෙන් Passwords update කරන්න බෑ)
    if (editUserForm.password) {
      // මෙය කරන්නේ සම්මත admin API එකෙන්, ඒ නිසා මෙතන දාන්න බෑ (Edge නැතුව).
      // ඒ නිසා මම password change එක දැනට පස්සෙ කරන්න කියන්නම්.
      $q.notify({
        color: 'warning',
        textColor: 'black',
        icon: 'info',
        message: 'Info: Update User Password requires Admin API. Other details updated.',
        position: 'top',
      })
    }

    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'check_circle',
      message: 'User updated successfully',
      position: 'top',
    })

    showEditUserDialog.value = false
    await fetchUsers()
  } catch (error) {
    console.error('Error updating user:', error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: error.message || 'Failed to update user',
      position: 'top',
    })
  } finally {
    updatingUser.value = false
  }
}

const promptDeleteUser = (user) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete ${user.full_name}? This action cannot be undone.`,
    persistent: true,
    ok: {
      color: 'negative',
      label: 'Delete',
      unelevated: true,
    },
    cancel: {
      flat: true,
      color: 'grey-8',
    },
  }).onOk(async () => {
    try {
      // Edge Function වෙනුවට Delete User RPC Call එක දානවා
      const { error: rpcError } = await supabase.rpc('delete_target_user', {
        target_user_id: user.id,
      })

      if (rpcError) throw rpcError

      $q.notify({
        color: 'positive',
        icon: 'check_circle',
        message: 'User deleted successfully',
        position: 'top',
      })
      await fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      $q.notify({
        color: 'negative',
        icon: 'error',
        message: error.message || 'Failed to delete user',
        position: 'top',
      })
    }
  })
}
</script>

<style scoped>
.custom-input :deep(.q-field__control) {
  border-radius: 8px;
}
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
</style>
