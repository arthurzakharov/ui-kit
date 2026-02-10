import type { BaseProps } from '@utils/types';

interface TableRow {
  key: string;
  value: string;
}

export interface NotFoundProps extends BaseProps {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: TableRow[];
}
