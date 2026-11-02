function renderDetail() {
  const host = document.getElementById('detail-host');
  if (!state.selected) {
    host.innerHTML = '';
    return;
  }
  const c = COMPOUNDS.find((x) => x.n === state.selected);
  if (!c) {
    host.innerHTML = '';
    return;
  }
  const fields = [
    ['Targets', c.tg],
    ['Mechanism', c.mech],
    ['Class', c.cl],
    ['Modality', c.mod],
    ['Pathway', c.pw],
    ['Highest clinical stage', c.st],
  ];
  const links = [];
  if (c.ch)
    links.push(
      `<a href="https://www.ebi.ac.uk/chembl/compound_report_card/${c.ch}/" target="_blank" rel="noopener">ChEMBL: ${c.ch}</a>`,
    );
  if (c.pc && !c.pc.startsWith('SID'))
    links.push(
      `<a href="https://pubchem.ncbi.nlm.nih.gov/compound/${c.pc}" target="_blank" rel="noopener">PubChem: ${c.pc}</a>`,
    );
  if (c.pc && c.pc.startsWith('SID')) {
    const sid = c.pc.replace('SID:', '');
    links.push(
      `<a href="https://pubchem.ncbi.nlm.nih.gov/substance/${sid}" target="_blank" rel="noopener">PubChem SID: ${sid}</a>`,
    );
  }

  /* Structure block: load lazily after innerHTML is set */
  let structureBlock = '';
  if (isRenderableCID(c.pc)) {
    structureBlock = `
      <div class="detail-structure">
        <div class="loading" id="struct-loading">Loading structure…</div>
        <img id="struct-img" alt="2D structure of ${c.n}" style="display:none;" />
        <span class="src-label">PubChem</span>
      </div>`;
  } else if (c.cl === 'biologic' || (c.pc || '').startsWith('SID')) {
    structureBlock = `
      <div class="detail-structure">
        <div class="placeholder">
          <div style="font-size:24px;margin-bottom:6px;">🧬</div>
          Biologic / large molecule<br/>
          <span style="opacity:0.7;">No 2D depiction</span>
        </div>
      </div>`;
  } else {
    structureBlock = `
      <div class="detail-structure">
        <div class="placeholder">
          <div style="font-size:18px;margin-bottom:4px;">⚗︎</div>
          No PubChem CID
        </div>
      </div>`;
  }

  host.innerHTML = `
    <div class="card nopad" style="margin-top:16px;">
      <div class="detail-panel">
        <div class="detail-head">
          <div>
            <div class="detail-title">${c.n}</div>
            ${c.syn ? `<div class="detail-syn">${c.syn}</div>` : ''}
          </div>
          <button class="detail-close" id="detail-close" aria-label="Close">✕</button>
        </div>
        <div class="detail-content">
          ${structureBlock}
          <div>
            <div class="detail-grid">
              ${fields.map(([k, v]) => `<div><div class="k">${k}</div><div class="v">${v || '—'}</div></div>`).join('')}
            </div>
            ${links.length ? `<div class="detail-links">${links.join('')}</div>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('detail-close').addEventListener('click', () => {
    state.selected = null;
    updateAll();
  });

  /* Lazy-load structure image with error handling */
  if (isRenderableCID(c.pc)) {
    const img = document.getElementById('struct-img');
    const loading = document.getElementById('struct-loading');
    img.onload = () => {
      img.style.display = 'block';
      if (loading) loading.remove();
    };
    img.onerror = () => {
      if (loading) {
        loading.innerHTML = `<div class="placeholder"><div style="font-size:18px;margin-bottom:4px;">⚗︎</div>Structure unavailable</div>`;
      }
    };
    img.src = structureURL(c.pc);
  }
}
