# Test Agent Schema

Field definitions, column order, and validation rules for each screen type. The source of truth is `testAgentSchema.js`; this document explains the intent behind each screen's rules.

All fields are required unless marked optional. All numeric fields are validated as valid numbers before business rules are applied.

---

## What changed (June 2025)

Field lists were updated to match the official submission CSV templates. For all screens:

- **Removed**: Supplier, Supplier Catalog Name, QC'd in last 6 months, SDS Available, Acutely Toxic, SMILES, Previously Tested Cancer Cell Lines, Target/MOA, Full BRD
- **Column order**: Amount and Amount Unit now appear before Stock Concentration and Stock Concentration Unit
- **Kept**: Storage Conditions and Health Hazard (environmental/health hazard question)

AIR molecule type was narrowed to Antibody only. APS molecule type options were updated to match the template (added "ADC", replaced "Small Molecule" with "Other"). EPS gained a minimum dilution factor of 2, now stored as `minDilutionFactor` in `SCREEN_CONFIG`.

Column headers with validation rules now show an info icon (ⓘ) with a tooltip describing the requirement. Tooltip text is derived at runtime from `SCREEN_CONFIG` by `buildTooltips()` — the same constants used by the per-screen validators — so thresholds only need to be updated in one place.

---

## MTS — Multiplexed Treatment Screen (DMSO)

| Column | Type | Options |
|--------|------|---------|
| Test Agent Name | Text | — |
| Top Screening Dose | Number | — |
| Top Dose Unit | Dropdown | uM |
| Amount | Number | — |
| Amount Unit | Dropdown | uL |
| Storage Conditions | Dropdown | Room temperature, 4°C, -20°C |
| Stock Concentration | Number | — |
| Stock Conc. Unit | Dropdown | mM |
| Health Hazard? | Dropdown | Yes, No |

**Validation rules**
- Amount: minimum **150 uL**
- Stock Concentration: must equal Top Screening Dose numerically (e.g. 10 uM top dose → 10 mM stock). This reflects the 1000× dilution factor between assay and stock units.

---

## CPS — Combination Perturbation Screen (DMSO)

Same fields and column order as MTS. Supports an optional combinations table.

| Column | Type | Options |
|--------|------|---------|
| Test Agent Name | Text | — |
| Top Screening Dose | Number | — |
| Top Dose Unit | Dropdown | uM |
| Amount | Number | — |
| Amount Unit | Dropdown | uL |
| Storage Conditions | Dropdown | Room temperature, 4°C, -20°C |
| Stock Concentration | Number | — |
| Stock Conc. Unit | Dropdown | mM |
| Health Hazard? | Dropdown | Yes, No |

**Validation rules**
- Amount (solo): minimum **150 uL**
- Amount (with combinations): minimum **400 uL × number of combination slots** the compound appears in. For example, if a compound is in 2 combination rows, it requires at least 800 uL.
- Stock Concentration: must equal Top Screening Dose numerically (same 1000× logic as MTS).

**Combinations table**

| Column | Required | Options |
|--------|----------|---------|
| Drug A Compound Name | Yes | Must match a submitted Test Agent Name |
| Drug A Top Dose | Yes | — |
| Drug A Top Dose Unit | Yes | uM |
| Drug B Compound Name | No | Must match a submitted Test Agent Name if provided |
| Drug B Dose | Conditional | Required when Drug B is specified |
| Drug B Dose Unit | Conditional | Required when Drug B is specified; uM |

Additional combination validation:
- Drug A and Drug B cannot be the same compound.
- Duplicate (Drug A, Drug B) pairs are not allowed.
- Every Drug A that appears in a combination row must also appear in at least one solo row (Drug B left blank). This ensures the compound is run alone as a control in addition to any combinations.

---

## EPS — Extended Perturbation Screen (DMSO)

| Column | Type | Options |
|--------|------|---------|
| Test Agent Name | Text | — |
| Top Screening Dose | Number | — |
| Top Dose Unit | Dropdown | uM |
| Dilution Factor | Number | — |
| Amount | Number | — |
| Amount Unit | Dropdown | uL |
| Stock Concentration | Number | — |
| Stock Conc. Unit | Dropdown | mM |
| Storage Conditions | Dropdown | Room temperature, 4°C, -20°C |
| Health Hazard? | Dropdown | Yes, No |

**Validation rules**
- Dilution Factor: minimum **2**
- Amount: depends on the dilution factor
  - Dilution factor **2 to <3**: minimum **720 uL**
  - Dilution factor **3 or higher**: minimum **600 uL**
- Stock Concentration: must equal Top Screening Dose numerically (same 1000× logic as MTS/CPS).

---

## APS — Aqueous Perturbation Screen

| Column | Type | Options |
|--------|------|---------|
| Test Agent Name | Text | — |
| Molecule Type | Dropdown | Antibody, Aqueous Small Molecule, Antibody Drug Conjugate (ADC), Other |
| Top Screening Dose | Number | — |
| Top Dose Unit | Dropdown | uM, ug/mL |
| Solvent | Text | — |
| Amount | Number | — |
| Amount Unit | Dropdown | uL |
| Stock Concentration | Number | — |
| Stock Conc. Unit | Dropdown | mM, mg/mL |
| Storage Conditions | Dropdown | Room temperature, 4°C, -20°C |
| Health Hazard? | Dropdown | Yes, No |

**Validation rules**
- Amount: minimum **1000 uL**
- Stock Concentration: must equal Top Screening Dose ÷ 4 (250× concentration factor, e.g. 10 uM top dose → 2.5 mM stock).
- Stock Conc. Unit must pair with Top Dose Unit:
  - Top Dose Unit **uM** → Stock Conc. Unit must be **mM**
  - Top Dose Unit **ug/mL** → Stock Conc. Unit must be **mg/mL**

---

## AIR — Aqueous In Reagent

| Column | Type | Options |
|--------|------|---------|
| Test Agent Name | Text | — |
| Molecule Type | Dropdown | Antibody |
| Top Screening Dose | Number | — |
| Top Dose Unit | Dropdown | ug/mL |
| Solvent | Text | — |
| Amount | Number | — |
| Amount Unit | Dropdown | uL |
| Stock Concentration | Number | — |
| Stock Conc. Unit | Dropdown | mg/mL |
| Storage Conditions | Dropdown | Room temperature, 4°C, -20°C |
| Health Hazard? | Dropdown | Yes, No |

**Validation rules**
- Molecule Type: restricted to **Antibody** only.
- Top Screening Dose: maximum **2 ug/mL**
- Amount: minimum **500 uL**
- Stock Concentration: must equal Top Screening Dose ÷ 2 (500× concentration factor, e.g. 1 ug/mL top dose → 0.5 mg/mL stock).
