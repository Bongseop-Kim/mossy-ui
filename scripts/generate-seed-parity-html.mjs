import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const sourcePath = path.resolve(
  root,
  process.argv[2] ?? 'src/components/docs/seed-component-parity.md'
);
const outputPath = path.resolve(
  root,
  process.argv[3] ?? sourcePath.replace(/\.md$/, '.html')
);

const statuses = [
  '완료',
  '부분완료',
  '미구현',
  '제약',
  'Mossy only',
];

const statusClass = {
  완료: 'done',
  부분완료: 'partial',
  미구현: 'missing',
  제약: 'blocked',
  'Mossy only': 'mossy-only',
};

const checklistStatuses = statuses.filter((status) => status !== 'Mossy only');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function splitMarkdownRow(line) {
  const cells = [];
  let current = '';
  let inCode = false;

  for (let index = 1; index < line.length; index += 1) {
    const char = line[index];

    if (char === '`') {
      inCode = !inCode;
      current += char;
      continue;
    }

    if (char === '|' && !inCode) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  return cells;
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function parseParityMarkdown(markdown) {
  const checklist = [];
  const mossyOnly = [];
  let section = '';

  for (const line of markdown.split('\n')) {
    if (line.startsWith('## ')) {
      section = line.slice(3).trim();
      continue;
    }

    if (!line.startsWith('| `')) {
      continue;
    }

    const cells = splitMarkdownRow(line);

    if (section === 'Seed Implementation Checklist' && cells.length >= 7) {
      checklist.push({
        seed: cells[0],
        seedProps: cells[1],
        mossy: cells[2],
        mossyProps: cells[3],
        status: cells[4],
        next: cells[5],
        note: cells[6],
      });
    }

    if (section === 'Mossy Only' && cells.length >= 3) {
      mossyOnly.push({
        component: cells[0],
        props: cells[1],
        reason: cells[2],
        status: 'Mossy only',
      });
    }
  }

  return { checklist, mossyOnly };
}

function statusSummary(rows) {
  return Object.fromEntries(
    statuses.map((status) => [
      status,
      rows.filter((row) => row.status === status).length,
    ])
  );
}

function validateRows({ checklist, mossyOnly }) {
  if (checklist.length === 0) {
    throw new Error('Seed Implementation Checklist table rows were not found.');
  }

  if (mossyOnly.length === 0) {
    throw new Error('Mossy Only table rows were not found.');
  }

  const invalidStatuses = [...checklist, ...mossyOnly]
    .map((row) => row.status)
    .filter((status) => !statuses.includes(status));

  if (invalidStatuses.length > 0) {
    throw new Error(
      `Unknown status value(s): ${[...new Set(invalidStatuses)].join(', ')}`
    );
  }
}

function renderHtml({ checklist, mossyOnly }) {
  const counts = statusSummary([...checklist, ...mossyOnly]);
  const total = checklist.length;
  const relativeSource = path.relative(root, sourcePath);

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Seed Component Parity</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f4ee;
      --ink: #1e2422;
      --muted: #66706c;
      --line: #d8d3c7;
      --panel: #fffdf8;
      --panel-2: #ebe7dc;
      --accent: #1b7f6b;
      --accent-ink: #0d4036;
      --done-bg: #dff2e8;
      --done-ink: #14543c;
      --partial-bg: #e8e2f6;
      --partial-ink: #4d3c7a;
      --missing-bg: #f6dfdc;
      --missing-ink: #87372f;
      --blocked-bg: #f3e6c6;
      --blocked-ink: #705116;
      --mossy-only-bg: #dfe9f7;
      --mossy-only-ink: #254b7a;
      --shadow: 0 18px 48px rgba(52, 45, 31, 0.12);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background:
        linear-gradient(90deg, rgba(30, 36, 34, 0.045) 1px, transparent 1px),
        linear-gradient(180deg, rgba(30, 36, 34, 0.045) 1px, transparent 1px),
        var(--bg);
      background-size: 28px 28px;
      color: var(--ink);
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif;
      line-height: 1.55;
    }

    .shell {
      width: min(1580px, calc(100vw - 36px));
      margin: 0 auto;
      padding: 34px 0 54px;
    }

    header {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 28px;
      align-items: end;
      border-bottom: 2px solid var(--ink);
      padding-bottom: 22px;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.1rem, 4.6vw, 5.4rem);
      line-height: 0.92;
      letter-spacing: 0;
      max-width: 920px;
    }

    .intro {
      margin: 14px 0 0;
      color: var(--muted);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.92rem;
    }

    .counts {
      display: grid;
      grid-template-columns: repeat(6, minmax(96px, 1fr));
      gap: 10px;
      min-width: min(600px, 100%);
    }

    .count {
      border: 1px solid var(--line);
      background: rgba(255, 253, 248, 0.82);
      padding: 12px 14px;
      box-shadow: var(--shadow);
    }

    .count strong {
      display: block;
      font-size: 1.75rem;
      line-height: 1;
    }

    .count span {
      color: var(--muted);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.78rem;
    }

    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: grid;
      grid-template-columns: minmax(220px, 1fr) auto;
      gap: 14px;
      margin: 22px 0;
      padding: 14px;
      border: 1px solid var(--line);
      background: rgba(246, 244, 238, 0.94);
      backdrop-filter: blur(16px);
    }

    input[type="search"] {
      width: 100%;
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--ink);
      padding: 12px 14px;
      font: 0.95rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      outline: none;
    }

    input[type="search"]:focus-visible {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(27, 127, 107, 0.16);
    }

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      justify-content: flex-end;
    }

    .filter {
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--ink);
      padding: 10px 12px;
      cursor: pointer;
      font: 0.82rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .filter[aria-pressed="true"] {
      border-color: var(--accent-ink);
      background: var(--accent-ink);
      color: white;
    }

    .filter:hover {
      border-color: var(--accent);
    }

    .filter:focus-visible {
      outline: 3px solid rgba(27, 127, 107, 0.28);
      outline-offset: 2px;
    }

    section { margin-top: 24px; }

    .section-head {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: baseline;
      margin: 26px 0 10px;
    }

    h2 {
      margin: 0;
      font-size: 1.35rem;
      letter-spacing: 0;
    }

    .result-count {
      color: var(--muted);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.82rem;
    }

    .table-wrap {
      overflow: auto;
      max-height: min(760px, calc(100vh - 180px));
      border: 1px solid var(--line);
      background: var(--panel);
      box-shadow: var(--shadow);
      overscroll-behavior: contain;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      min-width: 1540px;
    }

    th, td {
      border-bottom: 1px solid var(--line);
      border-right: 1px solid var(--line);
      padding: 12px 14px;
      vertical-align: top;
      text-align: left;
    }

    th:last-child, td:last-child { border-right: 0; }
    tr:last-child td { border-bottom: 0; }

    th {
      position: sticky;
      top: 0;
      z-index: 2;
      background: #242a28;
      color: #fffdf8;
      border-bottom: 2px solid #242a28;
      font: 0.82rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      line-height: 1.25;
      white-space: nowrap;
    }

    .th-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
    }

    .column-hide-button,
    .column-show-button {
      border: 1px solid currentColor;
      background: transparent;
      color: inherit;
      cursor: pointer;
      font: 0.72rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      line-height: 1;
    }

    .column-hide-button {
      flex: 0 0 auto;
      border-color: rgba(255, 253, 248, 0.5);
      padding: 5px 7px;
    }

    .column-hide-button:hover {
      background: rgba(255, 253, 248, 0.14);
    }

    .column-hide-button:focus-visible,
    .column-show-button:focus-visible {
      outline: 3px solid rgba(255, 253, 248, 0.32);
      outline-offset: 2px;
    }

    .column-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      min-height: 36px;
      margin: 0 0 10px;
      color: var(--muted);
      font: 0.78rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .column-show-button {
      border-color: var(--line);
      background: var(--panel);
      color: var(--accent-ink);
      padding: 8px 10px;
    }

    .column-show-button:hover {
      border-color: var(--accent);
    }

    td {
      font-size: 0.94rem;
    }

    code {
      background: rgba(30, 36, 34, 0.07);
      border: 1px solid rgba(30, 36, 34, 0.09);
      padding: 0.05rem 0.28rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.86em;
    }

    .component {
      min-width: 190px;
      font-weight: 700;
      font-size: 1rem;
    }

    .seed-props { min-width: 420px; }
    .mossy { min-width: 170px; }
    .mossy-props { min-width: 360px; }
    .next-action { min-width: 360px; }
    .note { min-width: 320px; }

    .status {
      display: inline-flex;
      align-items: center;
      width: max-content;
      max-width: 230px;
      padding: 5px 8px;
      border-radius: 999px;
      font: 0.76rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      white-space: normal;
    }

    .status.done { background: var(--done-bg); color: var(--done-ink); }
    .status.partial { background: var(--partial-bg); color: var(--partial-ink); }
    .status.missing { background: var(--missing-bg); color: var(--missing-ink); }
    .status.blocked { background: var(--blocked-bg); color: var(--blocked-ink); }
    .status.mossy-only { background: var(--mossy-only-bg); color: var(--mossy-only-ink); }

    .api-table { min-width: 900px; }
    .api-table .component { width: 190px; }

    @media (max-width: 900px) {
      .shell { width: min(100vw - 24px, 1580px); padding-top: 22px; }
      header { grid-template-columns: 1fr; }
      .counts { grid-template-columns: repeat(2, minmax(0, 1fr)); min-width: 0; }
      .toolbar { grid-template-columns: 1fr; }
      .filters { justify-content: flex-start; }
      .table-wrap { max-height: calc(100vh - 220px); }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <div>
        <h1>Seed Component Parity</h1>
        <p class="intro">Source: <code>${escapeHtml(relativeSource)}</code> · Seed Implementation Checklist is the source of truth. Mossy-only APIs are rendered separately.</p>
      </div>
      <div class="counts" aria-label="상태 요약">
        <div class="count"><strong>${total}</strong><span>total</span></div>
        <div class="count"><strong>${counts['완료']}</strong><span>완료</span></div>
        <div class="count"><strong>${counts['부분완료']}</strong><span>부분완료</span></div>
        <div class="count"><strong>${counts['미구현']}</strong><span>미구현</span></div>
        <div class="count"><strong>${counts['제약']}</strong><span>제약</span></div>
        <div class="count"><strong>${counts['Mossy only']}</strong><span>Mossy only</span></div>
      </div>
    </header>

    <div class="toolbar" aria-label="표 필터">
      <input id="search" name="component-search" type="search" aria-label="컴포넌트, props, 메모 검색" placeholder="컴포넌트, props, 메모 검색" autocomplete="off">
      <div class="filters" role="group" aria-label="상태 필터">
        <button class="filter" type="button" data-status="all" aria-pressed="true">전체</button>
        ${checklistStatuses.map((status) => `<button class="filter" type="button" data-status="${escapeHtml(status)}" aria-pressed="false">${escapeHtml(status)}</button>`).join('\n        ')}
      </div>
    </div>

    <section aria-labelledby="checklist-title">
      <div class="section-head">
        <h2 id="checklist-title">Seed Implementation Checklist</h2>
        <span class="result-count"><span id="visible-count">${total}</span> / ${total}</span>
      </div>
      <div class="table-wrap">
        <table id="checklist-table">
          <thead>
            <tr>
              <th>Seed 컴포넌트</th>
              <th>Seed props 요약</th>
              <th>Seed 대응</th>
              <th>Mossy props</th>
              <th>상태</th>
              <th>다음 액션</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            ${checklist.map((row) => `<tr data-status="${escapeHtml(row.status)}" data-search="${escapeHtml(`${row.seed} ${row.seedProps} ${row.mossy} ${row.mossyProps} ${row.status} ${row.next} ${row.note}`.toLowerCase())}">
              <td class="component">${inlineMarkdown(row.seed)}</td>
              <td class="seed-props">${inlineMarkdown(row.seedProps)}</td>
              <td class="mossy">${inlineMarkdown(row.mossy)}</td>
              <td class="mossy-props">${inlineMarkdown(row.mossyProps)}</td>
              <td><span class="status ${statusClass[row.status]}">${escapeHtml(row.status)}</span></td>
              <td class="next-action">${inlineMarkdown(row.next)}</td>
              <td class="note">${inlineMarkdown(row.note)}</td>
            </tr>`).join('\n            ')}
          </tbody>
        </table>
      </div>
    </section>

    <section aria-labelledby="mossy-only-title">
      <div class="section-head">
        <h2 id="mossy-only-title">Mossy Only</h2>
        <span class="result-count">${mossyOnly.length} components</span>
      </div>
      <div class="table-wrap">
        <table class="api-table" id="mossy-only-table">
          <thead>
            <tr>
              <th>Mossy 컴포넌트</th>
              <th>Mossy props</th>
              <th>이유</th>
            </tr>
          </thead>
          <tbody>
            ${mossyOnly.map((row) => `<tr>
              <td class="component">${inlineMarkdown(row.component)}</td>
              <td class="mossy-props">${inlineMarkdown(row.props)}</td>
              <td class="note">${inlineMarkdown(row.reason)}</td>
            </tr>`).join('\n            ')}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <script>
    const rows = Array.from(document.querySelectorAll('#checklist-table tbody tr'));
    const search = document.querySelector('#search');
    const visibleCount = document.querySelector('#visible-count');
    const filters = Array.from(document.querySelectorAll('.filter'));
    let activeStatus = 'all';

    function setColumnVisibility(table, columnIndex, visible) {
      const rowsInTable = Array.from(table.querySelectorAll('tr'));

      for (const row of rowsInTable) {
        const cell = row.children[columnIndex];
        if (cell) {
          cell.hidden = !visible;
        }
      }
    }

    function renderColumnControls(table, controls, hiddenColumns) {
      controls.innerHTML = '';

      if (hiddenColumns.size === 0) {
        controls.textContent = '숨긴 칼럼 없음';
        return;
      }

      controls.textContent = '숨긴 칼럼:';

      for (const [columnIndex, label] of hiddenColumns) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'column-show-button';
        button.textContent = label + ' 보이기';
        button.setAttribute('aria-label', label + ' 칼럼 보이기');
        button.addEventListener('click', () => {
          hiddenColumns.delete(columnIndex);
          setColumnVisibility(table, columnIndex, true);
          renderColumnControls(table, controls, hiddenColumns);
        });
        controls.appendChild(button);
      }
    }

    function setupColumnHiding(table) {
      const headerCells = Array.from(table.querySelectorAll('thead th'));
      const controls = document.createElement('div');
      const hiddenColumns = new Map();
      controls.className = 'column-controls';
      controls.setAttribute('aria-live', 'polite');
      table.parentElement.before(controls);

      headerCells.forEach((headerCell, columnIndex) => {
        const label = headerCell.textContent.trim();
        const labelSpan = document.createElement('span');
        const hideButton = document.createElement('button');
        const wrapper = document.createElement('span');

        labelSpan.textContent = label;
        hideButton.type = 'button';
        hideButton.className = 'column-hide-button';
        hideButton.textContent = '숨김';
        hideButton.setAttribute('aria-label', label + ' 칼럼 숨기기');
        wrapper.className = 'th-content';
        wrapper.append(labelSpan, hideButton);

        headerCell.textContent = '';
        headerCell.appendChild(wrapper);

        hideButton.addEventListener('click', () => {
          hiddenColumns.set(columnIndex, label);
          setColumnVisibility(table, columnIndex, false);
          renderColumnControls(table, controls, hiddenColumns);
        });
      });

      renderColumnControls(table, controls, hiddenColumns);
    }

    function applyFilters() {
      const query = search.value.trim().toLowerCase();
      let visible = 0;

      for (const row of rows) {
        const statusMatch = activeStatus === 'all' || row.dataset.status === activeStatus;
        const searchMatch = query.length === 0 || row.dataset.search.includes(query);
        const show = statusMatch && searchMatch;
        row.hidden = !show;
        if (show) visible += 1;
      }

      visibleCount.textContent = visible;
    }

    search.addEventListener('input', applyFilters);
    for (const filter of filters) {
      filter.addEventListener('click', () => {
        activeStatus = filter.dataset.status;
        for (const item of filters) {
          item.setAttribute('aria-pressed', String(item === filter));
        }
        applyFilters();
      });
    }

    for (const table of document.querySelectorAll('table')) {
      setupColumnHiding(table);
    }
  </script>
</body>
</html>
`;
}

const markdown = fs.readFileSync(sourcePath, 'utf8');
const rows = parseParityMarkdown(markdown);
validateRows(rows);

fs.writeFileSync(outputPath, renderHtml(rows));

console.log(
  `${path.relative(root, outputPath)}: ${rows.checklist.length} checklist rows, ${rows.mossyOnly.length} mossy-only rows`
);
