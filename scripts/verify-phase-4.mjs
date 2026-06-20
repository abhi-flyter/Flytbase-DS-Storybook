import { spawnSync } from 'node:child_process';

const steps = [
  ['npm', ['run', 'typecheck']],
  ['npm', ['run', 'build-storybook']],
  ['npm', ['run', 'audit:phase4']],
  ['npm', ['run', 'verify:storybook-static']]
];

for (const [command, args] of steps) {
  const label = [command, ...args].join(' ');
  console.log(`\n> ${label}`);
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false
  });

  if (result.status !== 0) {
    console.error(`\nPhase 4 verification failed at: ${label}`);
    process.exit(result.status ?? 1);
  }
}

console.log('\nPhase 4 verification passed.');
