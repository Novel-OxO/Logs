function readPackage(pkg, _context) {
  // Allow build scripts for specific packages
  if (pkg.name === 'esbuild' || pkg.name === 'sharp' || pkg.name === 'unrs-resolver') {
    pkg.scripts = pkg.scripts || {};
    // Allow all scripts for these packages
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
