export const ASSAYS = {
  MTS: {
    id: 'MTS',
    screen: 'MTS',
    screen_full: 'Medium Throughput Screen',
    test_agents: 'Small molecule single agents',
    num_cell_lines: '~900 (full PRISM cell set)',
    dose_scheme: `8-point dose, 3-fold dilution`,
    time_point: '5-day',
    description:
      "DMSO-soluble small molecules are plated with an Echo Acoustic Liquid handler using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP's).",
    image: 'PRISM_Assay_Workflow_MTS.png',
  },
  CPS: {
    id: 'CPS',
    screen: 'CPS',
    screen_full: 'Combination PRISM Screen',
    test_agents: 'Small molecule combinations',
    num_cell_lines: '~900 (full PRISM cell set)',
    dose_scheme: `<ul>
                    <li>7-point dose, 3-fold dilution (treatment agent)</li>
                    <li>1-point dose (anchor agent)</li>
                    <li>Test agents are screened at dose alone and in combination</li>
                </ul>`,
    time_point: '5-day',
    description: `Like the 5-day, single agent assay, DMSO-soluble small molecules in combination are plated with an Echo Acoustic Liquid handler using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP's). For more information, review the <a href="https://theprismlab.org/white-papers/multiplexed-cancer-cell-line-combination-screening-using-prism" target="_blank">CPS white paper</a> and explore our <a href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds" target="_blank">public dataset</a> on the PRISM Portal.`,
    image: 'PRISM_Assay_Workflow_CPS.png',
  },
  APS: {
    id: 'APS',
    screen: 'APS',
    screen_full: 'Aqueous PRISM Screen',
    test_agents: 'Antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents',
    num_cell_lines: '~900 (full PRISM cell set)',
    dose_scheme: `8-point dose, 3-fold dilution`,
    time_point: '5-day',
    description: `Cells are plated first into 384-well plates followed by the Echo transfer of aqueous test agents. This method gives us the highest quality data and does not freeze the aqueous reagents. For more information, review the <a href='https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets' target='_blank'>ADC white paper</a> and explore our <a href='https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds' target='_blank'>public dataset</a> on the PRISM Portal.`,
    image: 'PRISM_Assay_Workflow_APS.png',
  },
  AIR: {
    id: 'AIR',
    screen: 'AIR',
    screen_full: 'Antibody Internalization Reporter',
    test_agents: 'Antibodies (IgG isotype, containing human or humanized Fc region)',
    num_cell_lines: '~900 (full PRISM cell set)',
    dose_scheme: `8-point dose, 3-fold dilution`,
    time_point: '5-day',
    description: `Unconjugated antibodies are first mixed with a cytotoxic payload via a secondary drug-conjugate prior to screening. Like the APS assay, cells are then plated into 384-well plates followed by the Echo transfer of test agents. For more information, review the <a href='https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets' target='_blank'>ADC white paper</a> and explore our <a href='https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds' target='_blank'>public dataset</a> on the PRISM Portal.`,
    image: 'PRISM_Assay_Workflow_AIR.png',
  },
  EPS: {
    id: 'EPS',
    screen: 'EPS',
    screen_full: 'Extended PRISM Screen',
    test_agents: 'Small molecule single agents',
    num_cell_lines: '+500',
    dose_scheme: `5-pt dose, custom dilution `,
    time_point: '10-day',
    description: `For the extended day assay, DMSO-soluble small molecules are plated into 96-well plates and then frozen. Cell pools are plated on assay ready plates on day 0, and drug is re-added on day 6. Cell pools are lysed on day 10, after which gDNA is PCR'ed and then sequenced.`,
    image: 'PRISM_Assay_Workflow_EPS.png',
  },
};
