import type { BaseProps } from '../../utils/types';

export interface NotFoundProps extends BaseProps {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: {
    key: string;
    value: string;
  }[];
}
