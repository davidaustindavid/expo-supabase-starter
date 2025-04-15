// scripts/restructure-project.js

const fs = require('fs');
const path = require('path');

const kebabCase = (str) =>
  str &&
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const ensureFolder = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created folder: ${dir}`);
  }
};

const moveFile = (source, destination) => {
  if (fs.existsSync(source)) {
    ensureFolder(path.dirname(destination));
    fs.renameSync(source, destination);
    console.log(`✅ Moved: ${source} → ${destination}`);
  } else {
    console.warn(`⚠️ File not found: ${source}`);
  }
};

const run = () => {
  console.log('🔧 Starting project restructuring...');

  // Define the files to move and their destinations
  const filesToMove = [
    {
      source: 'app/SearchView.tsx',
      destination: 'app/(tabs)/search.tsx',
    },
    {
      source: 'app/BrowseOptionsView.tsx',
      destination: 'app/(tabs)/browse-options.tsx',
    },
    {
      source: 'app/ResultsView.tsx',
      destination: 'app/(tabs)/results.tsx',
    },
    {
      source: 'app/InformationView.tsx',
      destination: 'app/(tabs)/information.tsx',
    },
    {
      source: 'app/ProductDetailsView.tsx',
      destination: 'app/product/[id].tsx',
    },
    // Add more files as needed
  ];

  // Move the files
  filesToMove.forEach(({ source, destination }) => {
    moveFile(source, destination);
  });

  // Create additional directories if they don't exist
  const directories = ['components', 'hooks', 'utils', 'constants', 'enums', 'types'];
  directories.forEach((dir) => ensureFolder(dir));

  console.log('🎉 Project restructuring complete!');
};

run();
