<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-grey-1 text-dark">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h4 text-weight-bolder text-primary q-mb-xs">Roles & Permissions</div>
        <div class="text-body1 text-grey-7">Define roles and manage module access permissions.</div>
      </div>
      <div>
        <q-btn
          @click="openCreateRole"
          unelevated
          color="primary"
          text-color="white"
          icon="add"
          label="Create Role"
          class="rounded-borders hover-scale text-weight-bold shadow-2"
        />
      </div>
    </div>

    <!-- Roles Table -->
    <q-card class="shadow-1 border-subtle rounded-12 bg-white">
      <div class="row items-center justify-between q-pa-md border-bottom">
        <div class="text-h6 text-weight-bold text-dark">System Roles</div>
        <q-btn flat round icon="refresh" color="grey-7" @click="fetchRoles">
          <q-tooltip>Refresh</q-tooltip>
        </q-btn>
      </div>
      <q-markup-table flat bordered class="no-shadow">
        <thead>
          <tr class="bg-grey-1 text-grey-8 text-left">
            <th class="text-weight-bold">Role Name</th>
            <th class="text-weight-bold">Description</th>
            <th class="text-weight-bold">Permissions Count</th>
            <th class="text-weight-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="text-center q-pa-xl text-grey-6">
              <q-spinner-dots color="primary" size="40px" />
              <div class="q-mt-md text-weight-medium">Loading Roles...</div>
            </td>
          </tr>
          <tr v-else-if="roles.length === 0">
            <td colspan="4" class="text-center q-pa-xl text-grey-6">
              <q-icon name="security" size="48px" class="q-mb-md opacity-50" />
              <div class="text-h6 text-weight-bold">No Roles Defined</div>
              <div class="text-body2">Create your first role to manage access control.</div>
            </td>
          </tr>
          <tr v-else v-for="role in roles" :key="role.id" class="hover-bg">
            <td>
              <div class="row items-center">
                <q-icon
                  v-if="role.is_system_role"
                  name="verified_user"
                  color="primary"
                  class="q-mr-sm"
                  size="xs"
                >
                  <q-tooltip>System Role</q-tooltip>
                </q-icon>
                <div
                  class="text-weight-bold"
                  :class="role.is_system_role ? 'text-primary' : 'text-dark'"
                >
                  {{ role.name }}
                </div>
              </div>
            </td>
            <td>{{ role.description || 'No description' }}</td>
            <td>
              <q-chip dense color="blue-1" text-color="blue-8" class="text-weight-bold">
                {{ role.permissions ? role.permissions.length : 0 }} Permissions
              </q-chip>
            </td>
            <td class="text-right">
              <q-btn flat round color="grey-7" icon="more_vert" dense>
                <q-menu auto-close>
                  <q-list style="min-width: 150px">
                    <q-item clickable @click="openEditRole(role)">
                      <q-item-section avatar>
                        <q-icon name="edit" size="sm" />
                      </q-item-section>
                      <q-item-section>Edit Permissions</q-item-section>
                    </q-item>
                    <q-item
                      v-if="!role.is_system_role"
                      clickable
                      class="text-negative"
                      @click="promptDeleteRole(role)"
                    >
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

    <!-- Role Form Dialog -->
    <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 500px; max-width: 95vw" class="rounded-12">
        <q-card-section class="row items-center q-pb-none border-bottom">
          <div class="text-h6 text-weight-bold">
            {{ isEditing ? 'Edit Role' : 'Create New Role' }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <q-form @submit.prevent="saveRole" class="q-gutter-md">
            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Role Name</div>
              <q-input
                v-model="form.name"
                outlined
                dense
                color="primary"
                class="custom-input"
                :disable="isEditing && editingRole?.is_system_role"
                :rules="[(val) => !!val || 'Role Name is required']"
              />
              <div
                v-if="isEditing && editingRole?.is_system_role"
                class="text-caption text-orange q-mt-xs"
              >
                System role names cannot be changed. You can only update permissions.
              </div>
            </div>

            <div>
              <div class="text-subtitle2 text-grey-8 q-mb-xs text-weight-medium">Description</div>
              <q-input
                v-model="form.description"
                outlined
                dense
                color="primary"
                class="custom-input"
                type="textarea"
                rows="2"
              />
            </div>

            <q-separator class="q-my-md" />

            <div>
              <div class="text-subtitle1 text-weight-bold q-mb-sm">Access Permissions</div>
              <div class="text-caption text-grey-7 q-mb-md">
                Select what users with this role can do in the system.
              </div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6" v-for="perm in availablePermissions" :key="perm.value">
                  <q-checkbox
                    v-model="form.permissions"
                    :val="perm.value"
                    :label="perm.label"
                    color="primary"
                  />
                </div>
              </div>
            </div>

            <div class="row justify-end q-mt-xl">
              <q-btn
                flat
                label="Cancel"
                color="grey-8"
                v-close-popup
                class="q-mr-sm text-weight-bold"
              />
              <q-btn
                unelevated
                :label="isEditing ? 'Save Changes' : 'Create Role'"
                type="submit"
                color="primary"
                class="rounded-borders hover-scale text-weight-bold"
                :loading="saving"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from 'src/boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const roles = ref([])
const loading = ref(true)
const showDialog = ref(false)
const saving = ref(false)
const isEditing = ref(false)
const editingRole = ref(null)

const availablePermissions = [
  { value: 'manage_users', label: 'Manage System Users' },
  { value: 'manage_roles', label: 'Manage Roles & Config' },
  { value: 'manage_classes', label: 'Create & Edit Classes' },
  { value: 'view_classes', label: 'View Classes' },
  { value: 'manage_payments', label: 'Process Payments' },
  { value: 'view_reports', label: 'View Financial & Admin Reports' },
]

const form = reactive({
  name: '',
  description: '',
  permissions: [],
})

const fetchRoles = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    roles.value = data || []
  } catch (error) {
    console.error('Error fetching roles:', error)
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Failed to load roles',
    })
  } finally {
    loading.value = false
  }
}

const openCreateRole = () => {
  isEditing.value = false
  editingRole.value = null
  form.name = ''
  form.description = ''
  form.permissions = []
  showDialog.value = true
}

const openEditRole = (role) => {
  isEditing.value = true
  editingRole.value = role
  form.name = role.name
  form.description = role.description || ''
  // Handle case where permissions might be null in DB
  form.permissions = role.permissions ? [...role.permissions] : []
  showDialog.value = true
}

const saveRole = async () => {
  saving.value = true
  try {
    if (isEditing.value) {
      // Update
      const updateData = {
        description: form.description,
        permissions: form.permissions,
      }
      // Only update name if it's not a system role
      if (!editingRole.value.is_system_role) {
        updateData.name = form.name
      }

      const { error } = await supabase
        .from('roles')
        .update(updateData)
        .eq('id', editingRole.value.id)

      if (error) throw error

      $q.notify({
        color: 'positive',
        icon: 'check_circle',
        message: 'Role updated successfully',
      })
    } else {
      // Create
      const { error } = await supabase.from('roles').insert([
        {
          name: form.name,
          description: form.description,
          permissions: form.permissions,
          is_system_role: false,
        },
      ])

      if (error) {
        if (error.code === '23505') {
          throw new Error('A role with this name already exists.')
        }
        throw error
      }

      $q.notify({
        color: 'positive',
        icon: 'check_circle',
        message: 'Role created successfully',
      })
    }

    showDialog.value = false
    await fetchRoles()
  } catch (error) {
    console.error('Error saving role:', error)
    $q.notify({
      color: 'negative',
      icon: 'error',
      message: error.message || 'Failed to save role',
    })
  } finally {
    saving.value = false
  }
}

const promptDeleteRole = (role) => {
  if (role.is_system_role) {
    $q.notify({ color: 'negative', message: 'Cannot delete system roles' })
    return
  }

  $q.dialog({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete the role "${role.name}"? Users with this role might lose their access.`,
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
      const { error } = await supabase.from('roles').delete().eq('id', role.id)

      if (error) throw error

      $q.notify({
        color: 'positive',
        icon: 'check_circle',
        message: 'Role deleted successfully',
      })
      await fetchRoles()
    } catch (error) {
      console.error('Error deleting role:', error)
      $q.notify({
        color: 'negative',
        icon: 'error',
        message: 'Failed to delete role. It may be assigned to users.',
      })
    }
  })
}

onMounted(() => {
  fetchRoles()
})
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
.hover-bg:hover {
  background-color: #f8fafc;
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
