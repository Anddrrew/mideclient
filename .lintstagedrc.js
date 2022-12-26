module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(js|jsx|ts|tsx)': (filenames) => [`eslint ${filenames.join(' ')}`, `prettier --write ${filenames.join(' ')}`],

  // Prettify only CSS and JSON files
  '**/*.(css|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,
};
