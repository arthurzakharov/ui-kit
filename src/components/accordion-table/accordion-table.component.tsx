import { Fragment, type CSSProperties, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Animation } from '@animations/animation.component';
import { ControlButtonText } from '@controls/control-button-text';
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

/**
 * Is a flexible table component with expandable sections. It renders a table header and a list of collapsible body sections, where each section can be toggled to reveal its rows with smooth animations.<br>
 * The component supports a default active section d and dynamically adapts its column layout based on the provided header configuration.
 */
export const AccordionTable = ({ table, active = 0, className = '' }: AccordionTableProps) => {
  const [activeSection, setActiveSection] = useState(active >= 0 && active < table.body.length ? active : null);

  return (
    <div
      data-testid="accordion-table"
      className={clsx(cn.AccordionTable, className)}
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
                  preventDefault
                  blurAfterClick
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
                </ControlButtonText>
              </div>
            </div>
            <Animation.FadeGrow name={`visible-section-${sectionIndex}`} condition={activeSection === sectionIndex}>
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
            </Animation.FadeGrow>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
