import { Fragment, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Control } from '@components/control/control.component';
import cn from '@components/accordion-table/accordion-table.module.css';

type TableRow = string[];

type TableSection = {
  title: string;
  rows: TableRow[];
};

export interface AccordionTableProps {
  table: {
    head?: string[];
    body?: TableSection[];
  };
  activeSectionIndex?: number;
  onActiveSectionChange?: (activeSectionIndex: number) => void;
}

export const AccordionTable = (props: AccordionTableProps) => {
  const {
    table: { head = [], body = [] },
    activeSectionIndex = 0,
    onActiveSectionChange,
  } = props;
  const [activeSection, setActiveSection] = useState<string>(body[activeSectionIndex].title);

  const onBodyHeadClick = (row: string): void => {
    setActiveSection(row !== activeSection ? row : '');
  };

  const getActiveSection = (body: TableSection[], activeSection: string): TableRow[] => {
    const tableSection = body.find((tableSection: TableSection) => tableSection.title === activeSection);
    return tableSection ? tableSection.rows : [];
  };

  const printSectionRows = (title: string, activeSection: string) => {
    return title === activeSection
      ? getActiveSection(body, activeSection).map((row: TableRow, rowIndex: number) => (
          <tr key={`tr-${rowIndex}`}>
            {row.map((td: string, cellIndex: number) => (
              <td key={`tr-${rowIndex}-${cellIndex}`} className={cn.AccordionTableBodyCell}>
                {td}
              </td>
            ))}
          </tr>
        ))
      : null;
  };

  useEffect(() => {
    const activeSectionIndex = body.findIndex((section: TableSection): boolean => section.title === activeSection);
    if (activeSectionIndex >= 0 && onActiveSectionChange) {
      onActiveSectionChange(activeSectionIndex);
    }
  }, [activeSection, body, onActiveSectionChange]);

  return (
    <table id="accordion-table" className={cn.AccordionTable}>
      <thead>
        <tr>
          {head.map((th: string, headIndex: number) => (
            <th key={headIndex} className={cn.AccordionTableHeadCell} dangerouslySetInnerHTML={{ __html: th }} />
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((tr: TableSection, sectionIndex: number) => (
          <Fragment key={sectionIndex}>
            <tr className={cn.AccordionTableBodyRow}>
              <td colSpan={head.length} className={clsx(cn.AccordionTableBodyCell, cn.AccordionTableBodyHead)}>
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
                  onClick={() => onBodyHeadClick(tr.title)}
                >
                  {tr.title}
                </Control.ButtonText>
              </td>
            </tr>
            {printSectionRows(tr.title, activeSection)}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
