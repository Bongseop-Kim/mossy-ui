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

function splitPropStatus(value) {
  return value
    .split(' / ')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const match = item.match(/^(.+?):\s*([^—]+?)\s*—\s*(.+)$/);

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
        note: match[3].trim(),
      };
    });
}

function renderPropStatusDetails(value) {
  const items = splitPropStatus(value);

  if (items.length === 0) {
    return '-';
  }

  const progress = propStatusProgress(value);
  const missingCount = items.filter((item) => item.status === '미구현').length;
  const blockedCount = items.filter((item) => item.status === '제약').length;
  const partialCount = items.filter((item) => item.status === '부분완료').length;
  const summaryParts = [];

  if (progress.total > 0) {
    summaryParts.push(`완료 ${progress.done}/${progress.total}`);
  }

  if (missingCount > 0) {
    summaryParts.push(`미구현 ${missingCount}`);
  }

  if (blockedCount > 0) {
    summaryParts.push(`제약 ${blockedCount}`);
  }

  if (partialCount > 0) {
    summaryParts.push(`부분 ${partialCount}`);
  }

  const summary = summaryParts.length > 0 ? summaryParts.join(' · ') : `${items.length}개 prop 상태`;

  return `<details class="prop-status-details">
                <summary>${escapeHtml(summary)}</summary>
                <table class="prop-status-table">
                  <thead>
                    <tr>
                      <th>Prop/Part</th>
                      <th>상태</th>
                      <th>메모</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items.map((item) => `<tr>
                      <td>${inlineMarkdown(item.target)}</td>
                      <td>${item.status ? `<span class="status ${statusClass[item.status] ?? ''}">${escapeHtml(item.status)}</span>` : '-'}</td>
                      <td>${item.note ? inlineMarkdown(item.note) : '-'}</td>
                    </tr>`).join('\n                    ')}
                  </tbody>
                </table>
              </details>`;
}

function propStatusProgress(value) {
  const parityItems = splitPropStatus(value).filter(
    (item) => item.status !== 'Mossy only'
  );

  return {
    done: parityItems.filter((item) => item.status === '완료').length,
    total: parityItems.length,
  };
}

function renderComponentStatus(row) {
  const progress = propStatusProgress(row.propStatus);
  const progressText =
    progress.total > 0 ? `완료 ${progress.done}/${progress.total}` : '';

  return `<span class="status ${statusClass[row.status]}">${escapeHtml(row.status)}${progressText ? `<span class="prop-count">${escapeHtml(progressText)}</span>` : ''}</span>`;
}

function rowMeta(row) {
  const mossy = row.mossy.trim();
  const hierarchy = componentHierarchy(row);

  return {
    ...hierarchy,
    isCompound: hierarchy.isCompoundParent || hierarchy.isPart,
    hasMossyMatch: mossy !== '' && mossy !== '-',
  };
}

function plainInlineCode(value) {
  return value.replace(/^`(.+)`$/, '$1');
}

function componentHierarchy(row) {
  const component = plainInlineCode(row.seed);
  const parts = component.split('.');
  const isCompoundParent =
    row.seedProps.includes('namespace:') ||
    row.note.includes('compound namespace');
  const isPart = !isCompoundParent && parts.length > 1;

  return {
    component,
    depth: isPart ? parts.length - 1 : 0,
    isCompoundParent,
    isPart,
    parent: isPart ? parts.slice(0, -1).join('.') : '',
    part: isPart ? parts.at(-1) : component,
    rowKind: isCompoundParent ? 'compound-parent' : isPart ? 'compound-part' : 'leaf',
  };
}

function renderComponentCell(row) {
  const meta = rowMeta(row);

  if (meta.isPart) {
    return `<span class="component-name component-part" style="--part-depth: ${meta.depth}">
                <span class="part-parent">${escapeHtml(meta.parent)}</span>
                <code>${escapeHtml(meta.part)}</code>
              </span>`;
  }

    if (meta.isCompoundParent) {
      return `<span class="component-name component-parent-row">
                <code>${escapeHtml(row.seed)}</code>
              </span>`;
    }

  return inlineMarkdown(row.seed);
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
        propStatus: cells.length >= 8 ? cells[5] : '',
        next: cells.length >= 8 ? cells[6] : cells[5],
        note: cells.length >= 8 ? cells[7] : cells[6],
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
      --bg: #f7f8fa;
      --ink: #1d2329;
      --muted: #65717d;
      --line: #d8dee6;
      --panel: #ffffff;
      --panel-2: #eef2f6;
      --panel-3: #f5f7f9;
      --accent: #16705f;
      --accent-ink: #0c4a40;
      --done-bg: #dcf5e8;
      --done-ink: #11613d;
      --partial-bg: #ece6ff;
      --partial-ink: #5940a5;
      --missing-bg: #ffe3df;
      --missing-ink: #9a3328;
      --blocked-bg: #f7e7bd;
      --blocked-ink: #775313;
      --mossy-only-bg: #e0ecff;
      --mossy-only-ink: #23518c;
      --shadow: 0 10px 28px rgba(31, 42, 55, 0.08);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
      font-size: clamp(2rem, 3.5vw, 4.2rem);
      line-height: 1;
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
      background: var(--panel);
      color: var(--ink);
      padding: 12px 14px;
      box-shadow: var(--shadow);
      text-align: left;
    }

    button.count {
      cursor: pointer;
    }

    button.count:hover {
      border-color: var(--accent);
    }

    button.count[aria-pressed="true"] {
      border-color: var(--accent-ink);
      box-shadow: 0 0 0 3px rgba(22, 112, 95, 0.14);
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
      grid-template-columns: minmax(240px, 1fr) auto;
      gap: 14px;
      margin: 22px 0;
      padding: 14px;
      border: 1px solid var(--line);
      background: rgba(247, 248, 250, 0.94);
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

    .filters,
    .quick-filters {
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
      background: #e4f3ef;
      color: var(--accent-ink);
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
      min-width: 1320px;
    }

    caption {
      padding: 10px 14px;
      color: var(--muted);
      background: var(--panel-3);
      border-bottom: 1px solid var(--line);
      font: 0.82rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      text-align: left;
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
      background: #26313d;
      color: #ffffff;
      border-bottom: 2px solid #26313d;
      font: 0.82rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      line-height: 1.25;
      white-space: nowrap;
    }

    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
    }

    th:first-child {
      z-index: 3;
    }

    td:first-child {
      z-index: 1;
      background: var(--panel);
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

    .column-hide-button:focus-visible {
      outline: 3px solid rgba(255, 253, 248, 0.32);
      outline-offset: 2px;
    }

    .column-show-button:focus-visible {
      outline: 3px solid rgba(22, 112, 95, 0.26);
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
      min-width: 180px;
      font-weight: 700;
      font-size: 1rem;
    }

    .component-name {
      display: inline-flex;
      min-width: 0;
      max-width: 100%;
      gap: 7px;
      align-items: center;
    }

    .component-parent-row {
      flex-wrap: wrap;
    }

    .component-part {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 4px;
      padding-left: calc(var(--part-depth, 1) * 16px);
    }

    .component-part::before {
      content: "";
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: calc((var(--part-depth, 1) - 1) * 16px + 4px);
      width: 1px;
      background: var(--line);
    }

    .part-parent {
      color: var(--muted);
      font: 0.72rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow-wrap: anywhere;
    }

    .seed-props { min-width: 360px; }
    .mossy { min-width: 150px; }
    .mossy-props { min-width: 320px; }
    .props-status { min-width: 260px; }
    .next-action { min-width: 340px; }
    .note { min-width: 280px; }

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

    .status .prop-count {
      margin-left: 7px;
      padding-left: 7px;
      border-left: 1px solid currentColor;
      opacity: 0.74;
      white-space: nowrap;
    }

    .status.done { background: var(--done-bg); color: var(--done-ink); }
    .status.partial { background: var(--partial-bg); color: var(--partial-ink); }
    .status.missing { background: var(--missing-bg); color: var(--missing-ink); }
    .status.blocked { background: var(--blocked-bg); color: var(--blocked-ink); }
    .status.mossy-only { background: var(--mossy-only-bg); color: var(--mossy-only-ink); }

    .prop-status-details summary {
      width: max-content;
      max-width: 100%;
      border: 1px solid var(--line);
      background: var(--panel-2);
      color: var(--accent-ink);
      padding: 7px 9px;
      cursor: pointer;
      font: 0.78rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .prop-status-details summary:focus-visible {
      outline: 3px solid rgba(27, 127, 107, 0.28);
      outline-offset: 2px;
    }

    .prop-status-table {
      min-width: 620px;
      margin-top: 10px;
      border: 1px solid var(--line);
      background: var(--panel);
      box-shadow: none;
    }

    .prop-status-table th {
      position: static;
      background: var(--panel-2);
      color: var(--ink);
      border-bottom: 1px solid var(--line);
    }

    .prop-status-table th,
    .prop-status-table td {
      padding: 9px 10px;
      font-size: 0.86rem;
    }

    .api-table { min-width: 900px; }
    .api-table .component { width: 190px; }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @media (max-width: 900px) {
      .shell { width: min(100vw - 24px, 1580px); padding-top: 22px; }
      header { grid-template-columns: 1fr; }
      .counts { grid-template-columns: repeat(2, minmax(0, 1fr)); min-width: 0; }
      .toolbar { grid-template-columns: 1fr; }
      .filters,
      .quick-filters { justify-content: flex-start; }
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
      <div class="counts" aria-label="상태 요약 필터">
        <button class="count status-filter" type="button" data-status="all" aria-pressed="true"><strong>${total}</strong><span>Checklist total</span></button>
        <button class="count status-filter" type="button" data-status="완료" aria-pressed="false"><strong>${counts['완료']}</strong><span>완료</span></button>
        <button class="count status-filter" type="button" data-status="부분완료" aria-pressed="false"><strong>${counts['부분완료']}</strong><span>부분완료</span></button>
        <button class="count status-filter" type="button" data-status="미구현" aria-pressed="false"><strong>${counts['미구현']}</strong><span>미구현</span></button>
        <button class="count status-filter" type="button" data-status="제약" aria-pressed="false"><strong>${counts['제약']}</strong><span>제약</span></button>
        <div class="count" aria-label="Mossy only ${counts['Mossy only']}개"><strong>${counts['Mossy only']}</strong><span>Mossy only</span></div>
      </div>
    </header>

    <div class="toolbar" aria-label="표 검색과 빠른 필터">
      <input id="search" name="component-search" type="search" aria-label="컴포넌트, props, 메모 검색" placeholder="검색어 입력..." autocomplete="off">
      <div class="quick-filters" role="group" aria-label="빠른 필터">
        <button class="filter quick-filter" type="button" data-filter="compound" aria-pressed="false">컴파운드</button>
        <button class="filter quick-filter" type="button" data-filter="mossy-match" aria-pressed="false">Mossy 대응 있음</button>
        <button class="filter quick-filter" type="button" data-filter="mossy-missing" aria-pressed="false">Mossy 대응 없음</button>
      </div>
    </div>

    <section aria-labelledby="checklist-title">
      <div class="section-head">
        <h2 id="checklist-title">Seed Implementation Checklist</h2>
        <span class="result-count" aria-live="polite"><span id="visible-count">${total}</span> / ${total}</span>
      </div>
      <div class="table-wrap">
        <table class="parity-table" id="checklist-table">
          <caption>가로 스크롤로 숨겨진 열을 볼 수 있다. 기본 숨김 열은 위의 칼럼 컨트롤에서 다시 표시한다.</caption>
          <thead>
            <tr>
              <th>Seed 컴포넌트</th>
              <th>Seed props 요약</th>
              <th>Seed 대응</th>
              <th>Mossy props</th>
              <th>상태</th>
              <th>Props별 상태</th>
              <th>다음 액션</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            ${checklist.map((row) => {
              const meta = rowMeta(row);

              return `<tr class="${escapeHtml(meta.rowKind)}-row" data-status="${escapeHtml(row.status)}" data-compound="${String(meta.isCompound)}" data-mossy-match="${String(meta.hasMossyMatch)}" data-component="${escapeHtml(meta.component)}" data-parent="${escapeHtml(meta.parent)}" data-row-kind="${escapeHtml(meta.rowKind)}" data-depth="${String(meta.depth)}" data-search="${escapeHtml(`${row.seed} ${row.seedProps} ${row.mossy} ${row.mossyProps} ${row.status} ${row.propStatus} ${row.next} ${row.note}`.toLowerCase())}">
              <td class="component">${renderComponentCell(row)}</td>
              <td class="seed-props">${inlineMarkdown(row.seedProps)}</td>
              <td class="mossy">${inlineMarkdown(row.mossy)}</td>
              <td class="mossy-props">${inlineMarkdown(row.mossyProps)}</td>
              <td>${renderComponentStatus(row)}</td>
              <td class="props-status">${renderPropStatusDetails(row.propStatus)}</td>
              <td class="next-action">${inlineMarkdown(row.next)}</td>
              <td class="note">${inlineMarkdown(row.note)}</td>
            </tr>`;
            }).join('\n            ')}
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
        <table class="api-table parity-table" id="mossy-only-table">
          <caption>Mossy 전용 API 목록이다. Seed parity 대상과 별도 기준으로 관리한다.</caption>
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
    const rows = Array.from(document.querySelectorAll('#checklist-table > tbody > tr'));
    const rowByComponent = new Map(rows.map((row) => [row.dataset.component, row]));
    const childrenByParent = new Map();
    const search = document.querySelector('#search');
    const visibleCount = document.querySelector('#visible-count');
    const statusFilters = Array.from(document.querySelectorAll('.status-filter'));
    const quickFilters = Array.from(document.querySelectorAll('.quick-filter'));
    const params = new URLSearchParams(window.location.search);
    const columnStates = new Map();
    const defaultHiddenColumns = {
      'checklist-table': new Set([1, 3, 7]),
      'mossy-only-table': new Set(),
    };
    const hiddenColumnState = parseHiddenColumns(params.get('hidden'));
    let activeStatus = params.get('status') || 'all';
    const activeQuickFilters = new Set(
      (params.get('filters') || '').split(',').filter(Boolean)
    );

    if (!statusFilters.some((filter) => filter.dataset.status === activeStatus)) {
      activeStatus = 'all';
    }

    for (const row of rows) {
      const parent = row.dataset.parent;

      if (!parent) {
        continue;
      }

      if (!childrenByParent.has(parent)) {
        childrenByParent.set(parent, []);
      }

      childrenByParent.get(parent).push(row);
    }

    function setColumnVisibility(table, columnIndex, visible) {
      const rowsInTable = Array.from(table.querySelectorAll(':scope > thead > tr, :scope > tbody > tr'));

      for (const row of rowsInTable) {
        const cell = row.children[columnIndex];
        if (cell) {
          cell.hidden = !visible;
        }
      }
    }

    function parseHiddenColumns(value) {
      if (value === null) {
        return null;
      }

      const state = {};

      for (const group of value.split(';')) {
        const [tableId, columnValue = ''] = group.split(':');

        if (!tableId) {
          continue;
        }

        state[tableId] = new Set(
          columnValue
            .split(',')
            .map((item) => Number(item))
            .filter((item) => Number.isInteger(item))
        );
      }

      return state;
    }

    function serializeHiddenColumns() {
      return Array.from(columnStates.entries())
        .map(([tableId, hiddenColumns]) => {
          const columnIndexes = Array.from(hiddenColumns.keys()).sort((a, b) => a - b);
          return tableId + ':' + columnIndexes.join(',');
        })
        .join(';');
    }

    function syncUrl() {
      const nextParams = new URLSearchParams(window.location.search);
      const query = search.value.trim();
      const quickFilterValue = Array.from(activeQuickFilters).join(',');
      const hiddenValue = serializeHiddenColumns();

      if (query) {
        nextParams.set('q', query);
      } else {
        nextParams.delete('q');
      }

      if (activeStatus === 'all') {
        nextParams.delete('status');
      } else {
        nextParams.set('status', activeStatus);
      }

      if (quickFilterValue) {
        nextParams.set('filters', quickFilterValue);
      } else {
        nextParams.delete('filters');
      }

      if (hiddenValue) {
        nextParams.set('hidden', hiddenValue);
      } else {
        nextParams.delete('hidden');
      }

      const queryString = nextParams.toString();
      const nextUrl = window.location.pathname + (queryString ? '?' + queryString : '') + window.location.hash;
      window.history.replaceState(null, '', nextUrl);
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
          syncUrl();
        });
        controls.appendChild(button);
      }
    }

    function setupColumnHiding(table) {
      const headerCells = Array.from(table.querySelectorAll(':scope > thead > tr > th'));
      const controls = document.createElement('div');
      const hiddenColumns = new Map();
      const initialHiddenColumns =
        hiddenColumnState && table.id in hiddenColumnState
          ? hiddenColumnState[table.id]
          : defaultHiddenColumns[table.id] || new Set();

      controls.className = 'column-controls';
      controls.setAttribute('aria-live', 'polite');
      table.parentElement.before(controls);
      columnStates.set(table.id, hiddenColumns);

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
          syncUrl();
        });

        if (initialHiddenColumns.has(columnIndex)) {
          hiddenColumns.set(columnIndex, label);
          setColumnVisibility(table, columnIndex, false);
        }
      });

      renderColumnControls(table, controls, hiddenColumns);
    }

    function syncFilterButtons() {
      for (const filter of statusFilters) {
        filter.setAttribute('aria-pressed', String(filter.dataset.status === activeStatus));
      }

      for (const filter of quickFilters) {
        filter.setAttribute('aria-pressed', String(activeQuickFilters.has(filter.dataset.filter)));
      }
    }

    function rowMatchesQuickFilters(row) {
      if (activeQuickFilters.has('compound') && row.dataset.compound !== 'true') {
        return false;
      }

      if (activeQuickFilters.has('mossy-match') && row.dataset.mossyMatch !== 'true') {
        return false;
      }

      if (activeQuickFilters.has('mossy-missing') && row.dataset.mossyMatch !== 'false') {
        return false;
      }

      return true;
    }

    function rowMatchesActiveFilters(row, query) {
      const statusMatch = activeStatus === 'all' || row.dataset.status === activeStatus;
      const quickMatch = rowMatchesQuickFilters(row);
      const searchMatch = query.length === 0 || row.dataset.search.includes(query);

      return statusMatch && quickMatch && searchMatch;
    }

    function collectDescendants(component, targetRows) {
      for (const child of childrenByParent.get(component) || []) {
        if (targetRows.has(child)) {
          continue;
        }

        targetRows.add(child);
        collectDescendants(child.dataset.component, targetRows);
      }
    }

    function collectAncestors(row, targetRows) {
      let parent = row.dataset.parent;

      while (parent) {
        const parentRow = rowByComponent.get(parent);

        if (!parentRow || targetRows.has(parentRow)) {
          break;
        }

        targetRows.add(parentRow);
        parent = parentRow.dataset.parent;
      }
    }

    function visibleRowsForFilters(query) {
      const matchedRows = rows.filter((row) => rowMatchesActiveFilters(row, query));
      const visibleRows = new Set(matchedRows);

      for (const row of matchedRows) {
        if (row.dataset.rowKind === 'compound-parent') {
          collectDescendants(row.dataset.component, visibleRows);
        }

        if (row.dataset.parent) {
          collectAncestors(row, visibleRows);
        }
      }

      return visibleRows;
    }

    function applyFilters() {
      const query = search.value.trim().toLowerCase();
      const visibleRows = visibleRowsForFilters(query);
      let visible = 0;

      for (const row of rows) {
        const show = visibleRows.has(row);
        row.hidden = !show;
        if (show) visible += 1;
      }

      visibleCount.textContent = visible;
      visibleCount.parentElement.setAttribute('aria-label', visible + '개 행 표시 중');
      syncFilterButtons();
    }

    search.value = params.get('q') || '';
    search.addEventListener('input', () => {
      applyFilters();
      syncUrl();
    });

    for (const filter of statusFilters) {
      filter.addEventListener('click', () => {
        activeStatus = filter.dataset.status;
        applyFilters();
        syncUrl();
      });
    }

    for (const filter of quickFilters) {
      filter.addEventListener('click', () => {
        const filterName = filter.dataset.filter;

        if (filterName === 'mossy-match') {
          activeQuickFilters.delete('mossy-missing');
        }

        if (filterName === 'mossy-missing') {
          activeQuickFilters.delete('mossy-match');
        }

        if (activeQuickFilters.has(filterName)) {
          activeQuickFilters.delete(filterName);
        } else {
          activeQuickFilters.add(filterName);
        }

        applyFilters();
        syncUrl();
      });
    }

    for (const table of document.querySelectorAll('.parity-table')) {
      setupColumnHiding(table);
    }

    applyFilters();
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
