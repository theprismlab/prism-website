// CPS needs 3 unique test agents plus combination rows: each Drug A used in a
// real combo also needs a solo entry (Drug B = "None"), and vice versa.
function getCPSTestAgentData() {
  const compound = (name, top_dose) => ({
    compound_name: name,
    molecule_type: '',
    solvent: '',
    top_dose,
    top_dose_unit: 'uM',
    dilution_factor: '',
    amount: '1200',
    amount_unit: 'uL',
    conc: top_dose,
    conc_unit: 'mM',
    storage_conditions: 'Room temperature',
    health_hazard: 'No',
  });

  const combo = (druga, druga_top_dose, drugb, drugb_dose) => ({
    druga,
    druga_top_dose,
    druga_top_dose_unit: 'uM',
    drugb,
    drugb_dose,
    drugb_dose_unit: drugb_dose ? 'uM' : '',
  });

  return {
    rows: [compound('Compound A', '10'), compound('Compound B', '20'), compound('Compound C', '30')],
    combinations: [
      combo('Compound A', '10', 'Compound B', '20'),
      combo('Compound B', '20', 'Compound C', '30'),
      combo('Compound C', '30', 'Compound A', '10'),
      combo('Compound A', '10', 'None', ''),
      combo('Compound B', '20', 'None', ''),
      combo('Compound C', '30', 'None', ''),
    ],
  };
}

function getTestAgentRow(screenType) {
  const base = {
    compound_name: 'Test Compound',
    molecule_type: '',
    solvent: '',
    top_dose: '10',
    top_dose_unit: 'uM',
    dilution_factor: '',
    amount: '200',
    amount_unit: 'uL',
    conc: '10',
    conc_unit: 'mM',
    storage_conditions: 'Room temperature',
    health_hazard: 'No',
  };

  switch (screenType) {
    case 'EPS':
      // dilution_factor >= 3 → min 600 uL; conc = top_dose × 1
      return { ...base, dilution_factor: '3', amount: '600' };
    case 'APS':
      // stock = top_dose / 4 (concMultiplier 250); min 1000 uL; unit pairs uM → mM
      return { ...base, molecule_type: 'Antibody', solvent: 'PBS', conc: '2.5', amount: '1000' };
    case 'AIR':
      // max top dose 2 ug/mL; stock = top_dose / 2 (concMultiplier 500); min 500 uL
      return {
        ...base,
        molecule_type: 'Antibody',
        solvent: 'PBS',
        top_dose: '1',
        top_dose_unit: 'ug/mL',
        conc: '0.5',
        conc_unit: 'mg/mL',
        amount: '500',
      };
    default: // MTS, CPS — stock = top_dose × 1 (concMultiplier 1000); min 150 uL
      return base;
  }
}

export function getTestData(screenType) {
  return {
    collaborator: {
      submitterName: 'Lia Petronio',
      submitterEmail: 'lpetroni@broadinstitute.org',
      investigatorName: 'Lia Petronio Investigator',
      investigatorEmail: 'lpetroni@broadinstitute.org',
      dataAccessManagers: [{ name: 'Test Manager', email: 'lpetroni@broadinstitute.org' }],
    },
    institution: {
      institutionType: 'DMC',
      institutionName: 'Abbvie',
      quoteAcknowledgement: false,
      commercialUse: '',
      commercialUseAcknowledgement: false,
      fundingInstitutionName: '',
      fundingInstitutionAddress: '',
      billingInvoiceContactName: '',
      billingInvoiceContactEmail: '',
      comments: '',
    },
    testAgent:
      screenType === 'CPS'
        ? getCPSTestAgentData()
        : {
            rows: [getTestAgentRow(screenType)],
            combinations: [],
          },
    acknowledgements: {
      acknowledgement1: true,
      acknowledgement2: true,
      acknowledgement3: true,
      acknowledgement4: true,
      acknowledgement5: true,
      acknowledgement6: true,
      acknowledgement7: true,
      acknowledgement9: true,
    },
    review: { reviewed: true },
  };
}
