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

const renameFile = (oldPath, newPath) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ Renamed: ${oldPath} → ${newPath}`);
  } else {
    console.warn(`⚠️ File not found: ${oldPath}`);
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

const processDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      const kebabFileName = kebabCase(file);
      if (file !== kebabFileName) {
        const newFullPath = path.join(dir, kebabFileName);
        renameFile(fullPath, newFullPath);
      }
    }
  });
};

const run = () => {
  console.log('🔧 Starting project restructuring...');

  // Process the components directory for kebab-case renaming
  const componentsDir = path.join(__dirname, 'components');
  if (fs.existsSync(componentsDir)) {
    processDirectory(componentsDir);
  } else {
    console.warn(`⚠️ Directory not found: ${componentsDir}`);
  }

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

  console.log('🎉 Project restructuring complete!');
};

run();
