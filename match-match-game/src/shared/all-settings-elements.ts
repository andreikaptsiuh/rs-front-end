export const allSettingsElements = [
  {
    title: 'Game cards',
    inputElement: `
      <select class="settings-element__input" id="cards-type">
        <option disabled> select game cards type </option>
        <option value="nature"> Nature </option>
        <option value="barbeque"> Barbeque </option>
      </select>
      `,
  },

  {
    title: 'Difficulty',
    inputElement: `
      <select class="settings-element__input" id="cards-value">
        <option disabled> select game type </option>
        <option value="12"> 3x4 </option>
        <option value="16"> 4x4 </option>
        <option value="20"> 4x5 </option>
      </select>
      `,
  },
];
