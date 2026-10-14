<template>
  <v-table class="stat-table" density="comfortable">
    <thead>
      <tr>
        <th>{{ title }}</th>
        <th class="text-right">{{ subtitle }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="stat in stats" :key="stat.label">
        <td>{{ stat.label }}</td>
        <td class="text-right stat-table-value">{{ stat.value }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    name: 'StatTable',
    props: {
      title: { type: String, required: true },
      // Shown in the header beside the title (e.g. "14 distinct")
      subtitle: { type: String, default: '' },
      // [{ label, value }]
      stats: { type: Array, required: true },
    },
  };
</script>

<style scoped>
  .stat-table {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
  }

  .stat-table th {
    background: #fafafa;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--v-grey-darken-2) !important;
    white-space: nowrap;
  }

  .stat-table th.text-right {
    font-weight: 500 !important;
    letter-spacing: normal;
    text-transform: none;
    color: var(--v-grey-darken-1) !important;
  }

  .stat-table-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
</style>
