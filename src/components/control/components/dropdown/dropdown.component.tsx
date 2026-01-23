import type { QuestionChoice, Size } from '../../types';
import { useState, useRef, useMemo, useEffect } from 'react';
import { useBoolean, useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { ChevronDown, Search } from 'lucide-react';
import clsx from 'clsx';
import { Control } from '../../../../main';
import { clickHasNode } from '../../utils/utils';
import { Converter } from '../../../../utils/converter/converter';
import cn from './dropdown.module.css';

export interface DropdownProps {
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

export const Dropdown = (props: DropdownProps) => {
  const { choices = [], value = [], isSearchHidden = false, multiple = false, onChange, onOpen, onClose } = props;
  const label = props.label || '';
  const placeholder = props.placeholder || 'Wählen Sie Ihre private Krankenversicherung...';
  const noResult = props.noResult || 'Keine Versicherung gefunden.';
  const closeButton = props.closeButton || 'Schließen';

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
    <div className={cn.Dropdown}>
      <Control.Box ref={borderRef} onClick={toggleDropdown}>
        <div className={cn.DropdownBorder}>
          <div className={cn.DropdownContent}>
            <Control.Label position="active">{label}</Control.Label>
            <Control.RadioText size="lg" checked oneLine>
              {Converter.Answer.FromArrayToMultiple(selectedChoices.map(({ label }) => label)) || placeholder}
            </Control.RadioText>
          </div>
          <div className={cn.DropdownChevronWrap}>
            <ChevronDown data-open={isOpen} className={cn.DropdownChevron} />
          </div>
        </div>
      </Control.Box>
      <Control.Box ref={boxRef} className={isOpen ? cn.DropdownBoxVisible : cn.DropdownBoxHidden}>
        <div className={cn.DropdownBox}>
          <div className={clsx(cn.DropdownSearch, isSearchHidden ? cn.DropdownSearchHidden : cn.DropdownSearchVisible)}>
            <input
              ref={inputRef}
              value={search}
              type="text"
              className={cn.DropdownInput}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className={cn.DropdownGlass} />
          </div>
          <ul className={cn.DropdownChoices}>
            {visibleChoices.length ? (
              visibleChoices.map(({ value, label }, i) => (
                <li
                  key={value + i}
                  className={cn.DropdownChoice}
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
                    <Control.Choice
                      type="checkbox"
                      checked={selectedChoices.some((selectedChoice) => selectedChoice.value === value)}
                    />
                  )}
                  <Control.RadioText size="lg" checked={false}>
                    {label}
                  </Control.RadioText>
                </li>
              ))
            ) : (
              <li className={clsx(cn.DropdownChoice, cn.DropdownChoiceNoResult)}>
                <Control.RadioText size="lg" checked={false}>
                  {noResult}
                </Control.RadioText>
              </li>
            )}
          </ul>
          {multiple && (
            <div className={cn.DropdownClose}>
              <Control.Button color="primary" size="sm" type="button" onClick={() => onCloseButtonClick()}>
                {closeButton}
              </Control.Button>
            </div>
          )}
        </div>
      </Control.Box>
    </div>
  );
};
