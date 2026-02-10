import { useCallback, useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useResizeObserver } from 'usehooks-ts';
import { Check, Loader, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { Animation } from '@components/animation/animation.component';
import { Control } from '@components/control/control.component';
import { Flex } from '@components/flex/flex.component';
import { Text } from '@components/text/text.component';
import cn from '@components/signature/signature.module.css';

type SignaturePadState = 'auto-generated' | 'manual-blank' | 'manual-drawn' | 'manual-stored';

export type SignatureMode = 'auto' | 'manual';

export interface SignatureProps {
  modes: SignatureMode[];
  isInAutoMode: boolean;
  valueAuto: string;
  valueManual: string;
  onUpdateAuto: (autoMode: boolean) => void;
  onUpdateManual: (value: string) => void;
  onChange: (value: string) => void;
}

export const Signature = (props: SignatureProps) => {
  const { modes, isInAutoMode, valueAuto, valueManual, onUpdateAuto, onUpdateManual, onChange } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [pad, setPad] = useState<SignatureCanvas | null>(null);
  const [padState, setPadState] = useState<SignaturePadState>('auto-generated');
  const { width = 0, height = 0 } = useResizeObserver({ ref, box: 'border-box' });

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
      onUpdateManual(drawnSignature);
      onChange(drawnSignature);
    }
  }, [pad, onChange, onUpdateManual]);

  const clearCanvas = useCallback(() => {
    if (pad) {
      pad.clear();
      onUpdateManual('');
      onChange('');
    }
  }, [pad, onChange, onUpdateManual]);

  const toAuto = useCallback(() => {
    onUpdateAuto(true);
    setPadState('auto-generated');
    if (valueAuto) onChange(valueAuto);
  }, [onUpdateAuto, valueAuto, onChange]);

  const toManual = useCallback(() => {
    onUpdateAuto(false);
    setPadState(valueManual ? 'manual-stored' : 'manual-blank');
    if (valueManual) {
      onChange(valueManual);
      setTimeout(drawSignatureToCanvas, 0);
    } else {
      onChange('');
    }
  }, [onUpdateAuto, valueManual, onChange, drawSignatureToCanvas]);

  const redraw = useCallback(() => {
    onUpdateAuto(false);
    setPadState('manual-blank');
    onUpdateManual('');
    onChange('');
  }, [onUpdateAuto, onUpdateManual, onChange]);

  const saveDrawnImage = useCallback(() => {
    setPadState('manual-stored');
    drawSignatureToCanvas();
  }, [drawSignatureToCanvas]);

  const isPadState = (states: SignaturePadState[]): boolean => states.includes(padState);

  useEffect(() => {
    if (!modes.includes('auto') && isInAutoMode) {
      onUpdateAuto(false);
    }
  }, [modes, isInAutoMode, onUpdateAuto]);

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
    <div className={cn.Signature}>
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
              <Animation.FadeScale flex name="signature" condition={modes.includes('manual')}>
                <div className={cn.SignatureAutoPanelButton}>
                  <Control.ButtonText blurAfterClick underlined onClick={toManual}>
                    per Hand/Maus unterschreiben
                  </Control.ButtonText>
                </div>
              </Animation.FadeScale>
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
          {modes.includes('auto') ? (
            <Control.Button fullWidth blurAfterClick color="tertiary" onClick={toAuto}>
              Abbrechen
            </Control.Button>
          ) : null}
          <Control.Button fullWidth blurAfterClick color="primary" disabled={!valueManual} onClick={saveDrawnImage}>
            Speichern
          </Control.Button>
        </Flex>
      </Animation.FadeScale>
    </div>
  );
};
