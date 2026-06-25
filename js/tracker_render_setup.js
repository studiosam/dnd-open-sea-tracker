// Landing and setup-mode rendering for the GM app.
function renderLandingScreen() {
  const landing = q('landingScreen');
  if (!landing) return;
  if (typeof document !== 'undefined') {
    document.body?.classList.add('landing-active');
    document.body?.classList.remove('demo-mode-active');
  }
  landing.classList?.add('startup-landing-screen');
  landing.innerHTML = landingScreenMarkup(Boolean(readSavedVoyageState()));
}

function landingScreenMarkup(hasSavedVoyage) {
  const resumeDisabled = hasSavedVoyage ? '' : ' disabled';
  const resumeNote = hasSavedVoyage
    ? 'A saved voyage is available in this browser.'
    : 'No saved voyage found in this browser.';
  const startButtonClass = hasSavedVoyage
    ? 'landing-action-button landing-action-secondary'
    : 'landing-action-button landing-action-primary primary';
  const resumeButtonClass = hasSavedVoyage
    ? 'landing-action-button landing-action-primary primary'
    : 'landing-action-button landing-action-secondary';
  const startupActions = hasSavedVoyage
    ? `<button class="${resumeButtonClass}" type="button" data-action="resume-current-voyage"${resumeDisabled}>
          <span>Resume Current Voyage</span>
          <small>${h(resumeNote)}</small>
        </button>
        <button class="${startButtonClass}" type="button" data-action="start-new-voyage">
          <span>Start a New Voyage</span>
          <small>Open setup to configure the ship and crew before starting.</small>
        </button>`
    : `<button class="${startButtonClass}" type="button" data-action="start-new-voyage">
          <span>Start a New Voyage</span>
          <small>Open setup to configure the ship and crew before starting.</small>
        </button>
        <button class="${resumeButtonClass}" type="button" data-action="resume-current-voyage"${resumeDisabled}>
          <span>Resume Current Voyage</span>
          <small>${h(resumeNote)}</small>
        </button>`;
  return `<div class="landing-shell">
    <div class="landing-card">
      <div class="landing-brand">
        <img class="landing-icon" src="assets/favicon.svg" alt="" />
        <div>
          <p class="landing-kicker">Tabletop voyage control</p>
          <h1>Open Sea Encounter Tracker</h1>
        </div>
      </div>
      <p class="landing-subtitle">
        Run dangerous sea voyages with ship damage, water ingress, crew labor, supplies,
        navigation, hidden information, and player-facing ship status.
      </p>
      <div class="landing-actions">
        ${startupActions}
        <button class="landing-action-button landing-action-secondary" type="button" data-action="import-saved-voyage">
          <span>Import Saved Voyage</span>
          <small>Load a previously exported tracker JSON file.</small>
        </button>
        <button class="landing-action-button landing-action-secondary" type="button" data-action="load-demo-voyage">
          <span>Load Demo Voyage</span>
          <small>Try the default Marrowwind voyage.<br />Does not replace your saved voyage.</small>
        </button>
      </div>
      <div class="landing-note landing-storage-note">
        Saves are stored locally in this browser. Export backups before clearing browser data.
      </div>
    </div>
  </div>`;
}

function renderSetupScreen() {
  const landing = q('landingScreen');
  if (!landing) return;
  if (typeof document !== 'undefined') {
    document.body?.classList.add('landing-active');
    document.body?.classList.remove('demo-mode-active');
  }
  landing.classList?.remove('startup-landing-screen');
  landing.innerHTML = setupScreenMarkup(setupDraftForRender(), Boolean(readSavedVoyageState()));
}

function setupScreenMarkup(draft, hasSavedVoyage) {
  const savedNote = hasSavedVoyage
    ? 'A saved voyage exists. Starting this voyage will ask before replacing it.'
    : 'No saved voyage exists. This setup draft is not saved until Start Voyage.';
  const setupErrors = setupValidationErrors(draft);
  const setupStatus = setupErrors.length
    ? `<div class="setup-validation" role="alert">${setupErrors.map((error) => `<div>${h(error)}</div>`).join('')}</div>`
    : `<div class="setup-validation ok">Setup is valid: ship name and active crew names are ready.</div>`;
  const startDisabled = setupErrors.length ? ' disabled' : '';
  const crewSizeOptions = setupCrewSizeOptions()
    .map(
      (size) =>
        `<option value="${size}"${draft.crewSize === size ? ' selected' : ''}>${size} players</option>`
    )
    .join('');
  const crewRows = draft.crew
    .map((character, index) => {
      const traitCheckboxes = SETUP_CREW_TRAIT_FIELDS.map(
        ({ field, label }) => `<label class="setup-checkbox">
          <input type="checkbox" data-change-action="set-setup-crew-trait" data-field="${h(field)}" data-index="${index}"${character[field] ? ' checked' : ''} />
          ${h(label)}
        </label>`
      ).join('');
      return `<div class="setup-crew-row">
        <label for="setupCrewName${index}">Crew ${index + 1}</label>
        <input id="setupCrewName${index}" type="text" maxlength="${CREW_NAME_MAX_LENGTH}" required value="${h(character.name)}" data-change-action="set-setup-crew-name" data-index="${index}" />
        <div class="setup-checkbox-grid">${traitCheckboxes}</div>
      </div>`;
    })
    .join('');
  return `<div class="landing-shell setup-shell">
    <div class="landing-card setup-card">
      <div class="landing-brand">
        <img class="landing-icon" src="assets/favicon.svg" alt="" />
        <div>
          <p class="landing-kicker">Voyage setup</p>
          <h1>Set Up New Voyage</h1>
        </div>
      </div>
      <p class="landing-subtitle">
        Configure the voyage. Name your ship and select your crew. 
      </p>
      <div class="setup-form">
        <div class="setup-grid">
          <label>
            <span>Voyage Preset</span>
            <select data-change-action="set-setup-field" data-field="voyagePreset">
              <option value="marrowwind"${draft.voyagePreset === 'marrowwind' ? ' selected' : ''}>Default</option>
            </select>
          </label>
          <label>
            <span>Ship Name</span>
            <input type="text" maxlength="${SHIP_NAME_MAX_LENGTH}" required value="${h(draft.shipName)}" data-change-action="set-setup-field" data-field="shipName" />
          </label>
          <label>
            <span>Crew Size</span>
            <select data-change-action="set-setup-crew-size">
              ${crewSizeOptions}
            </select>
          </label>
        </div>
        <div>
          <h2>Crew</h2>
          ${setupStatus}
          <div class="setup-crew-grid">${crewRows}</div>
        </div>
      </div>
      <div class="setup-actions">
        <button type="button" data-action="back-to-landing">Back to Landing</button>
        <button type="button" data-action="reset-setup-defaults">Reset Setup Defaults</button>
        <button class="primary" type="button" data-action="start-setup-voyage"${startDisabled}>Start Voyage</button>
      </div>
      <div class="landing-note">
        ${h(savedNote)} ${
          setupErrors.length
            ? 'Fix setup errors before starting.'
            : 'Start Voyage will create and save this configured voyage.'
        }
      </div>
    </div>
  </div>`;
}

function setupDraftForRender(sourceDraft = setupDraft) {
  const defaults = defaultSetupDraft();
  const draft = sourceDraft && typeof sourceDraft === 'object' ? sourceDraft : {};
  const draftCrew = Array.isArray(draft.crew) ? draft.crew : [];
  const crewSize = clampSetupCrewSize(draft.crewSize ?? (draftCrew.length || defaults.crewSize));
  const crew = Array.from({ length: crewSize }, (_, index) => {
    const defaultCrew = defaults.crew[index] || setupCrewDraftFromMember(defaultCrewMember(index));
    const character = draftCrew[index] || {};
    return {
      name: typeof character.name === 'string' ? character.name : defaultCrew.name,
      ...Object.fromEntries(
        SETUP_CREW_TRAIT_FIELDS.map(({ field }) => [
          field,
          typeof character[field] === 'boolean' ? character[field] : defaultCrew[field]
        ])
      )
    };
  });
  return {
    voyagePreset:
      typeof draft.voyagePreset === 'string' ? draft.voyagePreset : defaults.voyagePreset,
    shipName: typeof draft.shipName === 'string' ? draft.shipName : defaults.shipName,
    crewSize,
    crew
  };
}
