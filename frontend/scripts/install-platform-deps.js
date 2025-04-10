/* eslint-disable no-undef */
// This script installs platform-specific Rollup dependencies based on the current OS
import { execSync } from 'child_process';
import { platform, arch } from 'os';

console.log('Checking if platform-specific Rollup dependencies are needed...');

// Only Windows needs the specific Rollup dependency
if (platform() === 'win32' && arch() === 'x64') {
  try {
    console.log(
      'Windows x64 detected, installing @rollup/rollup-win32-x64-msvc...'
    );
    execSync('npm install @rollup/rollup-win32-x64-msvc', { stdio: 'inherit' });
    console.log('Platform-specific dependencies installed successfully.');
  } catch (error) {
    console.error('Failed to install platform-specific dependencies:', error);
  }
} else {
  console.log(
    `Current platform (${platform()}-${arch()}) doesn't require specific Rollup dependencies.`
  );
}
