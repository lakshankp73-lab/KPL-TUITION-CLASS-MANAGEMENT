<template>
  <q-layout view="hHh lpR fff">
    <!-- HEADER -->
    <q-header class="bg-secondary text-primary border-bottom shadow-1 z-max" height-hint="80">
      <q-toolbar class="q-py-md header-padding">
        <!-- LOGO -->
        <q-btn flat no-caps :ripple="false" class="q-px-none hover-scale-logo">
          <q-toolbar-title class="text-weight-bolder text-h5 row items-center">
            <q-avatar
              size="40px"
              font-size="24px"
              color="primary"
              text-color="secondary"
              class="q-mr-sm shadow-3"
            >
              <q-icon name="school" />
            </q-avatar>
            <span class="letter-spacing-logo">KPL EDU</span>
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <!-- DESKTOP NAV -->
        <div class="gt-sm row items-center">
          <q-btn
            flat
            no-caps
            label="Features"
            class="q-mx-xs text-weight-bold text-body1 hover-underline"
          />
          <q-btn
            flat
            no-caps
            label="How it Works"
            class="q-mx-xs text-weight-bold text-body1 hover-underline"
          />
          <q-btn
            flat
            no-caps
            label="Pricing"
            class="q-mx-xs text-weight-bold text-body1 hover-underline"
          />

          <div class="q-mx-md separator-vertical"></div>

          <template v-if="!authInitialized">
            <q-spinner color="primary" size="2em" class="q-mx-md" />
          </template>
          <template v-else-if="user">
            <div class="row items-center q-mr-md">
              <q-avatar size="32px" color="primary" text-color="secondary" class="q-mr-sm">
                <q-icon name="person" />
              </q-avatar>
              <div class="text-weight-bold text-primary">
                {{ user.user_metadata?.full_name?.split(' ')[0] || 'User' }}
              </div>
            </div>
            <q-btn
              unelevated
              color="primary"
              text-color="secondary"
              no-caps
              label="Dashboard"
              to="/dashboard"
              class="q-px-lg shadow-4 rounded-borders text-weight-bold text-body1 hover-scale q-mr-sm"
            />
            <q-btn
              flat
              no-caps
              label="Sign Out"
              @click="handleLogout"
              class="text-weight-bold text-body1 hover-opacity text-negative"
            />
          </template>
          <template v-else>
            <q-btn
              flat
              no-caps
              label="Sign In"
              to="/login"
              class="q-mr-sm text-weight-bold text-body1 hover-opacity"
            />
            <q-btn
              unelevated
              color="primary"
              text-color="secondary"
              no-caps
              label="Get Started"
              to="/register"
              class="q-px-lg shadow-4 rounded-borders text-weight-bold text-body1 hover-scale"
            />
          </template>
        </div>

        <!-- MOBILE MENU BTN -->
        <div class="lt-md">
          <q-btn flat round dense icon="menu" size="lg" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FOOTER -->
    <q-footer class="bg-primary text-secondary q-pt-xl q-pb-lg">
      <div class="max-width-container mx-auto q-px-xl">
        <div class="row q-col-gutter-lg justify-between text-responsive-left">
          <!-- BRAND & DESC -->
          <div class="col-12 col-md-4">
            <div
              class="text-h5 text-weight-bolder q-mb-lg flex items-center justify-responsive-start"
            >
              <q-icon name="school" size="md" class="q-mr-sm" /> KPL EDU
            </div>
            <div class="text-body2 text-grey-5 q-mb-md line-height-relaxed custom-desc-margin">
              The ultimate all-in-one class management system for modern educators. Streamline your
              operations, boost revenue, and focus on teaching.
            </div>
            <div class="row q-gutter-sm justify-responsive-start q-mt-md">
              <q-btn flat round dense icon="facebook" size="sm" class="bg-grey-9 hover-white" />
              <q-btn flat round dense icon="public" size="sm" class="bg-grey-9 hover-white" />
              <q-btn flat round dense icon="mail" size="sm" class="bg-grey-9 hover-white" />
            </div>
          </div>

          <!-- LINKS 1 -->
          <div class="col-12 col-sm-4 col-md-2 footer-link-col">
            <div class="text-subtitle1 text-weight-bold q-mb-lg text-white">Product</div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Features
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Integrations
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Pricing
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Changelog
            </div>
          </div>

          <!-- LINKS 2 -->
          <div class="col-12 col-sm-4 col-md-2 footer-link-col">
            <div class="text-subtitle1 text-weight-bold q-mb-lg text-white">Resources</div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Documentation
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Help Center
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Community
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Blog
            </div>
          </div>

          <!-- LINKS 3 -->
          <div class="col-12 col-sm-4 col-md-2 footer-link-col">
            <div class="text-subtitle1 text-weight-bold q-mb-lg text-white">Legal</div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Privacy Policy
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Terms of Service
            </div>
            <div class="text-body2 text-grey-5 cursor-pointer hover-white transition-quick q-mb-md">
              Cookie Policy
            </div>
          </div>
        </div>

        <q-separator color="grey-9" class="q-my-lg" />

        <div
          class="row items-center justify-between text-caption text-grey-6 flex-responsive-column text-responsive-left"
        >
          <div class="q-mb-sm-none q-mb-sm full-width-mobile">
            &copy; {{ new Date().getFullYear() }} KPL Education Systems. All rights reserved. <br />
            <span class="text-grey-7 text-caption">Powered by KPL Lanka (Pvt) Ltd</span>
          </div>
          <div
            class="row q-gutter-md q-mt-sm q-mt-desktop-none justify-responsive-start full-width-mobile"
          >
            <span>Made with <q-icon name="favorite" color="negative" /> in Sri Lanka</span>
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/boot/supabase'

const router = useRouter()
const user = ref(null)
const authInitialized = ref(false)
let authListener = null

onMounted(async () => {
  // Fetch immediately on mount
  const {
    data: { session },
  } = await supabase.auth.getSession()
  user.value = session?.user || null
  authInitialized.value = true

  // Set up auth state listener
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })
  if (data?.subscription) {
    authListener = data.subscription
  }
})

onUnmounted(() => {
  if (authListener) {
    authListener.unsubscribe()
  }
})

const handleLogout = async () => {
  try {
    await supabase.auth.signOut()
    router.push('/login')
  } catch (err) {
    console.error('Logout error:', err)
  }
}
</script>

<style lang="scss">
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.max-width-container {
  max-width: 1280px;
}
.header-padding {
  padding-left: 24px;
  padding-right: 24px;
  @media (min-width: 1024px) {
    padding-left: 48px;
    padding-right: 48px;
  }
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.custom-desc-margin {
  max-width: 300px;
  margin: 0 auto;
  @media (min-width: 1024px) {
    margin-left: 0;
  }
}
.letter-spacing-logo {
  letter-spacing: 1px;
}
.hover-scale-logo {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
}
.hover-underline {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--q-primary);
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 60%;
  }
}
.hover-opacity {
  opacity: 0.8;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
}
.hover-scale {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
.separator-vertical {
  height: 24px;
  width: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}
.transition-quick {
  transition: color 0.2s ease;
}
.hover-white:hover {
  color: #fff !important;
}
.line-height-relaxed {
  line-height: 1.6;
}

/* Base styles for the layout */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: var(--q-primary);
  background-color: var(--q-secondary);
}

/* Responsive Utilities */
.text-responsive-left {
  text-align: center;
  @media (min-width: 1024px) {
    text-align: left;
  }
}
.text-responsive-right {
  text-align: center;
  @media (min-width: 1024px) {
    text-align: right;
  }
}
.justify-responsive-start {
  justify-content: center;
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
}
.footer-link-col {
  @media (max-width: 1023px) {
    margin-top: 48px;
  }
}
.flex-responsive-column {
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
}
.full-width-mobile {
  @media (max-width: 599px) {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
</style>
