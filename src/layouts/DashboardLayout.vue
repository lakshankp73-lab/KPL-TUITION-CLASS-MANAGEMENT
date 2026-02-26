<template>
  <q-layout view="hHh Lpr lFf" class="bg-grey-1 text-dark">
    <!-- HEADER (TOP BAR) -->
    <q-header elevated class="bg-white text-dark shadow-1 border-bottom">
      <q-toolbar class="q-py-sm">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm"
        />

        <!-- Brand Name/Logo -->
        <q-toolbar-title class="text-weight-bold row items-center no-wrap">
          <q-avatar size="32px" color="primary" text-color="secondary" class="q-mr-sm">
            <q-icon name="school" />
          </q-avatar>
          <span class="text-primary tracking-wide">KPL EDU</span>
        </q-toolbar-title>

        <q-space />

        <!-- Notification Bell -->
        <q-btn flat round icon="notifications_none" class="q-mr-sm">
          <q-badge color="negative" floating rounded>3</q-badge>
        </q-btn>

        <!-- User Profile Dropdown -->
        <q-btn-dropdown flat no-caps class="q-pa-xs no-border-radius">
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="36px" color="primary" text-color="white">
                {{ userInitials }}
              </q-avatar>
              <div class="q-ml-sm q-mr-xs text-weight-medium gt-xs text-left line-height-tight">
                <div class="text-dark">{{ userName }}</div>
                <div class="text-caption text-grey-6 text-weight-regular">Administrator</div>
              </div>
            </div>
          </template>

          <q-list style="min-width: 200px">
            <q-item clickable v-close-popup to="/dashboard/profile">
              <q-item-section avatar>
                <q-icon name="person" color="grey-7" />
              </q-item-section>
              <q-item-section>My Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="settings" color="grey-7" />
              </q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="handleLogout" class="text-negative">
              <q-item-section avatar>
                <q-icon name="logout" color="negative" />
              </q-item-section>
              <q-item-section class="text-weight-bold">Sign Out</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- SIDEBAR (DRAWER) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-white" :width="260">
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-9 q-mt-sm">
          <div class="text-overline q-px-md text-grey-6 text-weight-bolder q-mb-xs">MAIN MENU</div>

          <!-- Menu Links -->
          <q-item
            v-for="link in mainLinks"
            :key="link.title"
            clickable
            v-ripple
            :to="link.path"
            exact
            active-class="active-menu-item"
            class="q-mx-sm q-mb-xs menu-item-rounded"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" size="sm" />
            </q-item-section>
            <q-item-section class="text-weight-medium">
              {{ link.title }}
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          <div class="text-overline q-px-md text-grey-6 text-weight-bolder q-mb-xs">
            ADMINISTRATION
          </div>

          <q-item
            v-for="link in adminLinks"
            :key="link.title"
            clickable
            v-ripple
            :to="link.path"
            exact
            active-class="active-menu-item"
            class="q-mx-sm q-mb-xs menu-item-rounded"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" size="sm" />
            </q-item-section>
            <q-item-section class="text-weight-medium">
              {{ link.title }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- MAIN PAGE CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/boot/supabase'

const router = useRouter()
const leftDrawerOpen = ref(false)
const user = ref(null)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session?.user) {
    user.value = session.user
  }
})

const userName = computed(() => {
  return user.value?.user_metadata?.full_name || 'Administrator'
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

const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    router.push('/login')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

// Sidebar links configuration suitable for a Tuition Management System
const mainLinks = [
  { title: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { title: 'Students', icon: 'people', path: '/dashboard/students' },
  { title: 'Classes & Batches', icon: 'class', path: '/dashboard/classes' },
  { title: 'Attendance', icon: 'fact_check', path: '/dashboard/attendance' },
  { title: 'Fees Collection', icon: 'payments', path: '/dashboard/fees' },
  { title: 'Exams & Results', icon: 'leaderboard', path: '/dashboard/exams' },
]

const adminLinks = [
  { title: 'Staff Directory', icon: 'badge', path: '/dashboard/staff' },
  { title: 'Reports', icon: 'insert_chart', path: '/dashboard/reports' },
  { title: 'Settings', icon: 'settings', path: '/dashboard/settings' },
]
</script>

<style scoped lang="scss">
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.tracking-wide {
  letter-spacing: 1.5px;
}
.line-height-tight {
  line-height: 1.2;
}
.menu-item-rounded {
  border-radius: 8px;
  transition: all 0.2s ease;
}
.menu-item-rounded:hover {
  background: rgba(0, 0, 0, 0.03);
}

/* Active State for side menu */
.active-menu-item {
  color: var(--q-primary) !important;
  background: rgba(0, 0, 0, 0.05) !important;
  font-weight: 700;
}
.active-menu-item .q-icon {
  color: var(--q-primary) !important;
}

/* Custom shadow to give a more flat UI elegant feel */
.shadow-1 {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03) !important;
}
</style>
