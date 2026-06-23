import { _ } from 'vue-underscore';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { postSubmission, findScreen, fetchSubmissionMessage } from './api';

export default class CompoundSubmissionConstants {
  static STATUS_NEW = 'NEW';
  static STATUS_FORM_CHECKED = 'FORM_CHECKED';
  static STATUS_CMPD_RECEIVED = 'CMPD_RECEIVED';
  static STATUS_PLATE_REQUESTED = 'PLATE_REQUESTED';
  static STATUS_DEPRECATED = 'DEPRECATED';
  static CPS_MINIMUM_VOLUME = 400;
  static MTS_MINIMUM_VOLUME = 150;
  static EPS_MINIMUM_VOLUME = 600;
  static AIR_MINIMUM_VOLUME = 500; // NEW AIR not in use yet
  static CPS = 'CPS';
  static APS = 'APS';
  static AIR = 'AIR'; // NEW AIR
  static MTS = 'MTS';
  static EPS = 'EPS';
  static SEQ = 'SEQ';
  static AQU_OTHER = 'Other';

  static MAX_FILE_SIZE = 250000;
  static HOME_INSTITUTION_KEY = 'home_institution';
  static INSTITUTION_KEY = CompoundSubmissionConstants.HOME_INSTITUTION_KEY;
  static MAIN_CONTACT = "Data Access Manager's Name";
  static MAIN_CONTACT_EMAIL = "Data Access Manager's Email";
  static MAIN_CONTACT_KEY = 'main_contact';
  static MAIN_CONTACT_EMAIL_KEY = 'main_contact_email';
  static HOME_INSTITUTION =
    "Your institution/company name + funding institution's name (if different)";

  static COLLABORATION_TYPE = 'Your institution/company type';
  static COLLABORATION_TYPE_KEY = 'collaboration_type';
  static PROJECT_GOALS = 'Brief description of project goals';
  static PROJECT_GOALS_KEY = 'project_goals';
  static TOTAL_NUM_CPDS = 'Total number of test agents you plan to submit';
  static TOTAL_NUM_CPDS_KEY = 'total_num_cpds';
  static GRANT_ADMIN = 'Name and Email of Grant Administrator';
  static GRANT_ADMIN_KEY = 'grant_admin';
  static BIO_TECH_ACCOUNTS_PAYABLE_EMAIL =
    'Email of Accounts Payable Department and Name/Email of Invoice Administrator';
  static BIO_TECH_ACCOUNTS_PAYABLE_EMAIL_KEY = 'bio_tech_accounts_payable_email';

  static SUBMITTER_NAME_KEY = 'submitter_name';
  static SUBMITTER_NAME = 'Your Name';
  static SMILES = 'SMILES';
  static SMILES_STR = 'Structure SMILES';
  static SMILES_KEY = 'structure_smiles';
  static FULL_BRD = 'Full BRD';
  static FULL_BRD_KEY = 'full_brd';

  static DILUTION_FACTOR = 'Dilution Factor';
  static DILUTION_FACTOR_KEY = 'dilution_factor';

  static STORAGE_CONDITIONS = 'Storage Conditions';
  static STORAGE_CONDITIONS_KEY = 'storage_conditions';

  static DRUG_A_COMPOUND_NAME = 'Drug A Test Agent Name';
  static DRUG_A_TOP_DOSE = 'Drug A Top Dose';
  static DRUG_A_TOP_DOSE_UNIT = 'Drug A Top Dose Unit';
  static DRUG_B_COMPOUND_NAME = 'Drug B Test Agent Name';
  static DRUG_B_DOSE = 'Drug B Dose';
  static DRUG_B_DOSE_UNIT = 'Drug B Dose Unit';
  static SCREEN = 'Screen';
  static SCREEN_KEY = 'screen';

  static DEFAULT_TOP_DOSE_UNIT = 'uM';
  static DEFAULT_AMOUNT_UNITS = 'uL';
  static DEFAULT_CONCENTRATION_UNITS = 'mM';

  static BRD_PATTERN = '^BRD-[A|K|U|M|C][0-9]{8}-[0-9]{3}-[0-9]{2}-[0-9]$|^BRD-[A|K|U|M][0-9]{8}$';
  static TOP_DOSE = 'Top Screening Dose';
  static TOP_DOSE_KEY = 'top_dose';
  static COMBINATION_TOP_DOSE = 'Drug A Top Dose';
  static COMBINATION_TOP_DOSE_UNIT = 'Drug A Top Dose Unit';
  static COMBINATION_DOSE = 'Drug B Dose';
  static COMBINATION_DOSE_UNIT = 'Drug B Dose Unit';

  static AQUEOUS_TOP_DOSE_UNITS = ['uM', 'ug/mL'];
  static AQUEOUS_STOCK_CONCENTRATION_UNITS = ['mM', 'mg/mL'];
  static AQUEOUS_AMOUNT_UNITS = ['uL'];

  static AIR_TOP_DOSE_UNIT = 'ug/mL'; // NEW AIR - Single value
  static AIR_TOP_DOSE_MAXIMUM = 2; // NEW AIR
  static AIR_STOCK_CONCENTRATION_UNIT = 'mg/mL'; // NEW AIR - Single value
  static AIR_STOCK_CONCENTRATION_MULTIPLIER = 500; // NEW AIR

  // For Units, only have “ug/mL”
  // For Top Doses, cap at 2 µg/mL
  // For Amount, minimum “500 uL”

  static TOP_DOSE_UNIT = 'Top Screening Dose unit';
  static TOP_DOSE_UNIT_KEY = 'top_dose_unit';
  static AMOUNT = 'Amount';
  static AMOUNT_UNITS = 'Amount Units';
  static AMOUNT_KEY = 'amount';
  static ALTERNATE_NAME = 'Alternate Name';
  static CONCENTRATION = 'Stock Concentration';
  static CONCENTRATION_STR = 'Concentration';
  static STOCK_CONCENTRATION_KEY = 'conc';
  static STOCK_CONCENTRATION = CompoundSubmissionConstants.CONCENTRATION;
  static STOCK_CONCENTRATION_KEY_TBL = 'stock_concentration';
  static STOCK_CONCENTRATION_UNITS = 'Stock Concentration Units';
  static STOCK_CONCENTRATION_UNITS_TBL = 'stock_concentration_unit';
  static STOCK_CONCENTRATION_UNITS_KEY = 'conc_unit';
  static CONCENTRATION_UNITS_STR = 'Concentration Units';
  static LIST_CANCER_CELL_LINES =
    'List cancer cell lines that have been previously tested with your test agent';
  static LIST_CANCER_CELL_LINES_KEY = 'cancer_cell_lines';
  static LIST_CANCER_CELL_LINES_STR = 'Cancer cell lines';
  static TARGET_MOA = 'Target/MOA';
  static TARGET_MOA_STR = 'Target Moa';
  static TARGET_MOA_KEY = 'target_moa';
  static VIAL_BARCODE = 'vial_barcode';
  static VIAL_BARCODE_KEY = CompoundSubmissionConstants.VIAL_BARCODE;
  static BROAD_ID = 'Broad ID';
  static UNITS = 'Units';
  static UNITS_KEY = 'amount_unit';
  static COMMENTS = 'Comments';
  static STATUS_STR = 'Status';
  static STATUS_KEY = 'status';
  static STEREO_COMMENTS_STR = 'Stereo Comments';
  static STEREO_COMMENTS_KEY = 'stereo_comments';
  static PROJECT = 'Project';
  static INVESTIGATOR = 'Investigator';
  static INVESTIGATOR_KEY = 'investigator_name';

  static INVESTIGATOR_EMAIL = 'Investigator Email';
  static INVESTIGATOR_EMAIL_KEY = 'investigator_email';
  static INSTITUTION = 'Institution';

  static SUBMITTER_EMAIL = 'Submitter Email';
  static SUBMITTER_EMAIL_KEY = 'submitter_email';
  static PROJECT_ID = 'project_id';
  static PROJECT_CODE = 'Project Code';
  static PROJECT_CODE_KEY = 'project_code';
  static SUPPLIER_CATALOG_NAME = 'Supplier Catalog Name';
  static SUPPLIER_CATALOG_STR = 'Cat. Name';
  static SUPPLIER_CATALOG_NAME_KEY = 'supplier_catalog_name';
  static SUPPLIER_CATALOG = 'Supplier Catalog';
  static SUPPLIER = 'Supplier';
  static SUPPLIER_KEY = 'supplier';
  static COMPOUND_NAME = 'Test Agent Name';
  static COMPOUND_NAME_KEY = 'compound_name';
  static MOLECULE_TYPE = 'Molecule Type';
  static MOLECULE_TYPE_KEY = 'molecule_type';
  static MOLECULE_TYPES = [
    'Antibody',
    'Aqueous Small Molecule',
    'Antibody Drug Conjugate',
    'Small Molecule',
  ];
  static SOLVENT = 'Solvent';
  static SOLVENT_KEY = 'solvent';
  static BRD_REGEX = new RegExp(CompoundSubmissionConstants.BRD_PATTERN);
  static CONCENTRATION_UNITS =
    CompoundSubmissionConstants.CONCENTRATION + ' ' + CompoundSubmissionConstants.UNITS;
  static OTHER_PLEASE_SPECIFY = 'Other please specify';
  static STORAGE_CONDITIONS_OPTIONS_VALUES = ['Room temperature', '4˚C', '-20˚C', '4°C', '-20°C'];
  static DEGREE_SYMBOL_UNICODE = '\u00B0C';
  static DEGREE_SYMBOL = '˚C';

  static STORAGE_CONDITIONS_OPTIONS = ['-20*c', '4*c'].concat(
    CompoundSubmissionConstants.STORAGE_CONDITIONS_OPTIONS_VALUES.map((word) => word.toLowerCase()),
  );

  static COMMENTS = 'Comments';

  static QCED_LAST_SIX_MONTHS = "Has this test agent been QC'd in the last 6 months?";
  static QCED_LAST_SIX_MONTHS_KEY = 'qc_last_six_months';
  static QCED_LAST_SIX_MONTHS_STR = 'QC last 6 months?';
  static SDS_AVAILABLE = 'Is an SDS available for this test agent?';
  static SDS_AVAILABLE_KEY = 'sds_available';
  static SDS_AVAILABLE_STR = 'SDS Available';

  static HEALTH_HAZARD = 'Is this test agent known to be an environmental or health hazard?';
  static HEALTH_HAZARD_KEY = 'health_hazard';
  static HEALTH_HAZARD_STR = 'Health Hazard';

  static ACUTELY_TOXIC = 'Is this test agent acutely toxic?';
  static ACUTELY_TOXIC_STR = 'Acutely toxic';
  static ACUTELY_TOXIC_KEY = 'acutely_toxic';

  static uniquify(list2Uniquify) {
    return _.uniq(list2Uniquify, function (x) {
      return x.id;
    });
  }

  /**
   *
   * @type {[string,string,string,string]}
   */
  static submissionTypes = [
    CompoundSubmissionConstants.MTS,
    CompoundSubmissionConstants.CPS,
    CompoundSubmissionConstants.APS,
    CompoundSubmissionConstants.AIR, // NEW AIR
    CompoundSubmissionConstants.EPS,
    CompoundSubmissionConstants.SEQ,
    'Other',
  ];

  static SUBMISSION_TYPE_ALT_NAME = {
    [CompoundSubmissionConstants.MTS]: ['single-agent'],
    [CompoundSubmissionConstants.CPS]: ['single-agent', 'combination'],
    [CompoundSubmissionConstants.APS]: ['aqueous'],
    [CompoundSubmissionConstants.AIR]: ['aqueous'], // NEW AIR. WHAT IS THIS FOR????
    [CompoundSubmissionConstants.EPS]: ['single-agent'],
  };

  static AQUEOUS_NUMBER_HEADERS = [
    CompoundSubmissionConstants.AMOUNT,
    CompoundSubmissionConstants.STOCK_CONCENTRATION,
    CompoundSubmissionConstants.TOP_DOSE,
  ];
  static AQUEOUS_UNITS = [
    CompoundSubmissionConstants.UNITS,
    CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS,
    CompoundSubmissionConstants.TOP_DOSE_UNIT,
  ];
  static NUMBER_HEADERS = [
    CompoundSubmissionConstants.AMOUNT,
    CompoundSubmissionConstants.CONCENTRATION,
    CompoundSubmissionConstants.TOP_DOSE,
    CompoundSubmissionConstants.TOP_DOSE_UNIT,
  ];
  static COMBINATION_NUMBER_HEADERS = [
    CompoundSubmissionConstants.COMBINATION_DOSE,
    CompoundSubmissionConstants.TOP_DOSE,
  ];

  static CM_CONC_UNITS = ['M', 'mM', 'uM', 'nM'];
  static CM_SOLVENTS = ['dimethyl sulfoxide', 'dimethyl sulfoxide-d6', 'water'];
  static CM_ARRAY_FORMAT = [96, 384, 1536];
  static YesNoHeaders = [
    CompoundSubmissionConstants.QCED_LAST_SIX_MONTHS,
    CompoundSubmissionConstants.SDS_AVAILABLE,
    CompoundSubmissionConstants.HEALTH_HAZARD,
    CompoundSubmissionConstants.ACUTELY_TOXIC,
  ];
  static requiredHeadersWithoutBRD = [
    CompoundSubmissionConstants.AMOUNT,
    CompoundSubmissionConstants.UNITS,
    CompoundSubmissionConstants.CONCENTRATION,
    CompoundSubmissionConstants.CONCENTRATION_UNITS,
  ];
  static requiredHeadersWithBRD = [CompoundSubmissionConstants.FULL_BRD];

  /**
   *
   * @param url
   * @return {Promise<string>}
   */
  static async convertExternalExcel2TDT(url) {
    const bstr = await (await fetch(url)).arrayBuffer();
    /* data is an ArrayBuffer */
    const wb = XLSX.read(bstr, { type: 'binary' });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    return XLSX.utils.sheet_to_csv(ws, { header: 1, FS: '\t', blankrows: false });
  }

  static async convertExcel2TDT(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const result = XLSX.utils.sheet_to_csv(ws, { header: 1, FS: '\t', blankrows: false });
        resolve(result);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  static apsDoseValidation(mapping, dat) {
    let stock_conc = -1;
    let top_dose = -1;
    let stock_conc_unit = '';
    let top_dose_unit = '';
    const errorMessages = [];
    for (let j of CompoundSubmissionConstants.getRequiredAqueousHeaders()) {
      const k = mapping[j];
      // eslint-disable-next-line no-prototype-builtins
      if (dat.hasOwnProperty(k)) {
        const val = dat[k];
        if (CompoundSubmissionConstants.YesNoHeaders.includes(j)) {
          //This is validated elsewhere
          //CompoundSubmissionConstants.validateYesNoHeaders(val,j,errorMessages);
        } else if (val) {
          if (j === CompoundSubmissionConstants.MOLECULE_TYPE) {
            // if (!CompoundSubmissionConstants.MOLECULE_TYPES.includes(val.trim())) {
            //     errorMessages.push("Molecule type must be one of '" +
            //         CompoundSubmissionConstants.MOLECULE_TYPES.join(",") + "'");
            // }
          }
          if (j === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
            if (!CompoundSubmissionConstants.AQUEOUS_TOP_DOSE_UNITS.includes(val.trim())) {
              errorMessages.push(
                j +
                  " must be one of '" +
                  CompoundSubmissionConstants.AQUEOUS_TOP_DOSE_UNITS.join(',') +
                  "'",
              );
            } else {
              top_dose_unit = val.trim();
            }
          }
          if (j === CompoundSubmissionConstants.TOP_DOSE) {
            top_dose = val.trim();
          }
          if (j === CompoundSubmissionConstants.STOCK_CONCENTRATION) {
            stock_conc = val.trim();
          }
          if (j === CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS) {
            if (
              !CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS.includes(val.trim())
            ) {
              errorMessages.push(
                j +
                  " must be one of '" +
                  CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS.join(',') +
                  "'",
              );
            } else {
              stock_conc_unit = val.trim();
            }
          }
          if (j === CompoundSubmissionConstants.UNITS) {
            if (!CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.includes(val.trim())) {
              errorMessages.push(
                j +
                  " must be one of '" +
                  CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.join(',') +
                  "'",
              );
            }
          }
        } else {
          errorMessages.push('Field: ' + j + ' cannot have blank values');
        }
      }
    }
    let isError = false;
    if (top_dose > -1 && stock_conc > -1 && top_dose_unit && stock_conc_unit) {
      // static AQUEOUS_TOP_DOSE_UNITS = ["uM", "ug/mL"];
      // static AQUEOUS_STOCK_CONCENTRATION_UNITS = ["mM", "mg/mL"];
      if (top_dose_unit === CompoundSubmissionConstants.AQUEOUS_TOP_DOSE_UNITS[0]) {
        if (stock_conc_unit !== CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS[0]) {
          errorMessages.push(
            "Stock Concentration unit must be '" +
              CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS[0] +
              "'",
          );
          isError = true;
        }
      }
      if (top_dose_unit === CompoundSubmissionConstants.AQUEOUS_TOP_DOSE_UNITS[1]) {
        if (stock_conc_unit !== CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS[1]) {
          isError = true;
          errorMessages.push(
            "Stock Concentration unit must be '" +
              CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS[1] +
              "'",
          );
        }
      }
      if (!isError) {
        const expected_top_dose = top_dose * 0.001 * 250;
        const tolerance = 0.001;
        if (Math.abs(expected_top_dose - Number(stock_conc)) > tolerance) {
          if (expected_top_dose !== Number(stock_conc)) {
            errorMessages.push(
              "250X the top dose you supplied '" +
                top_dose +
                ' ' +
                top_dose_unit +
                "' must equal the stock concentration you supplied '" +
                stock_conc +
                ' ' +
                stock_conc_unit +
                "'",
            );
          }
        }
      }
    }
    return errorMessages;
  }
  /**
   * Validates AIR (Aqueous In Reagent) submission dose and concentration requirements
   *
   * AIR submission requirements:
   * - Maximum top screening dose: 2 µg/mL
   * - Required volume: at least 500µL of 500X the top screening dose
   * - Example: if top dose is 2 µg/mL, submit 1 mg/mL stock (2 * 500 = 1000 µg/mL = 1 mg/mL)
   *
   * @param {Object} mapping - Field name mappings from headers to property names
   * @param {Object} dat - Data object containing compound submission values
   * @returns {Array} errorMessages - Array of validation error messages
   */
  static airDoseValidation(mapping, dat) {
    // Initialize variables to store extracted values from submission data
    let stock_conc = -1; // Stock concentration value
    let top_dose = -1; // Top screening dose value
    let stock_conc_unit = ''; // Stock concentration unit (should be mg/mL)
    let top_dose_unit = ''; // Top dose unit (should be ug/mL)
    const errorMessages = []; // Collect all validation errors

    // PHASE 1: Field-level validation
    // Iterate through all required aqueous headers and validate each field
    for (let j of CompoundSubmissionConstants.getRequiredAqueousHeaders()) {
      const k = mapping[j]; // Get the mapped property name

      // Check if the field exists in the submitted data
      // eslint-disable-next-line no-prototype-builtins
      if (dat.hasOwnProperty(k)) {
        const val = dat[k];

        // Skip Yes/No fields as they are validated elsewhere
        if (CompoundSubmissionConstants.YesNoHeaders.includes(j)) {
          //This is validated elsewhere
          //CompoundSubmissionConstants.validateYesNoHeaders(val,j,errorMessages);
        } else if (val) {
          // Validate molecule type (currently commented out)
          if (j === CompoundSubmissionConstants.MOLECULE_TYPE) {
            // if (!CompoundSubmissionConstants.MOLECULE_TYPES.includes(val.trim())) {
            //     errorMessages.push("Molecule type must be one of '" +
            //         CompoundSubmissionConstants.MOLECULE_TYPES.join(",") + "'");
            // }
          }

          // Validate top dose unit - must be AIR_TOP_DOSE_UNIT (currently only "ug/mL")
          if (j === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
            if (val.trim() !== CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT) {
              errorMessages.push(
                j + " must be '" + CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT + "'",
              );
            } else {
              top_dose_unit = val.trim();
            }
          }

          // Extract and store top dose value for later cross-field validation
          if (j === CompoundSubmissionConstants.TOP_DOSE) {
            top_dose = val.trim();
          }

          // Extract and store stock concentration value for later cross-field validation
          if (j === CompoundSubmissionConstants.STOCK_CONCENTRATION) {
            stock_conc = val.trim();
          }

          // Validate stock concentration unit - must be AIR_STOCK_CONCENTRATION_UNIT (currently only "mg/mL")
          if (j === CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS) {
            if (val.trim() !== CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_UNIT) {
              errorMessages.push(
                j + " must be '" + CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_UNIT + "'",
              );
            } else {
              stock_conc_unit = val.trim();
            }
          }

          // Validate amount units - must be from AQUEOUS_AMOUNT_UNITS (currently only "uL")
          if (j === CompoundSubmissionConstants.UNITS) {
            if (!CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.includes(val.trim())) {
              errorMessages.push(
                j +
                  " must be one of '" +
                  CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.join(',') +
                  "'",
              );
            }
          }
        } else {
          // Field is required but empty
          errorMessages.push('Field: ' + j + ' cannot have blank values');
        }
      }
    }

    // PHASE 2: Cross-field validation
    // Only proceed if we have valid numeric values and units for both dose and concentration
    let isError = false;
    if (top_dose > -1 && stock_conc > -1 && top_dose_unit && stock_conc_unit) {
      // Validate unit consistency: top dose must be "ug/mL" and stock concentration must be "mg/mL"
      // AIR submissions require specific units for proper 500X dilution calculation
      if (top_dose_unit === CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT) {
        if (stock_conc_unit !== CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_UNIT) {
          errorMessages.push(
            "Stock Concentration unit must be '" +
              CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_UNIT +
              "' when top dose unit is '" +
              CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT +
              "'",
          );
          isError = true;
        }
      } else {
        // If top dose unit is not the expected AIR unit, that's an error
        errorMessages.push(
          "Top dose unit must be '" +
            CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT +
            "' for AIR submissions",
        );
        isError = true;
      }

      // PHASE 3: Business rule validation (only if units are consistent)
      if (!isError) {
        // Rule 1: Maximum top dose validation
        // AIR submissions have a maximum top screening dose limit (currently 2 µg/mL)
        const max_top_dose = CompoundSubmissionConstants.AIR_TOP_DOSE_MAXIMUM;
        if (top_dose > max_top_dose) {
          errorMessages.push(
            'Top dose must be less than or equal to ' + max_top_dose + ' ' + top_dose_unit,
          );
        }

        // Rule 2: 500X dilution requirement validation
        // Stock concentration must be exactly 500X the top dose
        // Formula: expected_stock = top_dose * 0.001 * 500
        // The 0.001 converts µg/mL to mg/mL when needed for the calculation
        const expected_top_dose =
          top_dose * 0.001 * CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_MULTIPLIER;
        const tolerance = 0.001; // Allow small floating point differences

        if (Math.abs(expected_top_dose - Number(stock_conc)) > tolerance) {
          if (expected_top_dose !== Number(stock_conc)) {
            errorMessages.push(
              "500X the top dose you supplied '" +
                top_dose +
                ' ' +
                top_dose_unit +
                "' must equal the stock concentration you supplied '" +
                stock_conc +
                ' ' +
                stock_conc_unit +
                "'",
            );
          }
        }
      }
    }
    return errorMessages;
  }

  static combinationDoseValidation(mapping, dat) {
    const errorMessages = [];
    for (let j of CompoundSubmissionConstants.getRequiredCombinationHeaders()) {
      const k = mapping[j];
      // eslint-disable-next-line no-prototype-builtins
      if (dat.hasOwnProperty(k)) {
        const val = dat[k];

        if (!val) {
          errorMessages.push('Field: ' + j + ' cannot have blank values');
        }
        if (
          (j === CompoundSubmissionConstants.COMBINATION_TOP_DOSE_UNIT &&
            CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== val) ||
          (j === CompoundSubmissionConstants.COMBINATION_DOSE_UNIT &&
            CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== val)
        ) {
          errorMessages.push(
            'Field: ' +
              j +
              " accepts only '" +
              CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT +
              "'",
          );
        }
      }
    }
    return errorMessages;
  }

  static compoundDoseValidation(mapping, dat) {
    const errorMessages = [];
    let stock_conc = null;
    let top_dose = null;
    let stock_conc_unit = null;
    let top_dose_unit = null;

    const heads = CompoundSubmissionConstants.requiredHeadersWithoutBRD;
    heads.push(CompoundSubmissionConstants.TOP_DOSE);
    heads.push(CompoundSubmissionConstants.TOP_DOSE_UNIT);
    for (let j of heads) {
      const k = mapping[j];
      // eslint-disable-next-line no-prototype-builtins
      if (dat.hasOwnProperty(k)) {
        const val = dat[k];
        if (val) {
          if (j === CompoundSubmissionConstants.TOP_DOSE) {
            top_dose = val;
          }
          if (j === CompoundSubmissionConstants.STOCK_CONCENTRATION) {
            stock_conc = val;
          }

          if (j === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
            if (CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== val) {
              errorMessages.push(
                'Field: ' +
                  j +
                  " accepts only '" +
                  CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT +
                  "'",
              );
            } else {
              top_dose_unit = val.trim();
            }
          }
          if (j === CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS) {
            if (CompoundSubmissionConstants.DEFAULT_CONCENTRATION_UNITS !== val) {
              errorMessages.push(
                'Field: ' +
                  j +
                  " accepts only '" +
                  CompoundSubmissionConstants.DEFAULT_CONCENTRATION_UNITS +
                  "'",
              );
            } else {
              stock_conc_unit = val.trim();
            }
          }
        } else {
          errorMessages.push('Field: ' + j + ' cannot have blank values');
        }

        if (
          j === CompoundSubmissionConstants.UNITS &&
          CompoundSubmissionConstants.DEFAULT_AMOUNT_UNITS !== val
        ) {
          errorMessages.push(
            'Field: ' +
              j +
              " accepts only '" +
              CompoundSubmissionConstants.DEFAULT_AMOUNT_UNITS +
              "'",
          );
        }
      }
    }
    if (errorMessages.length === 0) {
      if (top_dose !== stock_conc) {
        errorMessages.push(
          "1000X the top dose you supplied '" +
            top_dose +
            ' ' +
            top_dose_unit +
            "' must equal the stock concentration you supplied '" +
            stock_conc +
            ' ' +
            stock_conc_unit +
            "'",
        );
      }
    }
    return errorMessages;
  }

  /**
   *
   * @param file
   * @param isCompoundFile
   * @param hasCombinations
   * @param submissionType
   * @return {Promise<{}|*|{error: *[]}>}
   */
  static async handleFileUploads(file, isCompoundFile, hasCombinations, submissionType) {
    let expectedFileHeaders = CompoundSubmissionConstants.getExpectedCompoundFileHeaders();
    let mapping = CompoundSubmissionConstants.getCompoundMapping();

    if (
      submissionType === CompoundSubmissionConstants.APS ||
      submissionType === CompoundSubmissionConstants.AIR
    ) {
      mapping = CompoundSubmissionConstants.getAqueousMapping();
      expectedFileHeaders = CompoundSubmissionConstants.getExpectedAqueousFileHeaders();
    } else if (submissionType === CompoundSubmissionConstants.EPS) {
      mapping = CompoundSubmissionConstants.getEPSCompoundMapping();
      expectedFileHeaders = CompoundSubmissionConstants.getExpectedEPSFileHeaders();
    } else if (isCompoundFile) {
      console.log('');
    } else if (hasCombinations) {
      expectedFileHeaders = CompoundSubmissionConstants.getExpectedCombinationFileHeaders();
    }

    let errorMessages = [];
    const size = file.size;
    let compounds = null;
    try {
      if (file.name.toLowerCase().endsWith('.xlsx')) {
        let payload = null;

        if (size <= CompoundSubmissionConstants.MAX_FILE_SIZE) {
          const dataFile = await CompoundSubmissionConstants.convertExcel2TDT(file);
          payload = await CompoundSubmissionConstants.parseSubmissionFile(
            dataFile,
            expectedFileHeaders,
            isCompoundFile,
            hasCombinations,
            submissionType,
          );
          errorMessages = payload.errorMessages;
          compounds = payload.compounds;
        } else {
          errorMessages.push('File size ' + size + ' is greater than the allowed size of 250 KB');
        }
      } else {
        errorMessages.push('Only .xlsx files are supported');
      }
      if (errorMessages.length > 0) {
        return { error: errorMessages };
      } else {
        if (compounds && compounds.data) {
          //validate each line?
          //if a line does not have full brd
          //validate those other fields
          for (const dat of compounds.data) {
            if (!isCompoundFile && hasCombinations) {
              errorMessages = [].concat(
                errorMessages,
                CompoundSubmissionConstants.combinationDoseValidation(mapping, dat),
              );
            } else {
              if (!dat.full_brd) {
                //if the user does not have a BRD
                if (submissionType === CompoundSubmissionConstants.APS) {
                  errorMessages = [].concat(
                    errorMessages,
                    CompoundSubmissionConstants.apsDoseValidation(mapping, dat),
                  );
                } else if (submissionType === CompoundSubmissionConstants.AIR) {
                  errorMessages = [].concat(
                    errorMessages,
                    CompoundSubmissionConstants.airDoseValidation(mapping, dat),
                  );
                } else {
                  errorMessages = [].concat(
                    errorMessages,
                    CompoundSubmissionConstants.compoundDoseValidation(mapping, dat),
                  );
                }
              }
            }
          }
          if (errorMessages.length > 0) {
            return { error: errorMessages };
          } else {
            return compounds.data;
          }
        }
      }
      return {};
    } catch (err) {
      errorMessages.push(err);
      self.fileUploadError = true;
      return { error: errorMessages };
    }
  }

  /**
   *
   * @param dataFile
   * @param expectedFileHeaders
   * @param isCompoundFile
   * @param hasCombinations
   * @param submissionType
   * @return {Promise<{errorMessages: *[], compounds: *}>}
   */
  static async parseSubmissionFile(
    dataFile,
    expectedFileHeaders,
    isCompoundFile,
    hasCombinations,
    submissionType,
  ) {
    let errorMessages = [];
    let data;
    if (submissionType === CompoundSubmissionConstants.APS) {
      data = await CompoundSubmissionConstants.parseAqueousTDT(dataFile);
    } else if (submissionType === CompoundSubmissionConstants.AIR) {
      data = await CompoundSubmissionConstants.parseAIRTDT(dataFile);
    } else if (isCompoundFile) {
      if (submissionType === CompoundSubmissionConstants.EPS) {
        data = await CompoundSubmissionConstants.parseEPSCompoundTDT(dataFile);
      } else {
        data = await CompoundSubmissionConstants.parseCompoundTDT(dataFile);
      }
    } else if (hasCombinations) {
      data = await CompoundSubmissionConstants.parseCombinationTDT(dataFile);
    }
    let compoundData = data.results;
    errorMessages = errorMessages.concat(data.errorMessages);
    if (_.isEmpty(compoundData) || _.isEmpty(compoundData.data[0])) {
      errorMessages.push('File has no contents!!');
    } else {
      console.log('headers', data.headers);
      if (data.headers.includes('')) {
        errorMessages.push(
          'There is an empty column in your excel file. It is most likely the last column in the file. Please remove it and try the upload again',
        );
      }
      const fileHeaders = data.headers.sort();
      const isSubset =
        expectedFileHeaders.length ===
        _.intersection(fileHeaders.sort(), expectedFileHeaders.sort()).length;
      if (!isSubset) {
        errorMessages.push('Uploaded file missing the following headers:');
        const diffs = _.difference(expectedFileHeaders, fileHeaders);
        for (const diff of diffs) {
          errorMessages.push(diff);
        }
      }
    }
    return { compounds: compoundData, errorMessages: errorMessages };
  }

  /**
   *
   * @returns {(string)[]}
   */
  static getRequiredAqueousHeaders() {
    return _.uniq(
      [
        CompoundSubmissionConstants.COMPOUND_NAME,
        CompoundSubmissionConstants.MOLECULE_TYPE,
        CompoundSubmissionConstants.SOLVENT,
        CompoundSubmissionConstants.SUPPLIER_CATALOG_NAME,
        CompoundSubmissionConstants.SUPPLIER,
        CompoundSubmissionConstants.TOP_DOSE,
        CompoundSubmissionConstants.TOP_DOSE_UNIT,
        CompoundSubmissionConstants.AMOUNT,
        CompoundSubmissionConstants.UNITS,
        CompoundSubmissionConstants.STOCK_CONCENTRATION,
        CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS,
        CompoundSubmissionConstants.STORAGE_CONDITIONS,
      ].concat(CompoundSubmissionConstants.YesNoHeaders),
    );
  }

  /**
   *
   * @param value
   * @param mappedHeader
   * @param errorMessages
   * @returns {boolean}
   */
  static validateYesNoHeaders(value, mappedHeader, errorMessages) {
    if (value.trim().toUpperCase() === 'YES') {
      return true;
    } else if (value.trim().toUpperCase() === 'NO') {
      return false;
    } else {
      errorMessages.push(
        "The field '" +
          mappedHeader +
          "' requires a 'Yes' or 'No' answer, but system found '" +
          value.trim() +
          "'",
      );
    }
  }

  /**
   *
   * @returns {[]|*}
   */
  static getRequiredCommonHeaders() {
    return _.uniq(
      [
        CompoundSubmissionConstants.COMPOUND_NAME,
        CompoundSubmissionConstants.SUPPLIER_CATALOG_NAME,
        CompoundSubmissionConstants.SUPPLIER,
        CompoundSubmissionConstants.TOP_DOSE,
        CompoundSubmissionConstants.TOP_DOSE_UNIT,
        CompoundSubmissionConstants.STORAGE_CONDITIONS,
      ].concat(CompoundSubmissionConstants.YesNoHeaders),
    );
  }

  /**
   *
   * @returns {[]|*}
   */
  static getRequiredCombinationHeaders() {
    return _.uniq([
      CompoundSubmissionConstants.DRUG_A_COMPOUND_NAME,
      CompoundSubmissionConstants.DRUG_A_TOP_DOSE,
      CompoundSubmissionConstants.DRUG_A_TOP_DOSE_UNIT,
    ]);
  }

  /**
   *
   * @returns {[]|*}
   */
  static getExpectedCombinationFileHeaders() {
    return _.uniq(Object.keys(CompoundSubmissionConstants.getCombinationMapping()));
  }

  /**
   *
   * @returns {[]|*}
   */
  static getExpectedEPSFileHeaders() {
    return _.uniq(
      []
        .concat(CompoundSubmissionConstants.getExpectedCompoundFileHeaders())
        .concat([CompoundSubmissionConstants.DILUTION_FACTOR]),
    ).sort();
  }

  /**
   *
   * @returns {[]|*}
   */
  static getExpectedCompoundFileHeaders() {
    return _.uniq(
      []
        .concat(CompoundSubmissionConstants.requiredHeadersWithBRD)
        .concat(CompoundSubmissionConstants.requiredHeadersWithoutBRD)
        .concat(CompoundSubmissionConstants.getRequiredCommonHeaders()),
    ).sort();
  }

  /**
   *
   * @returns {[]|*}
   */
  static getExpectedAqueousFileHeaders() {
    return _.uniq([].concat(CompoundSubmissionConstants.getRequiredAqueousHeaders())).sort();
  }

  /**
   *
   * @param file - Required
   * @param mapping - (optional) Mapping of file headers to object properties
   * @returns {Promise<unknown>}
   */
  static async parseTDT(file, mapping) {
    // detect delimiter using first line
    const firstLine = file.split('\n')[0];
    const delimiter = firstLine.indexOf('\t') !== -1 ? '\t' : ',';
    const errorMessages = [];
    return new Promise(function (resolve, reject) {
      Papa.parse(file, {
        delimiter: delimiter,
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          let mappedHeader = header.trim();
          if (mapping) {
            mappedHeader = mapping[header.trim()];
            if (!mappedHeader) {
              mappedHeader = header.trim();
            }
          }
          return mappedHeader;
        },
        transform: function transform(value, header) {
          if (value) {
            return value.trim().toUpperCase();
          }
          return value.trim();
        },
        complete: function complete(results) {
          const dataToReturn = {
            results: results,
            headers: [],
            errorMessages: errorMessages,
            hasErrors: errorMessages.length > 0,
          };
          return resolve(dataToReturn);
        },
        error: function error(_error) {
          return reject(_error);
        },
      });
    });
  }

  /**
   *
   * @param file
   * @param ext
   * @returns {Promise<unknown>}
   */
  static async parseAqueousTDT(file, ext = '\t') {
    const fileHeaders = new Set();
    const mapping = CompoundSubmissionConstants.getAqueousMapping();
    const reverseMapping = CompoundSubmissionConstants.reverseAqueousMapping();
    const errorMessages = [];
    return new Promise(function (resolve, reject) {
      Papa.parse(file, {
        delimiter: ext,
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          const head = header.trim();
          fileHeaders.add(head);
          let mappedHeader = mapping[header.trim()];
          if (!mappedHeader) {
            mappedHeader = header.trim();
          }
          return mappedHeader;
        },
        transform: function transform(value, header) {
          const mappedHeader = reverseMapping[header.trim()];
          if (CompoundSubmissionConstants.getRequiredAqueousHeaders().includes(mappedHeader)) {
            if (value && value.trim()) {
              if (CompoundSubmissionConstants.YesNoHeaders.includes(mappedHeader)) {
                return CompoundSubmissionConstants.validateYesNoHeaders(
                  value,
                  mappedHeader,
                  errorMessages,
                );
              }
              if (CompoundSubmissionConstants.AQUEOUS_NUMBER_HEADERS.includes(mappedHeader)) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                } else {
                  return numb;
                }
              }

              if (mappedHeader === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
                const top_dose_unit = value.trim();
                if (!CompoundSubmissionConstants.AQUEOUS_TOP_DOSE_UNITS.includes(top_dose_unit)) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of one of the following '" +
                      CompoundSubmissionConstants.AQUEOUS_TOP_DOSE_UNITS.join(',') +
                      "'",
                  );
                }
              }
              if (mappedHeader === CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS) {
                const top_dose_unit = value.trim();
                if (
                  !CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS.includes(
                    top_dose_unit,
                  )
                ) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of one of the following '" +
                      CompoundSubmissionConstants.AQUEOUS_STOCK_CONCENTRATION_UNITS.join(',') +
                      "'",
                  );
                }
              }
              if (mappedHeader === CompoundSubmissionConstants.UNITS) {
                const amount_unit = value.trim();
                if (!CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.includes(amount_unit)) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of one of the following '" +
                      CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.join(',') +
                      "'",
                  );
                }
              }
              return value.trim();
            } else {
              errorMessages.push("Blank values are not allowed for column '" + mappedHeader + "'");
              return value;
            }
          } else {
            return value.trim();
          }
        },
        complete: function complete(results) {
          const headersInFile = Array.from(fileHeaders);
          const dataToReturn = {
            results: results,
            headers: headersInFile,
            errorMessages: errorMessages,
            hasErrors: errorMessages.length > 0,
          };
          return resolve(dataToReturn);
        },
        error: function error(_error) {
          console.log('error', error);
          return reject(_error);
        },
      });
    });
  }

  /**
   * Parse AIR (Aqueous In Reagent) submission files with AIR-specific validation
   * @param file
   * @param ext
   * @returns {Promise<unknown>}
   */
  static async parseAIRTDT(file, ext = '\t') {
    const fileHeaders = new Set();
    const mapping = CompoundSubmissionConstants.getAqueousMapping();
    const reverseMapping = CompoundSubmissionConstants.reverseAqueousMapping();
    const errorMessages = [];
    return new Promise(function (resolve, reject) {
      Papa.parse(file, {
        delimiter: ext,
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          const head = header.trim();
          fileHeaders.add(head);
          let mappedHeader = mapping[header.trim()];
          if (!mappedHeader) {
            mappedHeader = header.trim();
          }
          return mappedHeader;
        },
        transform: function transform(value, header) {
          const mappedHeader = reverseMapping[header.trim()];
          if (CompoundSubmissionConstants.getRequiredAqueousHeaders().includes(mappedHeader)) {
            if (value && value.trim()) {
              if (CompoundSubmissionConstants.YesNoHeaders.includes(mappedHeader)) {
                return CompoundSubmissionConstants.validateYesNoHeaders(
                  value,
                  mappedHeader,
                  errorMessages,
                );
              }
              if (CompoundSubmissionConstants.AQUEOUS_NUMBER_HEADERS.includes(mappedHeader)) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                } else {
                  return numb;
                }
              }

              // AIR-specific validation for top dose unit
              if (mappedHeader === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
                const top_dose_unit = value.trim();
                if (top_dose_unit !== CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT) {
                  errorMessages.push(
                    mappedHeader +
                      " must be '" +
                      CompoundSubmissionConstants.AIR_TOP_DOSE_UNIT +
                      "' for AIR submissions",
                  );
                }
              }
              // AIR-specific validation for stock concentration unit
              if (mappedHeader === CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS) {
                const stock_conc_unit = value.trim();
                if (stock_conc_unit !== CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_UNIT) {
                  errorMessages.push(
                    mappedHeader +
                      " must be '" +
                      CompoundSubmissionConstants.AIR_STOCK_CONCENTRATION_UNIT +
                      "' for AIR submissions",
                  );
                }
              }
              // Validate amount units (same as aqueous)
              if (mappedHeader === CompoundSubmissionConstants.UNITS) {
                const amount_unit = value.trim();
                if (!CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.includes(amount_unit)) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of one of the following '" +
                      CompoundSubmissionConstants.AQUEOUS_AMOUNT_UNITS.join(',') +
                      "'",
                  );
                }
              }
              return value.trim();
            } else {
              errorMessages.push("Blank values are not allowed for column '" + mappedHeader + "'");
              return value;
            }
          } else {
            return value.trim();
          }
        },
        complete: function complete(results) {
          const headersInFile = Array.from(fileHeaders);
          const dataToReturn = {
            results: results,
            headers: headersInFile,
            errorMessages: errorMessages,
            hasErrors: errorMessages.length > 0,
          };
          return resolve(dataToReturn);
        },
        error: function error(_error) {
          console.log('error', error);
          return reject(_error);
        },
      });
    });
  }

  /**
   *
   * @param file
   * @param ext
   * @returns {Promise<unknown>}
   */
  static async parseEPSCompoundTDT(file, ext = '\t') {
    const fileHeaders = new Set();
    const mapping = CompoundSubmissionConstants.getEPSCompoundMapping();
    const reverseMapping = CompoundSubmissionConstants.reverseEPSCompoundMapping();
    const requiredCommonHeaders = []
      .concat(CompoundSubmissionConstants.getRequiredCommonHeaders())
      .concat([CompoundSubmissionConstants.DILUTION_FACTOR]);
    const errorMessages = [];
    return new Promise(function (resolve, reject) {
      Papa.parse(file, {
        delimiter: ext,
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          const head = header.trim();
          fileHeaders.add(head);
          let mappedHeader = mapping[header.trim()];
          if (!mappedHeader) {
            mappedHeader = header.trim();
          }
          return mappedHeader;
        },
        transform: function transform(value, header) {
          const mappedHeader = reverseMapping[header.trim()];
          if (requiredCommonHeaders.includes(mappedHeader)) {
            if (value && value.trim()) {
              if (CompoundSubmissionConstants.YesNoHeaders.includes(mappedHeader)) {
                return CompoundSubmissionConstants.validateYesNoHeaders(
                  value,
                  mappedHeader,
                  errorMessages,
                );
              }
              if (mappedHeader === CompoundSubmissionConstants.TOP_DOSE) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                } else {
                  return numb;
                }
              }
              if (mappedHeader === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
                const top_dose_unit = value.trim();
                if (CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== top_dose_unit) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of '" +
                      CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT +
                      "'",
                  );
                }
              }
              return value.trim();
            } else {
              errorMessages.push("Blank values are not allowed for column '" + mappedHeader + "'");
              return value;
            }
          } else {
            if (CompoundSubmissionConstants.NUMBER_HEADERS.includes(mappedHeader)) {
              if (value && value.trim()) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                }
              }
              return value;
            } else {
              const val = value.trim();
              if (mappedHeader === 'Full BRD' && val) {
                //must start with a BRD-
                if (!CompoundSubmissionConstants.BRD_REGEX.test(val.toUpperCase())) {
                  errorMessages.push(
                    "FULL BRD column must either be blank or must be a valid 'BRD'",
                  );
                }
              }
              return val;
            }
          }
        },
        complete: function complete(results) {
          const headersInFile = Array.from(fileHeaders);
          const dataToReturn = {
            results: results,
            headers: headersInFile,
            errorMessages: errorMessages,
            hasErrors: errorMessages.length > 0,
          };
          return resolve(dataToReturn);
        },
        error: function error(_error) {
          console.log('error', error);
          return reject(_error);
        },
      });
    });
  }

  /**
   *
   * @param file
   * @param ext
   * @returns {Promise<unknown>}
   */
  static async parseCombinationTDT(file, ext = '\t') {
    const fileHeaders = new Set();
    const mapping = CompoundSubmissionConstants.getCombinationMapping();
    const reverseMapping = CompoundSubmissionConstants.reverseCombinationMapping();
    const errorMessages = [];
    return new Promise(function (resolve, reject) {
      Papa.parse(file, {
        delimiter: ext,
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          const head = header.trim();
          fileHeaders.add(head);
          let mappedHeader = mapping[header.trim()];
          if (!mappedHeader) {
            mappedHeader = header.trim();
          }
          return mappedHeader;
        },
        transform: function transform(value, header) {
          if (!header || (header && !header.trim())) {
            return;
          }
          const mappedHeader = reverseMapping[header.trim()];
          if (CompoundSubmissionConstants.getRequiredCombinationHeaders().includes(mappedHeader)) {
            if (value && value.trim()) {
              if (mappedHeader === CompoundSubmissionConstants.COMBINATION_TOP_DOSE) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                } else {
                  return numb;
                }
              }
              if (mappedHeader === CompoundSubmissionConstants.COMBINATION_TOP_DOSE_UNIT) {
                const top_dose_unit = value.trim();
                if (CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== top_dose_unit) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of '" +
                      CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT +
                      "'",
                  );
                }
              }
              return value.trim();
            } else {
              errorMessages.push("Blank values are not allowed for column '" + mappedHeader + "'");
            }
            return value;
          } else {
            if (CompoundSubmissionConstants.COMBINATION_NUMBER_HEADERS.includes(mappedHeader)) {
              if (value && value.trim()) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                }
              }
              return value;
            } else if (CompoundSubmissionConstants.COMBINATION_DOSE_UNIT === mappedHeader) {
              const val = value?.trim();
              if (val && CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== val) {
                errorMessages.push(
                  mappedHeader +
                    ' column must contain ' +
                    CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT,
                );
              }
              return val;
            } else {
              return value?.trim();
            }
          }
        },
        complete: function complete(results) {
          const headersInFile = Array.from(fileHeaders);
          // check for missing headers
          _.difference(
            CompoundSubmissionConstants.getExpectedCombinationFileHeaders(),
            headersInFile,
          ).forEach(function (header) {
            errorMessages.push('Missing required column: ' + header);
          });
          const dataToReturn = {
            results: results,
            headers: headersInFile,
            errorMessages: errorMessages,
            hasErrors: errorMessages.length > 0,
          };
          return resolve(dataToReturn);
        },
        error: function error(_error) {
          console.log('error', error);
          return reject(_error);
        },
      });
    });
  }

  /**
   *
   * @param file
   * @param ext
   * @returns {Promise<unknown>}
   */
  static async parseCompoundTDT(file, ext = '\t') {
    const fileHeaders = new Set();
    const mapping = CompoundSubmissionConstants.getCompoundMapping();
    const reverseMapping = CompoundSubmissionConstants.reverseCompoundMapping();
    const errorMessages = [];
    return new Promise(function (resolve, reject) {
      Papa.parse(file, {
        delimiter: ext,
        header: true,
        skipEmptyLines: true,
        transformHeader: function (header) {
          const head = header.trim();
          fileHeaders.add(head);
          let mappedHeader = mapping[header.trim()];
          if (!mappedHeader) {
            mappedHeader = header.trim();
          }
          return mappedHeader;
        },
        transform: function transform(value, header) {
          const mappedHeader = reverseMapping[header.trim()];
          if (CompoundSubmissionConstants.getRequiredCommonHeaders().includes(mappedHeader)) {
            if (value && value.trim()) {
              if (CompoundSubmissionConstants.YesNoHeaders.includes(mappedHeader)) {
                return CompoundSubmissionConstants.validateYesNoHeaders(
                  value,
                  mappedHeader,
                  errorMessages,
                );
              }
              if (mappedHeader === CompoundSubmissionConstants.TOP_DOSE) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                } else {
                  return numb;
                }
              }
              if (mappedHeader === CompoundSubmissionConstants.TOP_DOSE_UNIT) {
                const top_dose_unit = value.trim();
                if (CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT !== top_dose_unit) {
                  errorMessages.push(
                    mappedHeader +
                      " must have units of '" +
                      CompoundSubmissionConstants.DEFAULT_TOP_DOSE_UNIT +
                      "'",
                  );
                } else {
                  return value.trim();
                }
              }
              if (mappedHeader === CompoundSubmissionConstants.STORAGE_CONDITIONS) {
                const storage_conditions = value.trim();
                if (
                  CompoundSubmissionConstants.STORAGE_CONDITIONS_OPTIONS.includes(
                    storage_conditions.toLowerCase(),
                  )
                ) {
                  return storage_conditions;
                } else {
                  errorMessages.push(
                    "Please use the drop down box under Storage conditions to select a storage option. '" +
                      storage_conditions +
                      "' is not recognized",
                  );
                }
              }
              return value.trim();
            } else {
              errorMessages.push("Blank values are not allowed for column '" + mappedHeader + "'");
              return value;
            }
          } else {
            if (CompoundSubmissionConstants.NUMBER_HEADERS.includes(mappedHeader)) {
              if (value && value.trim()) {
                const numb = value.trim();
                if (isNaN(numb)) {
                  errorMessages.push(mappedHeader + ' column must contain only numbers');
                }
              }
              return value;
            } else {
              const val = value.trim();
              if (mappedHeader === 'Full BRD' && val) {
                //must start with a BRD-
                if (!CompoundSubmissionConstants.BRD_REGEX.test(val.toUpperCase())) {
                  errorMessages.push(
                    "FULL BRD column must either be blank or must be a valid 'BRD'",
                  );
                }
              }
              return val;
            }
          }
        },
        complete: function complete(results) {
          const headersInFile = Array.from(fileHeaders);
          const dataToReturn = {
            results: results,
            headers: headersInFile,
            errorMessages: errorMessages,
            hasErrors: errorMessages.length > 0,
          };
          return resolve(dataToReturn);
        },
        error: function error(_error) {
          console.log('error', error);
          return reject(_error);
        },
      });
    });
  }

  /**
   *
   * /**
   *
   * @returns {{}}
   */
  static reverseCombinationMapping() {
    const reverseMapping = CompoundSubmissionConstants.getCombinationMapping();
    const map = {};
    for (let key in reverseMapping) {
      map[reverseMapping[key]] = key;
    }
    return map;
  }

  /**
   *
   */
  static reverseEPSCompoundMapping() {
    const reverseMapping = CompoundSubmissionConstants.getEPSCompoundMapping();
    const map = {};
    for (let key in reverseMapping) {
      map[reverseMapping[key]] = key;
    }
    return map;
  }

  /**
   *
   */
  static reverseCompoundMapping() {
    const reverseMapping = CompoundSubmissionConstants.getCompoundMapping();
    const map = {};
    for (let key in reverseMapping) {
      map[reverseMapping[key]] = key;
    }
    return map;
  }

  /**
   *
   */
  static reverseAqueousMapping() {
    const reverseMapping = CompoundSubmissionConstants.getAqueousMapping();
    const map = {};
    for (let key in reverseMapping) {
      map[reverseMapping[key]] = key;
    }
    return map;
  }

  /**
   *
   * @returns {{}}
   */
  static getCombinationMapping() {
    const map = {};
    map[CompoundSubmissionConstants.DRUG_A_COMPOUND_NAME] = 'druga';
    map[CompoundSubmissionConstants.DRUG_A_TOP_DOSE] = 'druga_top_dose';
    map[CompoundSubmissionConstants.DRUG_A_TOP_DOSE_UNIT] = 'druga_top_dose_unit';

    map[CompoundSubmissionConstants.DRUG_B_COMPOUND_NAME] = 'drugb';
    map[CompoundSubmissionConstants.DRUG_B_DOSE] = 'drugb_dose';
    map[CompoundSubmissionConstants.DRUG_B_DOSE_UNIT] = 'drugb_dose_unit';
    return map;
  }

  /**
   *
   * @returns {{}}
   */
  static getAqueousMapping() {
    const map = CompoundSubmissionConstants.getCommonCompoundMapping();
    map[CompoundSubmissionConstants.MOLECULE_TYPE] = CompoundSubmissionConstants.MOLECULE_TYPE_KEY;
    map[CompoundSubmissionConstants.SOLVENT] = CompoundSubmissionConstants.SOLVENT_KEY;
    return map;
  }

  /**
   *
   * @returns {{}}
   */
  static getCommonCompoundMapping() {
    const map = {};
    map[CompoundSubmissionConstants.QCED_LAST_SIX_MONTHS] =
      CompoundSubmissionConstants.QCED_LAST_SIX_MONTHS_KEY;
    map[CompoundSubmissionConstants.SDS_AVAILABLE] = CompoundSubmissionConstants.SDS_AVAILABLE_KEY;
    map[CompoundSubmissionConstants.HEALTH_HAZARD] = CompoundSubmissionConstants.HEALTH_HAZARD_KEY;
    map[CompoundSubmissionConstants.ACUTELY_TOXIC] = CompoundSubmissionConstants.ACUTELY_TOXIC_KEY;
    map[CompoundSubmissionConstants.SMILES] = CompoundSubmissionConstants.SMILES_KEY;

    map[CompoundSubmissionConstants.COMPOUND_NAME] = CompoundSubmissionConstants.COMPOUND_NAME_KEY;
    map[CompoundSubmissionConstants.TOP_DOSE] = CompoundSubmissionConstants.TOP_DOSE_KEY;
    map[CompoundSubmissionConstants.TOP_DOSE_UNIT] = CompoundSubmissionConstants.TOP_DOSE_UNIT_KEY;
    map[CompoundSubmissionConstants.AMOUNT] = CompoundSubmissionConstants.AMOUNT_KEY;
    map[CompoundSubmissionConstants.UNITS] = CompoundSubmissionConstants.UNITS_KEY;
    map[CompoundSubmissionConstants.SUPPLIER] = CompoundSubmissionConstants.SUPPLIER_KEY;
    map[CompoundSubmissionConstants.SUPPLIER_CATALOG_NAME] =
      CompoundSubmissionConstants.SUPPLIER_CATALOG_NAME_KEY;
    map[CompoundSubmissionConstants.STORAGE_CONDITIONS] =
      CompoundSubmissionConstants.STORAGE_CONDITIONS_KEY;

    map[CompoundSubmissionConstants.CONCENTRATION] =
      CompoundSubmissionConstants.STOCK_CONCENTRATION_KEY;
    map[CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS] =
      CompoundSubmissionConstants.STOCK_CONCENTRATION_UNITS_KEY;
    map[CompoundSubmissionConstants.LIST_CANCER_CELL_LINES] =
      CompoundSubmissionConstants.LIST_CANCER_CELL_LINES_KEY;
    map[CompoundSubmissionConstants.TARGET_MOA] = CompoundSubmissionConstants.TARGET_MOA_KEY;
    map[CompoundSubmissionConstants.VIAL_BARCODE] = CompoundSubmissionConstants.VIAL_BARCODE_KEY;
    return map;
  }

  /**
   *
   * @returns {{}}
   */
  static getEPSCompoundMapping() {
    const map = CompoundSubmissionConstants.getCompoundMapping();
    map[CompoundSubmissionConstants.DILUTION_FACTOR] =
      CompoundSubmissionConstants.DILUTION_FACTOR_KEY;

    return map;
  }

  /**
   *
   * @returns {{}}
   */
  static getCompoundMapping() {
    const map = CompoundSubmissionConstants.getCommonCompoundMapping();
    map[CompoundSubmissionConstants.FULL_BRD] = CompoundSubmissionConstants.FULL_BRD_KEY;

    return map;
  }

  /**
   *
   * @param compounds
   * @param projectInfo
   * @return {{success: string}|{error: string}}
   */
  static validateCompoundUpload(compounds, projectInfo) {
    if (compounds && compounds.length > 0) {
      let numCpdsMatch = parseInt(projectInfo.total_num_cpds) === compounds.length;
      if (!numCpdsMatch) {
        return {
          error:
            'You specified ' +
            projectInfo.total_num_cpds +
            ' test agent(s) on the previous page, but we found ' +
            compounds.length +
            ' in uploaded file',
        };
      }
      if (parseInt(projectInfo.total_num_cpds) === 1 && projectInfo.hasCombinations) {
        return {
          error:
            'You specified 1 test agent, but you need at least 2 test agents to run a combination',
        };
      }

      const errorMessages = CompoundSubmissionConstants.validationTestAgentTotalVolumes(
        compounds,
        projectInfo,
      );
      if (errorMessages.length > 0) {
        return { error: errorMessages.join('\n') };
      }
    } else {
      return { error: 'Please upload a file' };
    }
    return { success: 'passed validation' };
  }

  /**
   *
   * @param compounds
   * @param projectInfo
   * @return {*[]}
   */
  static validationTestAgentTotalVolumes(compounds, projectInfo) {
    const errorMessages = [];
    let expectedToTalVolume = CompoundSubmissionConstants.MTS_MINIMUM_VOLUME;
    if (projectInfo.submission_type === CompoundSubmissionConstants.EPS) {
      expectedToTalVolume = CompoundSubmissionConstants.EPS_MINIMUM_VOLUME;
    } else if (projectInfo.submission_type === CompoundSubmissionConstants.AIR) {
      expectedToTalVolume = CompoundSubmissionConstants.AIR_MINIMUM_VOLUME;
    }
    for (let compound of compounds) {
      const totalVolCpd = compound.amount;

      if (totalVolCpd < expectedToTalVolume) {
        errorMessages.push(
          "For Test Agent '" +
            compound.compound_name +
            "', expected total volume of at least " +
            expectedToTalVolume +
            ' µL, but found only ' +
            totalVolCpd +
            ' µL. ' +
            'Please review your test agent volume and re-upload the file',
        );
      }
    }
    return errorMessages;
  }

  /**
   *
   * @param data
   * @return {*[]}
   */
  static validationCombinationTotalVolumes(compound_data, combination_data) {
    const errorMessages = [];
    const drugas = _.compact(_.pluck(combination_data, 'druga'));
    const drugbs = _.compact(_.pluck(combination_data, 'drugb'));
    const drugs = [].concat(drugas, drugbs);
    const groups = _.groupBy(drugs, function (drug) {
      return drug;
    });
    const groupKeys = Object.keys(groups);
    for (let groupKey of groupKeys) {
      const foundCpd = _.findWhere(compound_data.compounds, { compound_name: groupKey });
      const totalVolCpd = foundCpd.amount;

      const expectedToTalVolume =
        groups[groupKey].length * CompoundSubmissionConstants.CPS_MINIMUM_VOLUME;
      if (totalVolCpd < expectedToTalVolume) {
        errorMessages.push(
          "For Drug '" +
            groupKey +
            "', expected total volume of at least " +
            expectedToTalVolume +
            ' µL, but found only ' +
            totalVolCpd +
            ' µL. ' +
            'Please return to the previous test agent page to review your submitted test agent volume.',
        );
      }
    }
    return errorMessages;
  }

  /**
   *
   * @param combination_data
   * @param compound_data
   * @param projectInfo
   * @return {{success: string}|{error: string}|boolean}
   */
  static validateCombinationUpload(combination_data, compound_data, projectInfo) {
    const self = this;
    let errorMessages = [];
    if (_.isEmpty(combination_data)) {
      errorMessages = ['Please upload a combination file'];
    } else {
      if (projectInfo.total_num_cpds === 1) {
        errorMessages = ['You need at least two test agents in order to run a combination'];
      } else {
        //find all unique compounds from the submitted list
        const compoundNames = _.uniq(_.pluck(compound_data.compounds, 'compound_name'));
        //find all the uniq druga's that have no drugb aka solo compounds
        let soloDrugAs = _.filter(combination_data, function (combination) {
          return !combination.drugb || !_.has(combination, 'drugb');
        });
        soloDrugAs = _.uniq(_.pluck(soloDrugAs, 'druga')).sort();

        const combinationDrugAs = _.uniq(_.pluck(combination_data, 'druga')).sort();
        if (JSON.stringify(soloDrugAs) !== JSON.stringify(combinationDrugAs)) {
          const diffs = _.difference(combinationDrugAs, soloDrugAs);
          if (diffs.length > 0) {
            errorMessages.push(
              "The following Drug A test agents need to be run solo. '" + diffs.join(',') + "'",
            );
          }
        }

        for (let combination of combination_data) {
          if (!compoundNames.includes(combination.druga)) {
            errorMessages.push(
              "Test agent '" + combination.druga + "' is not part of your submitted test agents",
            );
          }
          if (combination.drugb && !compoundNames.includes(combination.drugb)) {
            errorMessages.push(
              "Test agent '" + combination.drugb + "' is not part of your submitted test agents",
            );
          }
          if (!combination.druga_top_dose) {
            errorMessages.push("'Drug A Top Dose' is a required field");
          }
          if (!combination.druga_top_dose_unit) {
            errorMessages.push("'Drug A Top Dose Unit' is a required field");
          }
          if (combination.drugb && !combination.drugb_dose) {
            errorMessages.push("'Drug B Dose' is required if Drug B is specified"); //is it?
          }
          if (combination.drugb && !combination.drugb_dose_unit) {
            errorMessages.push("'Drug B Dose Unit' is required if Drug B is specified"); //is it?
          }
        }
      }
      if (errorMessages.length === 0) {
        errorMessages = CompoundSubmissionConstants.validationCombinationTotalVolumes(
          compound_data,
          combination_data,
        );
      }
      if (errorMessages.length > 0) {
        return { error: errorMessages.join('\n') };
      }
    }
    return { success: 'done' };
  }

  static async submitForms(response, apiURL) {
    const payload = CompoundSubmissionConstants.createPayload(response);

    return await postSubmission(apiURL, payload);
  }

  static async validateScreen(apiURL, screen, screenType) {
    try {
      const foundRecord = await findScreen(apiURL, screen);
      if (foundRecord && foundRecord.name === screen && foundRecord.screen_type) {
        return;
      }
      throw "Screen '" + screen + "' is not associated with submission type '" + screenType + "'";
    } catch (err) {
      console.log(err);
      throw "Screen '" + screen + "' is not associated with submission type '" + screenType + "'";
    }
  }

  static createPayload(response) {
    const projectInfo = response['project-information'];
    const funding = response.funding;
    const terms = response['terms-and-conditions'];
    const review_summary = response['review-summary'];
    const file_upload_cps = response['file-upload-cps'];
    const payload = {
      compoundInfo: {
        screen: projectInfo.screen,
        submission_type: projectInfo.submission_type,
        submitter_email: projectInfo.submitter_email,
        submitter_name: projectInfo.submitter_name,
        investigator_email: projectInfo.investigator_email,
        investigator_name: projectInfo.investigator_name,
        main_contact: projectInfo.main_contact_name,
        main_contact_email: projectInfo.main_contact_email,
        home_institution: projectInfo.home_institution,
        project_goals: projectInfo.project_goals,
        total_num_cpds: projectInfo.total_num_cpds,
        collaboration_type: projectInfo.collaboration_type,
        // bio_tech_accounts_payable_email:  payload.bio_tech_accounts_payable_email,
        agreements: {},
      },
      compounds: response['file-upload'].compounds,
      combinations: [],
    };
    if (file_upload_cps) {
      payload.combinations = response['file-upload-cps'].combinations; // this data is only the combination, not the compound alone (sample file shows both)
    }
    for (let key of Object.keys(terms)) {
      const termObj = terms[key];
      if (termObj && termObj.label) {
        payload.compoundInfo.agreements[key] = termObj.label;
      } else {
        payload.compoundInfo.agreements[key] = terms[key];
      }
    }
    if (review_summary[CompoundSubmissionConstants.OVERALLL_AGREEMENT] === true) {
      payload.compoundInfo.agreements[CompoundSubmissionConstants.OVERALLL_AGREEMENT] = 'Yes';
    }

    if (funding) {
      if (funding.br_funding_method) {
        payload.compoundInfo.agreements[CompoundSubmissionConstants.PO_CO_AGREEMENT] =
          terms[funding.br_funding_method];
      }
      if (funding.br_funding_partnership) {
        payload.compoundInfo.agreements[CompoundSubmissionConstants.COM_PARTNER_AGREEMENT] =
          terms[funding.br_funding_partnership];
      }
      if (funding.funding_comments) {
        payload.compoundInfo.funding_comments = funding.funding_comments;
      }
      if (funding.br_funding_inst_address) {
        payload.compoundInfo.br_funding_inst =
          funding.br_funding_inst_name + ' ' + funding.br_funding_inst_address;
      }
      if (funding.grant_admin_name) {
        payload.compoundInfo.grant_admin =
          funding.grant_admin_name + ' ' + funding.grant_admin_email;
      }
    }
    return payload;
  }

  static sortScreens(screens, attr) {
    const sortedScreens = screens.sort((a, b) => {
      return new Date(b[attr]) - new Date(a[attr]);
    });
    return sortedScreens[0];
  }

  /**
   * @param api_url
   * @param submission_type
   * @return {Promise<*>}
   */
  static async submissionMessage(api_url, submission_type) {
    return await fetchSubmissionMessage(api_url, submission_type);
  }
}
