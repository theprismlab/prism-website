<template>
  <v-table density="compact" class="perturbation-table">
    <thead>
      <tr>
        <th>{{ F.PERT_NAME.label }}</th>
        <th>{{ F.PERT_DOSE.label }}</th>
        <th>{{ F.PERT_DOSE_UNIT.label }}</th>
        <th>{{ F.VOLUME.label }}</th>
        <th v-if="F.DILUTION_FACTOR.showIf(data.rows[0], screenType)">{{ F.DILUTION_FACTOR.label }}</th>
        <th>{{ F.PERT_ID.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <v-text-field
            v-model="data.rows[0][F.PERT_NAME.key]"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.PERT_NAME.key]"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0][F.PERT_DOSE.key]"
            variant="plain"
            density="compact"
            single-line
            type="number"
            :error-messages="errors[F.PERT_DOSE.key]"
          />
        </td>
        <td>
          <v-select
            v-model="data.rows[0][F.PERT_DOSE_UNIT.key]"
            :items="F.PERT_DOSE_UNIT.options(screenType)"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.PERT_DOSE_UNIT.key]"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0][F.VOLUME.key]"
            variant="plain"
            density="compact"
            single-line
            type="number"
            :error-messages="errors[F.VOLUME.key]"
          />
        </td>
        <td v-if="F.DILUTION_FACTOR.showIf(data.rows[0], screenType)">
          <v-text-field
            v-model="data.rows[0][F.DILUTION_FACTOR.key]"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.DILUTION_FACTOR.key]"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0][F.PERT_ID.key]"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.PERT_ID.key]"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  const SCREEN_CONFIG = {
    APS:     { doseUnits: ['uM', 'ug/mL'], maxTopDose: null, requiresDilutionFactor: false },
    AIR:     { doseUnits: ['ug/mL'],        maxTopDose: 2,    requiresDilutionFactor: false },
    EPS:     { doseUnits: ['uM'],           maxTopDose: null, requiresDilutionFactor: true  },
    DEFAULT: { doseUnits: ['uM'],           maxTopDose: null, requiresDilutionFactor: false },
  };

  const getConfig = (screenType) => SCREEN_CONFIG[screenType] ?? SCREEN_CONFIG.DEFAULT;

  const FIELDS = {
    PERT_NAME: { key: 'pert_name', label: 'Perturbation Name', required: true },
    PERT_DOSE: {
      key: 'pert_dose',
      label: 'Top Dose',
      required: true,
      validate: (val, _data, screenType) => {
        const { maxTopDose } = getConfig(screenType);
        if (maxTopDose !== null && Number(val) > maxTopDose)
          return `Max top dose for ${screenType} submissions is ${maxTopDose} ug/mL`;
      },
    },
    PERT_DOSE_UNIT: {
      key: 'pert_dose_unit',
      label: 'Top Dose Unit',
      required: true,
      options: (screenType) => getConfig(screenType).doseUnits,
      validate: (val, _data, screenType) => {
        const { doseUnits } = getConfig(screenType);
        if (!doseUnits.includes(val.trim())) return `Must be one of: ${doseUnits.join(', ')}`;
      },
    },
    VOLUME: { key: 'volume', label: 'Volume (uL)', required: true },
    DILUTION_FACTOR: {
      key: 'dilution_factor',
      label: 'Dilution Factor',
      showIf: (_data, screenType) => getConfig(screenType).requiresDilutionFactor,
      required: true,
    },
    PERT_ID: { key: 'pert_id', label: 'Perturbation ID', required: true },
  };

  export function getInitialData() {
    return {
      rows: [Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, '']))],
    };
  }

  export function getSummary(data) {
    const row = data.rows[0];
    return Object.values(FIELDS)
      .map((f) => ({ label: f.label, value: row[f.key] }))
      .filter((item) => item.value);
  }

  export function validate(data, screenType) {
    const errors = {};
    const row = data.rows[0];
    for (const f of Object.values(FIELDS)) {
      if (f.showIf && !f.showIf(row, screenType)) continue;
      const val = row[f.key];
      if (f.required && !val) { errors[f.key] = 'Required'; continue; }
      if (f.validate && val) {
        const msg = f.validate(val, row, screenType);
        if (msg) errors[f.key] = msg;
      }
    }
    return errors;
  }

  export default {
    name: 'TestAgentStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    data() {
      return { F: FIELDS };
    },
  };
</script>

<style scoped>
  .perturbation-table th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
</style>
