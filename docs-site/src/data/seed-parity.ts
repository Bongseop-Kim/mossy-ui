import rawData from './seed-parity.json';

export const statusValues = ['완료', '부분완료', '미구현', '제약', 'Mossy only'] as const;

export type ParityStatus = (typeof statusValues)[number];

export interface ChecklistRow {
  seed: string;
  seedProps: string;
  mossy: string;
  mossyProps: string;
  status: ParityStatus;
  propStatus: string;
  next: string;
  note: string;
}

export interface MossyOnlyRow {
  component: string;
  props: string;
  reason: string;
  status: 'Mossy only';
}

export interface PropStatusItem {
  target: string;
  status: ParityStatus | '';
  note: string;
}

export interface ComponentPage {
  name: string;
  slug: string;
  rootRow: ChecklistRow;
  rows: ChecklistRow[];
  status: ParityStatus;
  progress: {
    done: number;
    total: number;
  };
}

export const checklistRows = rawData.checklist as ChecklistRow[];
export const mossyOnlyRows = rawData.mossyOnly as MossyOnlyRow[];

export function plainInlineCode(value: string) {
  return value.replace(/^`(.+)`$/, '$1');
}

export function componentName(row: ChecklistRow) {
  return plainInlineCode(row.seed);
}

export function componentRootName(row: ChecklistRow) {
  return componentName(row).split('.')[0];
}

export function slugifyComponent(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

export function splitPropStatus(value: string): PropStatusItem[] {
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

      const status = match[2].trim();

      return {
        target: match[1].trim(),
        status: statusValues.includes(status as ParityStatus) ? (status as ParityStatus) : '',
        note: match[3].trim(),
      };
    });
}

export function propStatusProgress(value: string) {
  const parityItems = splitPropStatus(value).filter((item) => item.status !== 'Mossy only');

  return {
    done: parityItems.filter((item) => item.status === '완료').length,
    total: parityItems.length,
  };
}

export function rowKind(row: ChecklistRow) {
  const name = componentName(row);
  const isCompoundParent =
    row.seedProps.includes('namespace:') || row.note.includes('compound namespace');
  const isPart = !isCompoundParent && name.includes('.');

  return isCompoundParent ? 'compound-parent' : isPart ? 'compound-part' : 'leaf';
}

export function rowPartName(row: ChecklistRow) {
  const name = componentName(row);
  const parts = name.split('.');

  return parts.length > 1 ? parts.slice(1).join('.') : 'Root';
}

export function hasMossyMatch(row: ChecklistRow) {
  return row.mossy.trim() !== '' && row.mossy.trim() !== '-';
}

export function markdownInlineToHtml(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function statusCounts(rows: Array<{ status: ParityStatus }>) {
  return Object.fromEntries(
    statusValues.map((status) => [status, rows.filter((row) => row.status === status).length])
  ) as Record<ParityStatus, number>;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function pageProgress(rows: ChecklistRow[]) {
  return rows.reduce(
    (acc, row) => {
      const progress = propStatusProgress(row.propStatus);
      acc.done += progress.done;
      acc.total += progress.total;
      return acc;
    },
    { done: 0, total: 0 }
  );
}

const groupedRows = new Map<string, ChecklistRow[]>();

for (const row of checklistRows) {
  const rootName = componentRootName(row);
  const rows = groupedRows.get(rootName) ?? [];
  rows.push(row);
  groupedRows.set(rootName, rows);
}

export const componentPages: ComponentPage[] = Array.from(groupedRows.entries())
  .map(([name, rows]) => {
    const rootRow = rows.find((row) => componentName(row) === name) ?? rows[0];

    return {
      name,
      slug: slugifyComponent(name),
      rootRow,
      rows,
      status: rootRow.status,
      progress: pageProgress(rows),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const componentSidebar = [
  { label: 'Home', link: '/' },
  { label: 'Components', link: '/components/' },
  {
    label: 'Component Pages',
    collapsed: false,
    items: componentPages.map((page) => ({
      label: page.name,
      link: `/components/${page.slug}/`,
      badge: page.status,
    })),
  },
];
