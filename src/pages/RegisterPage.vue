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
          <q-icon name="rocket_launch" size="80px" color="secondary" class="q-mb-lg" />
          <div class="text-h2 text-weight-bolder hero-title q-mb-md">Join KPL EDU.</div>
          <p
            class="text-h6 text-grey-5 line-height-relaxed"
            style="max-width: 320px; margin: 0 auto"
          >
            Empower your teaching journey. Streamline your classes and grow your institute today.
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
            Create Account
          </div>
          <div class="text-h3 text-weight-bolder text-primary q-mb-sm line-height-tight">
            Get Started.
          </div>
          <div class="text-h6 text-grey-7 q-mb-xl line-height-relaxed">
            Sign up below to access your powerful new dashboard.
          </div>

          <q-form @submit.prevent="handleRegister" class="q-gutter-y-md">
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

            <!-- Full Name -->
            <q-input
              v-model="fullName"
              type="text"
              label="Full Name"
              outlined
              color="primary"
              class="text-body1 custom-input"
              :rules="[(val) => !!val || 'Full Name is required']"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <!-- Email -->
            <q-input
              v-model="email"
              type="email"
              label="Email Address"
              outlined
              color="primary"
              class="text-body1 custom-input"
              :rules="[
                (val) => !!val || 'Email is required',
                (val) => /.+@.+\..+/.test(val) || 'Enter a valid email',
              ]"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <!-- Password -->
            <q-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              outlined
              color="primary"
              class="text-body1 custom-input"
              :rules="[
                (val) => !!val || 'Password is required',
                (val) => val.length >= 6 || 'Password must be at least 6 characters',
              ]"
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

            <!-- Confirm Password -->
            <q-input
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              label="Confirm Password"
              outlined
              color="primary"
              class="text-body1 custom-input"
              :rules="[
                (val) => !!val || 'Please confirm your password',
                (val) => val === password || 'Passwords do not match',
              ]"
              lazy-rules
            >
              <template v-slot:prepend>
                <q-icon name="lock_reset" />
              </template>
            </q-input>

            <q-btn
              type="submit"
              color="primary"
              text-color="secondary"
              label="Create Account"
              size="lg"
              class="full-width q-mt-lg text-weight-bold rounded-borders shadow-4 hover-scale"
              :loading="loading"
            />
          </q-form>

          <div class="text-center q-mt-xl text-body1 text-grey-8">
            Already have an account?
            <router-link
              to="/login"
              class="text-weight-bold text-primary hover-opacity q-ml-xs"
              style="text-decoration: none"
            >
              Sign in here
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'src/boot/supabase'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const loading = ref(false)

const errorMsg = ref('')
const successMsg = ref('')

const handleRegister = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  loading.value = true

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
        },
      },
    })

    if (error) {
      errorMsg.value = error.message
    } else {
      successMsg.value = 'Registration successful! Please check your email to verify your account.'
      setTimeout(() => {
        router.push('/login')
      }, 2500)
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
