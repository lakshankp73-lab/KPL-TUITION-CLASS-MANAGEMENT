<template>
  <q-page class="bg-secondary text-primary flex flex-center q-pa-md hero-section">
    <!-- Home Button -->
    <q-btn
      round
      flat
      icon="arrow_back"
      color="primary"
      to="/"
      class="absolute-top-left q-ma-md hover-scale"
      style="z-index: 10"
      size="lg"
    >
      <q-tooltip class="bg-primary text-secondary">Back to Home</q-tooltip>
    </q-btn>

    <div
      class="row full-width bg-white shadow-transition overflow-hidden relative-position border-subtle"
      style="max-width: 1100px; border-radius: 24px; z-index: 1"
    >
      <!-- IMAGE/BRAND SIDE -->
      <div
        class="col-12 col-md-5 bg-primary text-secondary flex flex-center relative-position hidden-mobile q-pa-xl"
      >
        <div class="abstract-blob blob-1"></div>
        <div class="abstract-blob blob-2"></div>
        <div class="z-top text-center">
          <q-icon name="school" size="80px" color="secondary" class="q-mb-lg" />
          <div class="text-h2 text-weight-bolder hero-title q-mb-md">Welcome Back.</div>
          <p
            class="text-h6 text-grey-5 line-height-relaxed"
            style="max-width: 320px; margin: 0 auto"
          >
            Continue managing your tuition classes like a pro with KPL EDU platform.
          </p>
        </div>
      </div>

      <!-- FORM SIDE -->
      <div
        class="col-12 col-md-7 flex flex-center q-pa-xl relative-position bg-white z-top scroll-y"
        style="max-height: 90vh"
      >
        <div class="w-full" style="max-width: 450px">
          <!-- Mobile Only Logo -->
          <div class="text-center q-mb-xl mobile-only-logo">
            <q-icon name="school" size="50px" color="primary" class="q-mb-sm" />
            <div class="text-h4 text-weight-bolder text-primary tracking-wide">KPL EDU</div>
          </div>

          <div
            class="text-subtitle1 text-accent text-weight-bold text-uppercase q-mb-sm tracking-wide"
          >
            Sign In
          </div>
          <div class="text-h3 text-weight-bolder text-primary q-mb-sm line-height-tight">
            Access Dashboard.
          </div>
          <div class="text-h6 text-grey-7 q-mb-xl line-height-relaxed">
            Enter your details below to securely log into your account.
          </div>

          <q-form @submit.prevent="handleLogin" class="q-gutter-y-md">
            <!-- Alert for Errors -->
            <q-banner v-if="errorMsg" class="bg-red-1 text-negative rounded-borders q-mb-md">
              <template v-slot:avatar>
                <q-icon name="error" color="negative" />
              </template>
              {{ errorMsg }}
            </q-banner>

            <!-- Alert for Success -->
            <q-banner v-if="successMsg" class="bg-green-1 text-positive rounded-borders q-mb-md">
              <template v-slot:avatar>
                <q-icon name="check_circle" color="positive" />
              </template>
              {{ successMsg }}
            </q-banner>

            <q-input
              v-model="email"
              type="email"
              label="Email Address"
              outlined
              color="primary"
              class="text-body1 custom-input"
              :rules="[(val) => !!val || 'Email is required']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              outlined
              color="primary"
              class="text-body1 custom-input"
              :rules="[(val) => !!val || 'Password is required']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <div class="row justify-between items-center q-mt-sm">
              <q-checkbox v-model="rememberMe" label="Remember me" color="primary" />
              <a
                href="#"
                @click.prevent="showForgotPasswordDialog = true"
                class="text-primary text-weight-bold hover-underline"
                style="text-decoration: none"
                >Forgot Password?</a
              >
            </div>

            <q-btn
              type="submit"
              color="primary"
              text-color="secondary"
              label="Sign In"
              size="lg"
              class="full-width q-mt-lg text-weight-bold rounded-borders shadow-4 hover-scale"
              :loading="loading"
            />
          </q-form>

          <div class="text-center q-mt-xl text-body1 text-grey-8">
            Don't have an account?
            <router-link
              to="/register"
              class="text-weight-bold text-primary hover-opacity q-ml-xs"
              style="text-decoration: none"
            >
              Sign up today
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Forgot Password Dialog -->
    <q-dialog v-model="showForgotPasswordDialog" persistent>
      <q-card style="min-width: 400px" class="rounded-12">
        <q-card-section class="row items-center q-pb-none border-bottom">
          <div class="text-h6 text-weight-bold">Reset Password</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="text-body2 text-grey-7 q-mb-md">
            Enter your email address to request a new password from the Administrator.
          </div>
          <q-form @submit.prevent="handleForgotPassword" class="q-gutter-md">
            <div>
              <q-input
                v-model="forgotEmail"
                outlined
                dense
                color="primary"
                class="custom-input"
                type="email"
                placeholder="Email Address"
                :rules="[(val) => !!val || 'Email is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
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
                label="Send Request"
                type="submit"
                color="primary"
                class="rounded-borders hover-scale text-weight-bold"
                :loading="sendingResetLink"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/boot/supabase'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

const errorMsg = ref('')
const successMsg = ref('')

const showForgotPasswordDialog = ref(false)
const forgotEmail = ref('')
const sendingResetLink = ref(false)

const handleForgotPassword = async () => {
  sendingResetLink.value = true
  try {
    // Check if user exists and add request implicitly on the backend via RPC (Security Definer to bypass RLS)
    const { error } = await supabase.rpc('request_password_reset', {
      user_email: forgotEmail.value,
    })

    if (error) {
      if (error.message.includes('No account found')) {
        throw new Error('No account found with this email address.')
      }
      throw error
    }

    // Success
    showForgotPasswordDialog.value = false

    $q.dialog({
      title: 'Request Sent',
      message:
        'Your password reset request has been successfully sent to the Administrator. They will provide a new password shortly.',
      color: 'positive',
      ok: {
        label: 'Got it',
        color: 'primary',
        unelevated: true,
      },
    })

    forgotEmail.value = ''
  } catch (error) {
    console.error('Error sending reset request:', error)
    errorMsg.value = error.message || 'Failed to send reset request'
  } finally {
    sendingResetLink.value = false
  }
}

const handleLogin = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      errorMsg.value = error.message
    } else {
      successMsg.value = 'Logged in successfully!'

      // Redirect to home/dashboard on successful login
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    }
  } catch (err) {
    errorMsg.value = 'An unexpected error occurred.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.w-full {
  width: 100%;
}
.hidden-mobile {
  @media (max-width: 899px) {
    /* increased breakpoint so forms aren't squished */
    display: none !important;
  }
}
.mobile-only-logo {
  display: none;
  @media (max-width: 899px) {
    display: block;
  }
}
.scroll-y {
  overflow-y: auto;
}
.line-height-tight {
  line-height: 1.15;
}
.line-height-relaxed {
  line-height: 1.6;
}
.tracking-wide {
  letter-spacing: 2px;
}
.hero-section {
  padding-top: 40px;
  padding-bottom: 40px;
}
.hero-title {
  line-height: 1.1;
  letter-spacing: -2px;
}
.custom-input :deep(.q-field__control) {
  border-radius: 12px;
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
.hover-underline {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--q-primary);
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
}
.hover-opacity {
  opacity: 0.8;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
}
.shadow-transition {
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 40px 60px -15px rgba(0, 0, 0, 0.2);
  }
}
.border-subtle {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

/* Abstract decorations */
.abstract-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.15;
}
.blob-1 {
  width: 400px;
  height: 400px;
  background: #fff;
  top: -100px;
  right: -50px;
}
.blob-2 {
  width: 300px;
  height: 300px;
  background: #ccc;
  bottom: -50px;
  left: -50px;
}

/* Responsive Grid Adjustments */
@media (max-width: 899px) {
  /* specific adjustments for missing left pane */
  .col-md-7 {
    width: 100%;
  }
}

/* Global Responsive Typography for Auth Panel */
@media (max-width: 599px) {
  .text-h2 {
    font-size: 2.25rem !important;
    line-height: 1.2 !important;
  }
  .text-h3 {
    font-size: 1.75rem !important;
    line-height: 1.3 !important;
  }
}
</style>
