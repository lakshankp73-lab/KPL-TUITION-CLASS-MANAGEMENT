<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-grey-1 text-dark">
    <!-- Header Summary -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h4 text-weight-bolder text-primary q-mb-xs">Institute Overview</div>
        <div class="text-body1 text-grey-7">Here's what's happening in your institute today.</div>
      </div>
      <div class="row q-gutter-md">
        <q-btn
          unelevated
          outline
          color="primary"
          icon="file_download"
          label="Export Report"
          class="rounded-borders hover-scale text-weight-bold"
        />
        <q-btn
          unelevated
          color="primary"
          text-color="white"
          icon="add"
          label="New Admission"
          class="rounded-borders hover-scale text-weight-bold shadow-2"
        />
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-sm-6 col-md-3" v-for="stat in adminStats" :key="stat.title">
        <q-card
          class="q-pa-md shadow-1 border-subtle stat-card hover-elevate cursor-pointer rounded-12 bg-white flex column justify-between h-full"
        >
          <div class="row items-center justify-between q-mb-lg">
            <div class="text-subtitle2 text-grey-7 text-uppercase text-weight-bold tracking-wide">
              {{ stat.title }}
            </div>
            <q-icon
              :name="stat.icon"
              :color="stat.color"
              size="sm"
              class="bg-grey-2 q-pa-xs rounded-borders"
            />
          </div>
          <div>
            <div class="text-h3 text-weight-bolder text-dark">{{ stat.value }}</div>
            <div class="row items-center q-mt-sm">
              <q-icon
                :name="stat.trendUp ? 'trending_up' : 'trending_down'"
                :color="stat.trendUp ? 'positive' : 'negative'"
                size="16px"
              />
              <div
                :class="stat.trendUp ? 'text-positive' : 'text-negative'"
                class="q-ml-xs text-caption text-weight-bold"
              >
                {{ stat.percentage }}%
              </div>
              <div class="text-caption text-grey-5 q-ml-xs">vs last month</div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Charts and Tables Area -->
    <div class="row q-col-gutter-lg">
      <!-- Recent Admissions (Table) -->
      <div class="col-12 col-lg-8">
        <q-card class="shadow-1 border-subtle rounded-12 bg-white main-card">
          <div class="row items-center justify-between q-pa-md border-bottom">
            <div class="text-h6 text-weight-bold text-dark">Recent Admissions</div>
            <q-btn
              flat
              color="primary"
              label="View All"
              class="text-weight-bold hover-underline"
              no-caps
            />
          </div>
          <q-markup-table flat bordered class="no-shadow">
            <thead>
              <tr class="bg-grey-1 text-grey-8 text-left">
                <th class="text-weight-bold">Student Name</th>
                <th class="text-weight-bold">Grade / Batch</th>
                <th class="text-weight-bold">Date Joined</th>
                <th class="text-weight-bold">Fee Status</th>
                <th class="text-weight-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="recentStudents.length === 0">
                <td colspan="5" class="text-center q-pa-lg text-grey-6">
                  No recent admissions found.
                </td>
              </tr>
              <tr
                v-for="student in recentStudents"
                :key="student.id"
                class="text-dark table-row-hover"
              >
                <td>
                  <div class="row items-center">
                    <q-avatar
                      size="32px"
                      color="primary"
                      text-color="white"
                      class="q-mr-sm text-caption"
                    >
                      {{ student.initial }}
                    </q-avatar>
                    <div>
                      <div class="text-weight-medium">{{ student.name }}</div>
                      <div class="text-caption text-grey-6">{{ student.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-weight-medium text-grey-8">{{ student.batch }}</td>
                <td class="text-grey-8">{{ student.date }}</td>
                <td>
                  <q-chip
                    size="sm"
                    :color="student.paid ? 'positive' : 'warning'"
                    :text-color="student.paid ? 'white' : 'dark'"
                    class="text-weight-bold rounded-borders"
                  >
                    {{ student.paid ? 'Paid' : 'Pending' }}
                  </q-chip>
                </td>
                <td class="text-right">
                  <q-btn flat round dense icon="more_vert" color="grey-7" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </div>

      <!-- Quick Actions & Alerts -->
      <div class="col-12 col-lg-4">
        <q-card class="q-mb-lg shadow-1 border-subtle rounded-12 bg-white main-card">
          <div class="q-pa-md border-bottom">
            <div class="text-h6 text-weight-bold text-dark">Upcoming Classes</div>
          </div>
          <q-list separator>
            <q-item v-if="adminUpcomingClasses.length === 0" class="q-pa-xl flex flex-center">
              <div class="text-grey-6">No upcoming classes.</div>
            </q-item>

            <q-item v-for="cls in adminUpcomingClasses" :key="cls.id" class="q-py-md">
              <q-item-section avatar>
                <div
                  class="text-center rounded-borders q-pa-xs bg-grey-2 border-subtle"
                  style="min-width: 50px"
                >
                  <div class="text-weight-bolder text-primary text-subtitle1 line-height-tight">
                    {{ cls.time }}
                  </div>
                  <div class="text-caption text-grey-6 text-uppercase text-weight-bold">
                    {{ cls.ampm }}
                  </div>
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold text-dark">{{ cls.subject }}</q-item-label>
                <q-item-label caption class="text-grey-7"
                  >Grade {{ cls.grade }} • {{ cls.teacher }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
          <div class="q-pa-sm text-center border-top">
            <q-btn
              flat
              color="primary"
              label="See Full Schedule"
              class="full-width text-weight-bold"
              no-caps
            />
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// ----- ADMIN DATA -----
const adminStats = [
  {
    title: 'Total Students',
    value: '1,240',
    percentage: 12,
    trendUp: true,
    icon: 'people',
    color: 'primary',
  },
  {
    title: "Today's Attendance",
    value: '842',
    percentage: 5,
    trendUp: true,
    icon: 'fact_check',
    color: 'positive',
  },
  {
    title: 'Fee Collection',
    value: 'LKR 2.4M',
    percentage: 8,
    trendUp: true,
    icon: 'payments',
    color: 'info',
  },
  {
    title: 'Absentee Alerts',
    value: '28',
    percentage: 2,
    trendUp: false,
    icon: 'warning',
    color: 'warning',
  },
]

const recentStudents = [
  {
    id: 'STU-1024',
    name: 'Kasun Perera',
    initial: 'K',
    batch: '2025 A/L',
    date: 'Oct 12, 2023',
    paid: true,
  },
  {
    id: 'STU-1025',
    name: 'Nethmi Silva',
    initial: 'N',
    batch: '2026 O/L',
    date: 'Oct 12, 2023',
    paid: false,
  },
  {
    id: 'STU-1026',
    name: 'Lahiru Kumara',
    initial: 'L',
    batch: '2025 A/L',
    date: 'Oct 11, 2023',
    paid: true,
  },
]

const adminUpcomingClasses = [
  {
    id: 1,
    time: '14:30',
    ampm: 'PM',
    subject: 'Physics Theory',
    grade: '12',
    teacher: 'Amila Kumara',
  },
  {
    id: 2,
    time: '16:00',
    ampm: 'PM',
    subject: 'Chemistry Revision',
    grade: '13',
    teacher: 'Saman Perera',
  },
]
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
.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.tracking-wide {
  letter-spacing: 1px;
}
.line-height-tight {
  line-height: 1.1;
}
.hover-bg:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.transition {
  transition: background-color 0.2s;
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
.hover-elevate {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}
.hover-elevate:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.15);
}
.hover-underline:hover {
  text-decoration: underline;
}
.table-row-hover:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.shadow-1 {
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03) !important;
}
.h-full {
  height: 100%;
}
.main-card {
  height: 100%;
}
</style>
