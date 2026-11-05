export const CASE_STUDIES = [
  {
    title: 'Half of inhibitors hit what they say they hit — at rank 1',
    body: "For 50% of agents, the annotated target's genetic dependency is the single best predictor of sensitivity across the 891 cell lines. Another 10% have it within the top 10. The strength of this match often tracks with clinical trial success — drugs that fail this test get flagged for closer mechanistic inspection.",
    caption: 'Figure 1D–E: Rank of annotated target among top correlations',
    category: 'On-target mapping',
    image: '',
  },
  {
    title: 'A clear evolution in KRAS G12C selectivity',
    body: 'Divarasib, sotorasib, and adagrasib show progressively cleaner separation between KRAS G12C-mutant cell lines (red) and everything else (gray). Pan-RAS drugs sub-divide too: daraxonrasib and RMC-7977 favor NRAS/HRAS-mutant contexts, while BI-2865 and BI-2493 are more active in KRAS-amplified lines.',
    caption: 'Figure 6C · AUC distributions in G12C-mutant vs. all other lines',
    category: 'KRAS landscape',
    image: '',
  },
  {
    title: 'A 5-LOX inhibitor that actually hits TEAD1',
    body: "BW-B70C, annotated as a lipoxygenase inhibitor, sat next to known TEAD inhibitors in profile space. Boltz2 structural co-folding plus molecular dynamics predicted a stable pose in TEAD1's lipid pocket (shown), with hydrogen bonds to S356/P357 maintained throughout the trajectory. A TEAD luciferase reporter confirmed submicromolar inhibition in MCF7 cells.",
    caption: 'Figure 5G · Predicted BW-B70C pose in TEAD1 hydrophobic pocket',
    category: 'Hidden polypharmacology',
    image: '',
  },
];

export const ASSAY_WORKFLOW = [
  {
    title: 'Pool',
    caption: '891 barcoded cell lines, ~25 lines per pool',
    icon: 'mdi-dna',
  },
  { title: 'Treat', caption: '265 agents × 8 doses × 3 replicates', icon: 'mdi-pill' },
  {
    title: 'Incubate',
    caption: '5-day exposure across 39 pools × 26 plates',
    icon: 'mdi-timer-outline',
  },
  { title: 'Amplify', caption: 'Biotinylated PCR of barcodes', icon: 'mdi-repeat' },
  { title: 'Detect', caption: 'Luminex bead fluorescence readout', icon: 'mdi-chart-bar' },
];

// Publication details for the OncRef paper, shared by ManuscriptHeader and
// ManuscriptCard. `note` on each author and `mark` on each affiliation render as
// superscripts. journal / date / doi / pdfUrl / dataAccess render only once
// they have a value, so leave any of them empty ('') to hide it.
export const MANUSCRIPT = {
  title: 'OncRef: A pan-cancer PRISM reference of cancer therapeutics',
  authors: [
    { name: 'Matthew G. Rees', note: '1,5,7,#' },
    { name: 'Matthew J. Emmett', note: '1,2,3,4,5' },
    { name: 'Mustafa A. Kocak', note: '1' },
    { name: 'Colleen T. Harrington', note: '1' },
    { name: 'Anthony Fazio', note: '1' },
    { name: 'Mrinal Shekhar', note: '1' },
    { name: 'Li Wang', note: '1' },
    { name: 'Alvin Kalathungal', note: '1' },
    { name: 'Tenzin Sangpo', note: '1' },
    { name: 'Emily R. Borr', note: '1' },
    { name: 'Yiwei Liang', note: '1' },
    { name: 'Rachael Barry', note: '1' },
    { name: 'Emily Reeves', note: '1' },
    { name: 'Aydin Golabi', note: '1' },
    { name: 'Blanche C. Ip', note: '1' },
    { name: 'Laura Doherty', note: '1' },
    { name: 'Jillian Eskra', note: '1' },
    { name: 'John F. Davis', note: '1' },
    { name: 'Ashish B. George', note: '1' },
    { name: 'Dennie T. Frederick', note: '1' },
    { name: 'Melissa M. Ronan', note: '1' },
    { name: 'Catarina D. Campbell', note: '1' },
    { name: 'Jennifer A. Roth', note: '1,6,#' },
    { name: 'William R. Sellers', note: '1,2,4,6,#' },
  ],
  affiliations: [
    { mark: '1', text: 'Broad Institute of MIT & Harvard, Cambridge, MA 02142, USA' },
    {
      mark: '2',
      text: 'Department of Medical Oncology, Dana-Farber Cancer Institute, Boston, MA 02215, USA',
    },
    {
      mark: '3',
      text: 'Division of Hematology and Oncology, Mass General Brigham Cancer Institute, Boston, MA 02114, USA',
    },
    { mark: '4', text: 'Harvard Medical School, Boston, MA 02115, USA' },
    { mark: '5', text: 'These authors contributed equally' },
    { mark: '6', text: 'These authors contributed equally' },
    { mark: '7', text: 'Lead contact' },
    {
      mark: '#',
      text: 'Correspondence: reesm@broadinstitute.org (M.G.R.), jroth@broadinstitute.org (J.A.R.), wsellers@broadinstitute.org (W.R.S.)',
    },
  ],
  journal: 'TBD',
  date: 'Month DD, YYYY',
  doi: '10.1101/2025.XX.XX.XXXXXX',
  pdfUrl: '#',
  dataAccess: '#',
};

export const STORY_CARDS = [
  {
    eyebrow: 'The resource',
    title: 'A pan-cancer screen of clinical therapeutics',
    body: 'Clinically relevant agents were profiled across the PRISM collection of deeply characterized, barcoded cancer cell lines spanning 29 lineages. The result is OncRef, an Oncology Reference for cancer therapeutics.',
    points: [
      'Small molecules, protein degraders, and biologics',
      '891 barcoded cell lines with extensive molecular characterization',
      'Pooled, multiplexed screening of all lines at once',
    ],
  },
  {
    eyebrow: 'The framework',
    title: 'Beyond the primary target',
    body: 'Most agents produced effects consistent with their annotated targets. A new framework then quantifies how each agent behaves beyond that target, surfacing unintended targets and the mediators of toxicity that shape cellular response.',
    points: ['Specificity', 'Selectivity', 'On-target polypharmacology', 'Non-target effects'],
  },
  {
    eyebrow: 'The benchmark',
    title: 'A reference that scales',
    body: 'Together, the resource and the framework establish a benchmark for oncology therapeutics, and a repeatable way to evaluate new targets and new modalities as they emerge.',
    points: [
      'Benchmark for oncology therapeutics',
      'Scalable framework for new targets',
      'Extends to new modalities',
    ],
  },
];
