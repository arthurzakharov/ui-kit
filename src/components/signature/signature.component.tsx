import { useCallback, useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useResizeObserver } from 'usehooks-ts';
import { Check, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { Animation } from '@animations/animation.component';
import { Control } from '@components/control/control.component';
import { Flex } from '@components/flex/flex.component';
import { Text } from '@components/text/text.component';
import { Loader } from '@components/loader/loader.component';
import type { BaseProps } from '@utils/types';
import cn from '@components/signature/signature.module.css';

type SignaturePadState = 'auto-generated' | 'manual-blank' | 'manual-drawn' | 'manual-stored';

export interface SignatureProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
}

export const Signature = (props: SignatureProps) => {
  const { value, onChange, className = '' } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [pad, setPad] = useState<SignatureCanvas | null>(null);
  const [isInAutoMode, setIsInAutoMode] = useState(true);
  const [valueAuto, setValueAuto] = useState(value);
  const [valueManual, setValueManual] = useState('');
  const [padState, setPadState] = useState<SignaturePadState>('auto-generated');
  const { width = 0, height = 0 } = useResizeObserver({ ref, box: 'border-box' });

  const normalizedPadState: SignaturePadState = isInAutoMode
    ? 'auto-generated'
    : padState === 'manual-drawn'
      ? 'manual-drawn'
      : valueManual
        ? 'manual-stored'
        : 'manual-blank';

  const drawSignatureToCanvas = useCallback(() => {
    if (pad && width && height && valueManual) {
      pad.fromDataURL(valueManual, {
        width: +width.toFixed(),
        height: +height.toFixed(),
      });
    }
  }, [pad, width, height, valueManual]);

  const onSingPadDrawEnd = useCallback(() => {
    if (pad) {
      const drawnSignature = pad.getCanvas().toDataURL('image/png');
      setPadState('manual-drawn');
      setValueManual(drawnSignature);
      onChange(drawnSignature);
    }
  }, [pad, onChange]);

  const clearCanvas = useCallback(() => {
    if (pad) {
      pad.clear();
      setValueManual('');
      onChange('');
    }
  }, [pad, onChange]);

  const toAuto = useCallback(() => {
    setIsInAutoMode(true);
    setPadState('auto-generated');
    if (valueAuto) onChange(valueAuto);
  }, [valueAuto, onChange]);

  const toManual = useCallback(() => {
    setIsInAutoMode(false);
    setPadState(valueManual ? 'manual-stored' : 'manual-blank');
    if (valueManual) {
      onChange(valueManual);
      setTimeout(drawSignatureToCanvas, 0);
    } else {
      onChange('');
    }
  }, [valueManual, onChange, drawSignatureToCanvas]);

  const redraw = useCallback(() => {
    setIsInAutoMode(false);
    setPadState('manual-blank');
    setValueManual('');
    onChange('');
  }, [onChange]);

  const saveDrawnImage = useCallback(() => {
    setPadState('manual-stored');
    drawSignatureToCanvas();
  }, [drawSignatureToCanvas]);

  const isPadState = (states: SignaturePadState[]): boolean => states.includes(normalizedPadState);

  useEffect(() => {
    if (!value || value === valueManual) return;
    setValueAuto((current) => (current === value ? current : value));
  }, [value, valueManual]);

  useEffect(() => {
    if (!isInAutoMode && valueManual && width && height) {
      drawSignatureToCanvas();
    }
  }, [isInAutoMode, valueManual, width, height, drawSignatureToCanvas]);

  useEffect(() => {
    if (isInAutoMode && valueAuto) {
      onChange(valueAuto);
    } else if (!isInAutoMode && !valueManual) {
      onChange('');
    }
  }, [isInAutoMode, valueAuto, valueManual, onChange]);

  return (
    <div className={clsx(cn.Signature, className)}>
      <div
        className={clsx(
          cn.SignatureMain,
          isPadState(['auto-generated']) ? cn.SignatureMainAuto : cn.SignatureMainManual,
        )}
        ref={ref}
      >
        <Flex direction="row" justify={isPadState(['manual-drawn']) ? 'end' : 'center'} className={cn.SignatureHeader}>
          <Text.Tag tag="h6" weight="medium" size="regular" color="primary" align="center">
            <Animation.FadeScale name="generated-signature" condition={isPadState(['auto-generated'])}>
              Wir haben eine digitale Signature Sie generiert.
            </Animation.FadeScale>
            <Animation.FadeScale flex name="create-signature" condition={isPadState(['manual-blank', 'manual-stored'])}>
              Ihre Signatur:
            </Animation.FadeScale>
          </Text.Tag>
          <Animation.FadeSlide flex name="reset" direction="rtl" condition={isPadState(['manual-drawn'])}>
            <div className={cn.SignatureHeaderReset}>
              <Control.ButtonText blurAfterClick underlined icon={<RefreshCw />} onClick={clearCanvas}>
                Neu starten
              </Control.ButtonText>
            </div>
          </Animation.FadeSlide>
        </Flex>
        <Flex direction="row" align="end" justify="center">
          {isPadState(['auto-generated']) ? (
            <Flex direction="column" align="center" justify="start">
              <Animation.FadeScale flex name="signature" condition={valueAuto !== ''}>
                <img className={cn.SignatureAutoPanelImage} src={valueAuto} alt="signature" />
              </Animation.FadeScale>
              <Animation.FadeScale flex name="signature" condition={valueAuto === ''}>
                <div className={cn.SignatureAutoPanelLoader}>
                  <Loader size="sm" color="primary" />
                </div>
              </Animation.FadeScale>
              <Flex direction="row" align="center" justify="center" gap="xxs" mt="xs">
                <Check size={24} className={cn.SignatureAutoPanelNoteIcon} />
                <Text.Tag weight="regular" size="small" color="secondary">
                  Diese Unterschrift ist ausreichend
                </Text.Tag>
              </Flex>
              <div className={cn.SignatureAutoPanelButton}>
                <Control.ButtonText blurAfterClick underlined onClick={toManual}>
                  per Hand/Maus unterschreiben
                </Control.ButtonText>
              </div>
            </Flex>
          ) : (
            <div className={cn.SignatureManualPanel}>
              <div className={cn.SignatureManualPanelPlaceholder} />
              {isPadState(['manual-stored']) ? (
                <img width={width} height={height} alt="signature" src={valueManual} />
              ) : (
                <SignatureCanvas
                  penColor="#262626"
                  dotSize={2}
                  minWidth={0.25}
                  maxWidth={2.75}
                  throttle={12}
                  canvasProps={{ width: +(width || 0).toFixed(), height: +(height || 0).toFixed() }}
                  ref={(ref) => setPad(ref)}
                  clearOnResize
                  onEnd={onSingPadDrawEnd}
                />
              )}
              <Animation.FadeScale
                name="to-generated"
                condition={isPadState(['manual-stored'])}
                className={cn.SignatureManualPanelButton}
              >
                <Control.ButtonText blurAfterClick underlined onClick={redraw}>
                  Zurücksetzen
                </Control.ButtonText>
              </Animation.FadeScale>
            </div>
          )}
        </Flex>
      </div>
      <Animation.FadeScale name="footer" condition={isPadState(['manual-blank', 'manual-drawn'])}>
        <Flex direction="row" align="center" justify="space-between" gap="md" mt="md">
          <Control.Button fullWidth blurAfterClick color="tertiary" onClick={toAuto}>
            Abbrechen
          </Control.Button>
          <Control.Button fullWidth blurAfterClick color="primary" disabled={!valueManual} onClick={saveDrawnImage}>
            Speichern
          </Control.Button>
        </Flex>
      </Animation.FadeScale>
    </div>
  );
};
