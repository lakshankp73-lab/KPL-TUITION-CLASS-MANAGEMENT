<template>
  <q-page class="q-pa-md q-pa-lg-xl bg-grey-1 text-dark">
    <!-- Header Summary -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <div class="text-h4 text-weight-bolder text-primary q-mb-xs">Overview</div>
        <div class="text-body1 text-grey-7">Here's what's happening in your institute today.</div>
      </div>
      <div class="row q-gutter-sm">
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
      <div class="col-12 col-sm-6 col-md-3" v-for="stat in stats" :key="stat.title">
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
            <q-item v-for="cls in upcomingClasses" :key="cls.id" class="q-py-md">
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
const stats = [
  {
    title: 'Total Students',
    value: '1,248',
    percentage: 12.5,
    trendUp: true,
    icon: 'people',
    color: 'primary',
  },
  {
    title: "Today's Attendance",
    value: '87%',
    percentage: 2.1,
    trendUp: true,
    icon: 'fact_check',
    color: 'positive',
  },
  {
    title: 'Fee Collection',
    value: 'Rs 450K',
    percentage: 5.4,
    trendUp: true,
    icon: 'payments',
    color: 'info',
  },
  {
    title: 'Absentee Alerts',
    value: '42',
    percentage: 1.1,
    trendUp: false,
    icon: 'warning',
    color: 'warning',
  },
]

const recentStudents = [
  {
    id: 'STU-0891',
    name: 'Nipun Bandara',
    initial: 'NB',
    batch: '2024 A/L Physics',
    date: 'Oct 12, 2024',
    paid: true,
  },
  {
    id: 'STU-0892',
    name: 'Kavindi Perera',
    initial: 'KP',
    batch: '2025 O/L Maths',
    date: 'Oct 12, 2024',
    paid: false,
  },
  {
    id: 'STU-0893',
    name: 'Dasun Silva',
    initial: 'DS',
    batch: '2024 A/L Chem',
    date: 'Oct 11, 2024',
    paid: true,
  },
  {
    id: 'STU-0894',
    name: 'Senuri Fernando',
    initial: 'SF',
    batch: '2025 O/L Science',
    date: 'Oct 10, 2024',
    paid: true,
  },
]

const upcomingClasses = [
  {
    id: 1,
    time: '02:30',
    ampm: 'PM',
    subject: 'A/L Combined Maths',
    grade: '12',
    teacher: 'Mr. Perera',
  },
  {
    id: 2,
    time: '04:00',
    ampm: 'PM',
    subject: 'O/L Science Theory',
    grade: '11',
    teacher: 'Mrs. Silva',
  },
  {
    id: 3,
    time: '06:00',
    ampm: 'PM',
    subject: 'A/L Physics Revision',
    grade: '13',
    teacher: 'Dr. Bandara',
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
