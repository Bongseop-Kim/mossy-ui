import data from '../src/data/seed-parity.json' with { type: 'json' };

const statuses = new Set(['완료', '부분완료', '미구현', '제약', 'Mossy only']);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const statusesRequiringNote = new Set(['부분완료', '미구현', '제약', 'Mossy only']);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

for (const row of data.checklist) {
  if (!statuses.has(row.status)) {
    fail(`Unknown checklist status: ${row.seed} -> ${row.status}`);
  }

  if (!row.seed || !row.seedProps || !row.propStatus) {
    fail(`Missing required checklist data for ${row.seed || '(unknown)'}`);
  }

  for (const item of splitPropStatus(row.propStatus)) {
    if (statusesRequiringNote.has(item.status) && !item.note) {
      fail(`Missing note for ${item.status} prop status: ${row.seed} -> ${item.target}`);
    }
  }
}

for (const row of data.mossyOnly) {
  if (!statuses.has(row.status)) {
    fail(`Unknown Mossy-only status: ${row.component} -> ${row.status}`);
  }

  if (!row.component || !row.props || !row.reason) {
    fail(`Missing required Mossy-only data for ${row.component || '(unknown)'}`);
  }
}

const rootNames = new Set(
  data.checklist.map((row) => row.seed.replace(/^`|`$/g, '').split('.')[0])
);

for (const rootName of rootNames) {
  const slug = rootName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

  if (!slugPattern.test(slug)) {
    fail(`Invalid generated slug for ${rootName}: ${slug}`);
  }
}

if (process.exitCode) {
  process.exit();
}

console.log(
  `seed parity data valid: ${data.checklist.length} checklist rows, ${data.mossyOnly.length} Mossy-only rows`
);

function splitPropStatus(value) {
  return value
    .split(' / ')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const match = item.match(/^(.+?):\s*([^—]+?)(?:\s*—\s*(.+))?$/);

      if (!match) {
        return {
          target: item,
          status: '',
          note: '',
        };
      }

      return {
        target: match[1].trim(),
        status: match[2].trim(),
        note: match[3]?.trim() ?? '',
      };
    });
}
