import type { QuestionChoice, Size } from '../../types';
import type { DropdownProps } from './dropdown.types';
import { useState, useRef, useMemo, useEffect } from 'react';
import { useBoolean, useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { ChevronDown, Search } from 'lucide-react';
import clsx from 'clsx';
import { Control } from '../../index';
import { clickHasNode } from '../../utils';
import { Converter } from '../../../../utils/converter';
import './dropdown.css';

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
    <div className="control-dropdown">
      <Control.Box ref={borderRef} onClick={toggleDropdown}>
        <div className="control-dropdown__border">
          <div className="control-dropdown__content">
            <Control.Label position="active">{label}</Control.Label>
            <Control.RadioText size="lg" checked oneLine>
              {Converter.Answer.FromArrayToMultiple(selectedChoices.map(({ label }) => label)) || placeholder}
            </Control.RadioText>
          </div>
          <div className="control-dropdown__chevron-wrap">
            <ChevronDown data-open={isOpen} className="control-dropdown__chevron" />
          </div>
        </div>
      </Control.Box>
      <Control.Box ref={boxRef} className={isOpen ? 'control-dropdown__box--visible' : 'control-dropdown__box--hidden'}>
        <div className="control-dropdown__box">
          <div
            className={clsx(
              'control-dropdown__search',
              isSearchHidden ? 'control-dropdown__search--hidden' : 'control-dropdown__search--visible',
            )}
          >
            <input
              ref={inputRef}
              value={search}
              type="text"
              className="control-dropdown__input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="control-dropdown__glass" />
          </div>
          <ul className="control-dropdown__choices">
            {visibleChoices.length ? (
              visibleChoices.map(({ value, label }, i) => (
                <li
                  key={value + i}
                  className="control-dropdown__choice"
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
              <li className="control-dropdown__choice control-dropdown__choice--no-result">
                <Control.RadioText size="lg" checked={false}>
                  {noResult}
                </Control.RadioText>
              </li>
            )}
          </ul>
          {multiple && (
            <div className="control-dropdown__close">
              <Control.Button color="next" size="sm" type="button" onClick={() => onCloseButtonClick()}>
                {closeButton}
              </Control.Button>
            </div>
          )}
        </div>
      </Control.Box>
    </div>
  );
};
