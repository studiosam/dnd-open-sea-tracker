// Setup-mode behavior. This stays memory-only until the real Stage 3 submit path.
function startNewVoyage() {
  setupDraft = defaultSetupDraft();
  appMode = 'setup';
  if (typeof document !== 'undefined') document.body?.classList.add('landing-active');
  render();
}

function backToLanding() {
  appMode = 'landing';
  render();
}

function resetSetupDefaults() {
  setupDraft = defaultSetupDraft();
  renderSetupScreen();
}

function startSetupVoyage() {
  alert('Start Voyage will be enabled in the next setup stage.');
}

function ensureSetupDraft() {
  setupDraft = setupDraftForRender();
  return setupDraft;
}

function setSetupField(field, value) {
  const draft = ensureSetupDraft();
  if (field === 'shipName') draft.shipName = String(value ?? '');
  if (field === 'voyagePreset') draft.voyagePreset = String(value ?? 'marrowwind');
}

function setSetupCrewName(index, value) {
  const draft = ensureSetupDraft();
  const character = draft.crew[Number(index)];
  if (character) character.name = normalizedSetupCrewName(value);
  renderSetupScreen();
}

function setSetupCrewSize(value) {
  const draft = ensureSetupDraft();
  const crewSize = clampSetupCrewSize(value);
  const defaults = defaultSetupDraft();
  draft.crewSize = crewSize;
  draft.crew = Array.from({ length: crewSize }, (_, index) => {
    const existing = draft.crew[index];
    return existing || defaults.crew[index] || setupCrewDraftFromMember(defaultCrewMember(index));
  });
  renderSetupScreen();
}

function setSetupCrewTrait(index, field, checked) {
  const draft = ensureSetupDraft();
  const character = draft.crew[Number(index)];
  if (character && SETUP_CREW_TRAIT_FIELDS.some((trait) => trait.field === field)) {
    character[field] = Boolean(checked);
  }
}

function setSetupCrewBackground(index, checked) {
  setSetupCrewTrait(index, 'sailorPirateBackground', checked);
}
