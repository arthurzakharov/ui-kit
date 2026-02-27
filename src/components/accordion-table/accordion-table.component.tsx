import { Fragment, type CSSProperties, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { AnimationFadeGrow } from '@animations/animation-fade-grow';
import { AnimationRotate } from '@animations/animation-rotate';
import { ControlButtonText } from '@controls/control-button-text';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@components/accordion-table/accordion-table.module.css';

type TableSection = {
  title: string;
  rows: string[][];
};

type Table = {
  head: string[];
  body: TableSection[];
};

export interface AccordionTableProps extends Base {
  table: Table;
  active?: number;
}

export const AccordionTable = ({ table, active = 0, ...base }: AccordionTableProps) => {
  const [activeSection, setActiveSection] = useState(active >= 0 && active < table.body.length ? active : null);

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'accordion-table')}
      className={clsx(cn.AccordionTable, baseProps(base, 'className'))}
      style={{ '--accordion-columns': Math.max(table.head.length, 1) } as CSSProperties}
    >
      <div data-testid="accordion-table-head" className={cn.Head}>
        <div className={cn.HeadRow}>
          {table.head.map((th, index) => (
            <div
              key={th}
              className={cn.HeadCell}
              data-testid={`accordion-table-head-cell-${index}`}
              dangerouslySetInnerHTML={{ __html: th }}
            />
          ))}
        </div>
      </div>
      <div>
        {table.body.map((tr, sectionIndex) => (
          <Fragment key={`${tr.title}-${sectionIndex}`}>
            <div className={cn.BodyRow}>
              <div className={clsx(cn.BodyCell, cn.BodyHead, cn.BodyHeadCell)}>
                <ControlButtonText
                  data-testid={`accordion-table-button-${sectionIndex}`}
                  preventDefault
                  blurAfterClick
                  size="md"
                  weight="regular"
                  color="theme-primary"
                  iconPosition="right"
                  icon={
                    <AnimationRotate
                      name="rotate-icon"
                      condition={activeSection === sectionIndex}
                      from="top"
                      to="bottom"
                    >
                      <ChevronDown size={24} />
                    </AnimationRotate>
                  }
                  onClick={() => setActiveSection((prevState) => (sectionIndex !== prevState ? sectionIndex : null))}
                >
                  {tr.title}
                </ControlButtonText>
              </div>
            </div>
            <AnimationFadeGrow name={`visible-section-${sectionIndex}`} condition={activeSection === sectionIndex}>
              <div data-testid={`accordion-table-section-content-${sectionIndex}`}>
                {tr.rows.map((row, rowIndex) => (
                  <div
                    key={`tr-${sectionIndex}-${rowIndex}`}
                    className={cn.DataRow}
                    data-testid={`accordion-table-data-row-${sectionIndex}-${rowIndex}`}
                  >
                    {row.map((td, cellIndex) => (
                      <div key={`tr-${sectionIndex}-${rowIndex}-${cellIndex}`} className={cn.BodyCell}>
                        {td}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </AnimationFadeGrow>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
