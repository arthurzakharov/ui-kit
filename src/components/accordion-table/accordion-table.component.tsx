import { Fragment, type CSSProperties, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Animation } from '@animations/animation.component';
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
}

export const AccordionTable = ({ table, active = 0, className = '' }: AccordionTableProps) => {
  const [activeSection, setActiveSection] = useState(active >= 0 && active < table.body.length ? active : null);

  return (
    <div
      className={clsx(cn.AccordionTable, className)}
      style={{ '--accordion-columns': Math.max(table.head.length, 1) } as CSSProperties}
    >
      <div className={cn.Head}>
        <div className={cn.HeadRow}>
          {table.head.map((th) => (
            <div key={th} className={cn.HeadCell} dangerouslySetInnerHTML={{ __html: th }} />
          ))}
        </div>
      </div>
      <div>
        {table.body.map((tr, sectionIndex) => (
          <Fragment key={`${tr.title}-${sectionIndex}`}>
            <div className={cn.BodyRow}>
              <div className={clsx(cn.BodyCell, cn.BodyHead, cn.BodyHeadCell)}>
                <Control.ButtonText
                  size="md"
                  weight="regular"
                  color="theme-primary"
                  iconPosition="right"
                  icon={
                    <Animation.Rotate
                      name="rotate-icon"
                      condition={activeSection === sectionIndex}
                      from="top"
                      to="bottom"
                    >
                      <ChevronDown size={24} />
                    </Animation.Rotate>
                  }
                  onClick={() => setActiveSection((prevState) => (sectionIndex !== prevState ? sectionIndex : null))}
                >
                  {tr.title}
                </Control.ButtonText>
              </div>
            </div>
            <Animation.FadeGrow name="visible-section" condition={activeSection === sectionIndex}>
              {tr.rows.map((row, rowIndex) => (
                <div key={`tr-${sectionIndex}-${rowIndex}`} className={cn.DataRow}>
                  {row.map((td, cellIndex) => (
                    <div key={`tr-${sectionIndex}-${rowIndex}-${cellIndex}`} className={cn.BodyCell}>
                      {td}
                    </div>
                  ))}
                </div>
              ))}
            </Animation.FadeGrow>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
