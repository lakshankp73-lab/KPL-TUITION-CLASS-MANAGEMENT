<template>
  <q-page class="bg-secondary text-primary">
    <!-- HERO SECTION -->
    <section class="relative-position hero-section flex flex-center">
      <div
        class="row items-center justify-between max-width-container mx-auto q-px-md q-px-md-xl full-width"
      >
        <div
          class="col-12 col-md-6 q-pr-desktop-xl text-responsive-left z-top q-mb-xl q-mb-md-none"
        >
          <div
            class="text-subtitle1 text-accent text-weight-bold text-uppercase q-mb-sm tracking-wide"
          >
            Next-Gen Education
          </div>
          <div class="text-h2 text-weight-bolder q-mb-md hero-title">
            Manage Your <br /><span class="text-accent text-italic">Tuition Classes</span>
            <br />Like a Pro.
          </div>
          <p class="text-h6 text-grey-8 q-mb-lg text-weight-regular custom-p-margin">
            The all-in-one platform built for modern educators to streamline attendance, payments,
            and student progress in one powerful dashboard.
          </p>
          <div class="row q-gutter-md justify-responsive-start">
            <q-btn
              size="lg"
              color="primary"
              text-color="secondary"
              label="Start Free Trial"
              class="text-weight-bold q-px-lg rounded-borders shadow-8 hover-scale"
            />
            <q-btn
              size="lg"
              outline
              color="primary"
              label="See Features"
              class="text-weight-bold q-px-lg rounded-borders hover-scale"
              icon-right="arrow_downward"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 text-center relative-position z-top">
          <q-img
            src="/images/tuition_hero_mockup.png"
            spinner-color="primary"
            class="hero-img shadow-transition"
          />
          <!-- Decorative abstract blobs behind image -->
          <div class="abstract-blob blob-1"></div>
          <div class="abstract-blob blob-2"></div>
        </div>
      </div>
    </section>

    <!-- STATS BANNER -->
    <section class="bg-primary text-secondary q-py-xl border-y-accent">
      <div
        class="row justify-center q-col-gutter-xl text-center max-width-container mx-auto full-width"
      >
        <div class="col-6 col-sm-3">
          <div class="text-h3 text-weight-bolder">10k+</div>
          <div class="text-subtitle1 text-grey-5 q-mt-xs">Active Students</div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="text-h3 text-weight-bolder">500+</div>
          <div class="text-subtitle1 text-grey-5 q-mt-xs">Institutes</div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="text-h3 text-weight-bolder">99.9%</div>
          <div class="text-subtitle1 text-grey-5 q-mt-xs">Uptime</div>
        </div>
      </div>
    </section>

    <!-- FEATURES SECTION -->
    <section class="q-py-xl q-px-md bg-white text-primary pb-100">
      <div class="text-center q-mb-xl q-mt-md">
        <div
          class="text-subtitle1 text-accent text-weight-bold text-uppercase q-mb-sm tracking-wide"
        >
          Why Choose Us
        </div>
        <div class="text-h3 text-weight-bolder q-mb-sm">Everything you need.</div>
        <div class="text-h6 text-grey-7">
          Powerful features designed to save you time and maximize productivity.
        </div>
      </div>

      <div
        class="row q-col-gutter-md q-col-gutter-md-xl justify-center max-width-container mx-auto"
      >
        <div class="col-12 col-sm-6 col-md-4" v-for="feature in features" :key="feature.title">
          <q-card
            flat
            class="q-pa-lg feature-card full-height rounded-borders-lg hover-elevate transition-all border-subtle text-responsive-left"
          >
            <q-avatar size="60px" color="primary" text-color="secondary" class="q-mb-md shadow-3">
              <q-icon :name="feature.icon" size="30px" />
            </q-avatar>
            <div class="text-h5 text-weight-bold q-mb-sm">{{ feature.title }}</div>
            <div class="text-body1 text-grey-8 line-height-relaxed">{{ feature.desc }}</div>
          </q-card>
        </div>
      </div>
    </section>

    <!-- SHOWCASE SECTION -->
    <section class="q-py-xl bg-secondary text-primary border-top flex flex-center">
      <div
        class="row items-center justify-between max-width-container mx-auto q-px-md q-px-md-xl full-width"
      >
        <div class="col-12 col-md-6 q-mb-xl q-mb-md-none text-center order-flip">
          <q-img
            src="/images/tuition_feature_mockup.png"
            spinner-color="primary"
            class="showcase-img shadow-transition rounded-borders-xl relative-position z-top"
          />
          <div class="abstract-blob blob-3"></div>
        </div>
        <div class="col-12 col-md-6 q-pl-desktop-xl text-responsive-left">
          <div class="custom-p-margin" style="margin-left: 0; max-width: 550px">
            <div
              class="text-subtitle1 text-accent text-weight-bold text-uppercase q-mb-sm tracking-wide"
            >
              Insights & Analytics
            </div>
            <div class="text-h3 text-weight-bolder q-mb-md line-height-tight">
              Data-driven decisions for your institute.
            </div>
            <p class="text-h6 text-grey-8 q-mb-lg line-height-relaxed">
              Get real-time insights into attendance trends, fee collection, and student
              performance. Our advanced analytics help you identify areas for improvement instantly.
            </p>

            <q-list
              class="q-mb-lg row justify-responsive-start"
              style="display: inline-block; text-align: left"
            >
              <q-item v-for="n in 3" :key="n" dense class="q-pa-none q-mb-sm">
                <q-item-section avatar min-width="36px">
                  <q-icon color="primary" name="check_circle" size="md" />
                </q-item-section>
                <q-item-section class="text-h6 text-weight-medium">
                  {{
                    [
                      'Automated Progress Reports',
                      'Fee Payment Tracking',
                      'Smart Attendance Marking',
                    ][n - 1]
                  }}
                </q-item-section>
              </q-item>
            </q-list>

            <div class="row justify-responsive-start">
              <q-btn
                size="lg"
                color="primary"
                text-color="secondary"
                label="Explore Analytics"
                icon-right="analytics"
                outline
                class="text-weight-bold q-px-lg rounded-borders hover-scale q-mt-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section
      class="q-py-xl q-px-md bg-primary text-secondary text-center relative-position overflow-hidden"
    >
      <div class="abstract-pattern-overlay"></div>
      <div class="q-py-xl z-top relative-position">
        <div class="text-h2 text-weight-bolder q-mb-md">Ready to scale your class?</div>
        <div class="text-h5 text-grey-4 q-mb-xl">
          Join hundreds of successful educators using KPL Edu today.
        </div>
        <q-btn
          size="xl"
          color="secondary"
          text-color="primary"
          label="Get Started for Free"
          class="text-weight-bolder q-px-xl rounded-borders shadow-4 hover-scale"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
const features = [
  {
    icon: 'people',
    title: 'Student Management',
    desc: 'Securely manage student profiles, enrollments, and academic histories in a centralized database.',
  },
  {
    icon: 'fact_check',
    title: 'Smart Attendance',
    desc: 'Quickly mark and track attendance using QR codes or manual entry with automated parent notifications.',
  },
  {
    icon: 'payments',
    title: 'Fee Collection',
    desc: 'Track payments, send automated invoice reminders, and manage multiple fee structures gracefully.',
  },
  {
    icon: 'sms',
    title: 'Communication Suite',
    desc: 'Send bulk SMS or emails to students and parents regarding schedule changes, exams, and holidays.',
  },
  {
    icon: 'leaderboard',
    title: 'Exam & Results',
    desc: 'Conduct online exams, publish results, and generate holistic progress cards for every student.',
  },
  {
    icon: 'settings',
    title: 'Admin Control',
    desc: 'Manage your staff, assign roles and permissions, and oversee the entire operation from a master dashboard.',
  },
]
</script>

<style lang="scss">
.text-responsive-left {
  text-align: center;
  @media (min-width: 1024px) {
    text-align: left;
  }
}
.justify-responsive-start {
  justify-content: center;
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
}
.q-pr-desktop-xl {
  @media (min-width: 1024px) {
    padding-right: 48px;
  }
}
.q-mt-desktop-none {
  @media (min-width: 1024px) {
    margin-top: 0 !important;
  }
}
.q-pl-desktop-xl {
  @media (min-width: 1024px) {
    padding-left: 48px;
  }
}
.order-flip {
  order: 2;
  @media (min-width: 1024px) {
    order: 1;
  }
}
.hero-section {
  padding-top: 40px;
  padding-bottom: 40px;
  overflow: hidden;
  @media (min-width: 1024px) {
    padding-top: 40px;
    padding-bottom: 60px;
  }
}
.hero-title {
  line-height: 1.1;
  letter-spacing: -2px;
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
.hero-img {
  max-width: 100%;
  width: 550px;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
}
.showcase-img {
  max-width: 100%;
  width: 500px;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
}
.shadow-transition {
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 40px 60px -15px rgba(0, 0, 0, 0.3);
  }
}
.hover-scale {
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
}
.max-width-container {
  max-width: 1280px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.pb-100 {
  padding-bottom: 100px;
}
.custom-p-margin {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 1024px) {
    margin-left: 0;
  }
}
.feature-card {
  background: white;
  z-index: 1;
}
.border-subtle {
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.rounded-borders-lg {
  border-radius: 16px;
}
.rounded-borders-xl {
  border-radius: 24px;
}
.hover-elevate {
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.15);
  }
}
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.border-y-accent {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  background: #000;
  top: -100px;
  right: -50px;
}
.blob-2 {
  width: 300px;
  height: 300px;
  background: #888;
  bottom: -50px;
  left: -50px;
}
.blob-3 {
  width: 500px;
  height: 500px;
  background: #000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.abstract-pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.5;
  z-index: 0;
}

/* Global Responsive Typography */
@media (max-width: 599px) {
  .text-h2 {
    font-size: 2.25rem !important;
    line-height: 1.2 !important;
  }
  .text-h3 {
    font-size: 1.75rem !important;
    line-height: 1.3 !important;
  }
  .text-h5,
  .q-card .text-h5 {
    font-size: 1.25rem !important;
  }
}
@media (min-width: 600px) and (max-width: 1023px) {
  .text-h2 {
    font-size: 3rem !important;
    line-height: 1.2 !important;
  }
  .text-h3 {
    font-size: 2.25rem !important;
  }
}
</style>
