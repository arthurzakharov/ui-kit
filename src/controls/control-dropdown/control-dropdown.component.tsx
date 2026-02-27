import { useState, useRef, useMemo, useEffect } from 'react';
import { useBoolean, useOnClickOutside, useResizeObserver } from 'usehooks-ts';
import { ChevronDown, Search } from 'lucide-react';
import clsx from 'clsx';
import type { QuestionChoice, Size } from '@controls/utils/types';
import { ControlBox } from '@controls/control-box';
import { ControlButton } from '@controls/control-button';
import { ControlChoice } from '@controls/control-choice';
import { ControlLabel } from '@controls/control-label';
import { ControlRadioText } from '@controls/control-radio-text';
import { clickHasNode } from '@controls/utils/functions';
import { Converter } from '@utils/converter/converter.util';
import type { Base } from '@utils/types';
import cn from '@controls/control-dropdown/control-dropdown.module.css';

export interface ControlDropdownProps extends Base {
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

export const ControlDropdown = (props: ControlDropdownProps) => {
  const {
    choices = [],
    value = [],
    isSearchHidden = false,
    multiple = false,
    onChange,
    onOpen,
    onClose,
    className,
  } = props;
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
    <div className={clsx(cn.ControlDropdown, className)}>
      <ControlBox ref={borderRef} onClick={toggleDropdown}>
        <div className={cn.Border}>
          <div className={cn.Content}>
            <ControlLabel position="active">{label}</ControlLabel>
            <ControlRadioText size="body" checked oneLine>
              {Converter.Answer.FromArrayToMultiple(selectedChoices.map(({ label }) => label)) || placeholder}
            </ControlRadioText>
          </div>
          <div className={cn.ChevronWrap}>
            <ChevronDown data-open={isOpen} className={cn.Chevron} />
          </div>
        </div>
      </ControlBox>
      <ControlBox ref={boxRef} className={isOpen ? cn.BoxVisible : cn.BoxHidden}>
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
                    <ControlChoice
                      type="checkbox"
                      checked={selectedChoices.some((selectedChoice) => selectedChoice.value === value)}
                    />
                  )}
                  <ControlRadioText size="body" checked={false}>
                    {label}
                  </ControlRadioText>
                </li>
              ))
            ) : (
              <li className={clsx(cn.Choice, cn.ChoiceNoResult)}>
                <ControlRadioText size="body" checked={false}>
                  {noResult}
                </ControlRadioText>
              </li>
            )}
          </ul>
          {multiple && (
            <div className={cn.Close}>
              <ControlButton color="primary" size="sm" type="button" onClick={() => onCloseButtonClick()}>
                {closeButton}
              </ControlButton>
            </div>
          )}
        </div>
      </ControlBox>
    </div>
  );
};
