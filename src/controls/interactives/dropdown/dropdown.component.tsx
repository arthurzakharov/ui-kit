import { useState, useRef, useMemo, useEffect } from 'react';
import { useBoolean, useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { ChevronDown, Search } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@controls/buttons';
import { Box, Caption, Choice, Label } from '@controls/primitives';
import { clickHasNode, type QuestionChoice, type Size } from '@controls/utils';
import { Converter } from '@utils/converter';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/interactives/dropdown/dropdown.module.css';

export interface DropdownProps extends Base {
  choices: QuestionChoice[];
  value: QuestionChoice[];
  label?: string;
  placeholder?: string;
  noResult?: string;
  isSearchHidden?: boolean;
  multiple?: boolean;
  closeButton?: string;
  onChange: (values: QuestionChoice[]) => void;
  onOpen?: (height: number, width: number) => void;
  onClose?: () => void;
}

export const Dropdown = ({
  choices = [],
  value = [],
  label = '',
  placeholder = 'Wählen Sie Ihre private Krankenversicherung...',
  noResult = 'Keine Versicherung gefunden.',
  isSearchHidden = false,
  multiple = false,
  closeButton = 'Schließen',
  onChange,
  onOpen,
  onClose,
  // Base props
  ...base
}: DropdownProps) => {
  const borderRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { value: isOpen, setFalse: closeDropdown, toggle: toggleDropdown } = useBoolean(false);
  const [search, setSearch] = useState<string>('');
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [selectedChoices, setSelectedChoices] = useState<QuestionChoice[]>([]);

  useResizeObserver({
    ref: boxRef,
    onResize: (e) => setSize({ width: e.width || 0, height: e.height || 0 }),
  });

  useOnClickOutside(boxRef, (e) => {
    if (clickHasNode(e, borderRef)) return;
    if (multiple) onChange(selectedChoices);
    closeDropdown();
  });

  useEffect(() => setSelectedChoices(Array.isArray(value) ? value : []), [value]);

  useEffect(() => {
    if (isOpen && size.width && size.height) {
      inputRef.current?.focus();
      onOpen?.call(null, size.height, size.width);
    } else {
      onClose?.call(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, size]);

  const handleSelection = (newValue: string, newLabel: string) => {
    setSelectedChoices((prev) => {
      const exists = prev.some(({ value }) => value === newValue);
      return exists ? prev.filter(({ value }) => value !== newValue) : [...prev, { value: newValue, label: newLabel }];
    });
  };

  const onCloseButtonClick = () => {
    closeDropdown();
    onChange(selectedChoices);
  };

  const visibleChoices = useMemo(
    () => choices.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase())),
    [search, choices],
  );

  return (
    <div
      data-testid={baseProps(base, 'data-testid', 'dropdown')}
      className={clsx(cn.Dropdown, baseProps(base, 'className'))}
    >
      <Box ref={borderRef} onClick={toggleDropdown}>
        <div className={cn.Border}>
          <div className={cn.Content}>
            <Label text={label} position="active" />
            <Caption
              text={Converter.Answer.FromArrayToMultiple(selectedChoices.map(({ label }) => label)) || placeholder}
              size="body"
              checked
              oneLine
            />
          </div>
          <div className={cn.ChevronWrap}>
            <ChevronDown data-open={isOpen} className={cn.Chevron} />
          </div>
        </div>
      </Box>
      <Box ref={boxRef} className={isOpen ? cn.BoxVisible : cn.BoxHidden}>
        <div className={cn.Box}>
          <div className={clsx(cn.Search, isSearchHidden ? cn.SearchHidden : cn.SearchVisible)}>
            <input
              ref={inputRef}
              value={search}
              type="text"
              className={cn.Input}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className={cn.Glass} />
          </div>
          <ul className={cn.Choices}>
            {visibleChoices.length ? (
              visibleChoices.map(({ value, label }, i) => (
                <li
                  key={value + i}
                  className={cn.Choice}
                  onClick={() => {
                    if (multiple) {
                      handleSelection(value, label);
                    } else {
                      closeDropdown();
                      onChange([{ value, label }]);
                    }
                  }}
                >
                  {multiple && (
                    <Choice
                      type="checkbox"
                      checked={selectedChoices.some((selectedChoice) => selectedChoice.value === value)}
                    />
                  )}
                  <Caption text={label} size="body" checked={false} />
                </li>
              ))
            ) : (
              <li className={clsx(cn.Choice, cn.ChoiceNoResult)}>
                <Caption text={noResult} size="body" checked={false} />
              </li>
            )}
          </ul>
          {multiple && (
            <div className={cn.Close}>
              <Button color="primary" size="sm" type="button" onClick={() => onCloseButtonClick()}>
                {closeButton}
              </Button>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
};
