import { Fragment, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Animation } from '@components/animation/animation.component';
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
  active?: number;
  onClick?: (active: number) => void;
}

export const AccordionTable = ({ table, active, onClick, className = '' }: AccordionTableProps) => {
  const getNormalizedActive = (sectionIndex: number, bodyLength: number) => {
    return sectionIndex >= 0 && sectionIndex < bodyLength ? sectionIndex : null;
  };

  const [uncontrolledActiveSectionIndex, setUncontrolledActiveSectionIndex] = useState(
    getNormalizedActive(active ?? 0, table.body.length),
  );

  const isControlled = active !== undefined;

  const activeSectionIndex = getNormalizedActive(
    isControlled ? active : (uncontrolledActiveSectionIndex ?? -1),
    table.body.length,
  );

  const onSectionClick = (sectionIndex: number) => {
    const nextActiveSectionIndex = sectionIndex !== activeSectionIndex ? sectionIndex : null;
    if (!isControlled) {
      setUncontrolledActiveSectionIndex(nextActiveSectionIndex);
    }

    if (nextActiveSectionIndex !== null && onClick) {
      onClick(nextActiveSectionIndex);
    }
  };

  return (
    <table className={clsx(cn.AccordionTable, className)}>
      <thead>
        <tr>
          {table.head.map((th, headIndex) => (
            <th
              key={`${th}-${headIndex}`}
              className={cn.AccordionTableHeadCell}
              dangerouslySetInnerHTML={{ __html: th }}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {table.body.map((tr, sectionIndex) => (
          <Fragment key={`${tr.title}-${sectionIndex}`}>
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
                        activeSectionIndex === sectionIndex ? cn.AccordionTableIconOpened : cn.AccordionTableIconClosed,
                      )}
                    />
                  }
                  onClick={() => onSectionClick(sectionIndex)}
                >
                  {tr.title}
                </Control.ButtonText>
              </td>
            </tr>
            <Animation.FadeGrow name="visible-section" condition={activeSectionIndex === sectionIndex} duration={0.5}>
              {tr.rows.map((row, rowIndex) => (
                <tr key={`tr-${sectionIndex}-${rowIndex}`}>
                  {row.map((td, cellIndex) => (
                    <td key={`tr-${sectionIndex}-${rowIndex}-${cellIndex}`} className={cn.AccordionTableBodyCell}>
                      {td}
                    </td>
                  ))}
                </tr>
              ))}
            </Animation.FadeGrow>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
