import { Fragment, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Control } from '@components/control/control.component';
import type { BaseProps } from '@utils/types';
import cn from '@components/accordion-table/accordion-table.module.css';

type TableRow = string[];

type TableSection = {
  title: string;
  rows: TableRow[];
};

type Table = {
  head: string[];
  body: TableSection[];
};

export interface AccordionTableProps extends BaseProps {
  table: Table;
  active: number;
  onClick: (active: number) => void;
}

export const AccordionTable = ({ table, active = 0, onClick, className = '' }: AccordionTableProps) => {
  const [activeSection, setActiveSection] = useState<string>(table.body[active].title);

  const getActiveSection = (activeSection: string) => {
    const tableSection = table.body.find((tableSection) => tableSection.title === activeSection);
    return tableSection ? tableSection.rows : [];
  };

  useEffect(() => {
    const active = table.body.findIndex((section) => section.title === activeSection);
    if (active >= 0) {
      onClick(active);
    }
  }, [activeSection, table, onClick]);

  return (
    <table className={clsx(cn.AccordionTable, className)}>
      <thead>
        <tr>
          {table.head.map((th, headIndex) => (
            <th key={headIndex} className={cn.AccordionTableHeadCell} dangerouslySetInnerHTML={{ __html: th }} />
          ))}
        </tr>
      </thead>
      <tbody>
        {table.body.map((tr, sectionIndex) => (
          <Fragment key={sectionIndex}>
            <tr className={cn.AccordionTableBodyRow}>
              <td colSpan={table.head.length} className={clsx(cn.AccordionTableBodyCell, cn.AccordionTableBodyHead)}>
                <Control.ButtonText
                  size="md"
                  weight="regular"
                  color="theme-primary"
                  iconPosition="right"
                  icon={
                    <ChevronDown
                      size={24}
                      className={clsx(
                        cn.AccordionTableIcon,
                        activeSection === tr.title ? cn.AccordionTableIconOpened : cn.AccordionTableIconClosed,
                      )}
                    />
                  }
                  onClick={() => setActiveSection(tr.title !== activeSection ? tr.title : '')}
                >
                  {tr.title}
                </Control.ButtonText>
              </td>
            </tr>
            {tr.title === activeSection &&
              getActiveSection(activeSection).map((row, rowIndex) => (
                <tr key={`tr-${rowIndex}`}>
                  {row.map((td, cellIndex) => (
                    <td key={`tr-${rowIndex}-${cellIndex}`} className={cn.AccordionTableBodyCell}>
                      {td}
                    </td>
                  ))}
                </tr>
              ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
