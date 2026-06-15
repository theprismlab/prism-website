<template>
  <v-table density="compact" class="perturbation-table">
    <thead>
      <tr>
        <th>{{ F.PERT_NAME.label }}</th>
        <th>{{ F.PERT_DOSE.label }}</th>
        <th>{{ F.PERT_DOSE_UNIT.label }}</th>
        <th>{{ F.VOLUME.label }}</th>
        <th v-if="showDilutionFactor">{{ F.DILUTION_FACTOR.label }}</th>
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
            :items="doseUnitOptions"
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
        <td v-if="showDilutionFactor">
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
  const SCREEN_TYPES = { APS: 'APS', AIR: 'AIR', EPS: 'EPS' };

  const DOSE_UNITS_BY_SCREEN_TYPE = {
    [SCREEN_TYPES.APS]: ['uM', 'ug/mL'],
    [SCREEN_TYPES.AIR]: ['ug/mL'],
    DEFAULT: ['uM'],
  };

  const AIR_MAX_TOP_DOSE = 2;

  const FIELDS = {
    PERT_NAME: { key: 'pert_name', label: 'Perturbation Name' },
    PERT_DOSE: { key: 'pert_dose', label: 'Top Dose' },
    PERT_DOSE_UNIT: { key: 'pert_dose_unit', label: 'Top Dose Unit' },
    VOLUME: { key: 'volume', label: 'Volume (uL)' },
    DILUTION_FACTOR: { key: 'dilution_factor', label: 'Dilution Factor' },
    PERT_ID: { key: 'pert_id', label: 'Perturbation ID' },
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

    if (!row[FIELDS.PERT_NAME.key]) errors[FIELDS.PERT_NAME.key] = 'Required';
    if (!row[FIELDS.PERT_ID.key]) errors[FIELDS.PERT_ID.key] = 'Required';
    if (!row[FIELDS.VOLUME.key]) errors[FIELDS.VOLUME.key] = 'Required';

    const topDose = Number(row[FIELDS.PERT_DOSE.key]);
    const topDoseUnit = (row[FIELDS.PERT_DOSE_UNIT.key] || '').trim();

    if (!row[FIELDS.PERT_DOSE.key]) {
      errors[FIELDS.PERT_DOSE.key] = 'Required';
    } else if (screenType === SCREEN_TYPES.AIR && topDose > AIR_MAX_TOP_DOSE) {
      errors[FIELDS.PERT_DOSE.key] = `Max top dose for AIR submissions is ${AIR_MAX_TOP_DOSE} ug/mL`;
    }

    if (!topDoseUnit) {
      errors[FIELDS.PERT_DOSE_UNIT.key] = 'Required';
    } else {
      const allowedUnits = DOSE_UNITS_BY_SCREEN_TYPE[screenType] || DOSE_UNITS_BY_SCREEN_TYPE.DEFAULT;
      if (!allowedUnits.includes(topDoseUnit)) {
        errors[FIELDS.PERT_DOSE_UNIT.key] = `Must be one of: ${allowedUnits.join(', ')}`;
      }
    }

    if (screenType === SCREEN_TYPES.EPS && !row[FIELDS.DILUTION_FACTOR.key]) {
      errors[FIELDS.DILUTION_FACTOR.key] = 'Required';
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
    computed: {
      showDilutionFactor() {
        return this.screenType === SCREEN_TYPES.EPS;
      },
      doseUnitOptions() {
        return DOSE_UNITS_BY_SCREEN_TYPE[this.screenType] || DOSE_UNITS_BY_SCREEN_TYPE.DEFAULT;
      },
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
