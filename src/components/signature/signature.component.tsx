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

type SignaturePadState = 'auto-loading' | 'auto-generated' | 'manual-blank' | 'manual-drawn' | 'manual-stored';

export interface SignatureProps extends BaseProps {
  valueAuto: string;
  valueManual: string;
  getSignature: () => Promise<{ signature: string }>;
  onChangeManual: (value: string) => void;
  onChangeAuto: (value: string) => void;
}

export const Signature = (props: SignatureProps) => {
  const { valueAuto, valueManual, getSignature, onChangeManual, onChangeAuto, className = '' } = props;

  const ref = useRef<HTMLDivElement>(null);
  const isAutoRequestedRef = useRef(false);
  const [pad, setPad] = useState<SignatureCanvas | null>(null);
  const [mode, setMode] = useState<'auto' | 'manual'>(valueManual ? 'manual' : 'auto');
  const [valueManualDrawn, setValueManualDrawn] = useState('');
  const [hasAutoLoadFailed, setHasAutoLoadFailed] = useState(false);
  const { width = 0, height = 0 } = useResizeObserver({ ref, box: 'border-box' });

  const normalizedPadState: SignaturePadState =
    mode === 'auto'
      ? valueAuto
        ? 'auto-generated'
        : 'auto-loading'
      : valueManualDrawn
        ? 'manual-drawn'
        : valueManual
          ? 'manual-stored'
          : 'manual-blank';

  const canSwitchToManual = valueAuto !== '' || hasAutoLoadFailed;
  const canSwitchToAuto = valueAuto !== '';
  const manualStoredImage = valueManual || valueManualDrawn;

  const drawSignatureToCanvas = useCallback(
    (signatureImage: string) => {
      if (!pad || !width || !height || !signatureImage) return;
      pad.fromDataURL(signatureImage, {
        width: +width.toFixed(),
        height: +height.toFixed(),
      });
    },
    [pad, width, height],
  );

  const onSingPadDrawEnd = useCallback(() => {
    if (!pad) return;
    const drawnSignature = pad.getCanvas().toDataURL('image/png');
    setValueManualDrawn(drawnSignature);
    onChangeManual(drawnSignature);
    onChangeAuto(drawnSignature);
  }, [pad, onChangeManual, onChangeAuto]);

  const clearCanvas = useCallback(() => {
    if (!pad) return;
    pad.clear();
    setValueManualDrawn('');
    onChangeManual('');
    onChangeAuto('');
  }, [pad, onChangeManual, onChangeAuto]);

  const toAuto = useCallback(() => {
    setMode('auto');
    setValueManualDrawn('');
    onChangeAuto(valueAuto || '');
  }, [valueAuto, onChangeAuto]);

  const toManual = useCallback(() => {
    setMode('manual');
    if (valueManual) {
      onChangeAuto(valueManual);
    } else {
      onChangeAuto('');
    }
  }, [valueManual, onChangeAuto]);

  const redraw = useCallback(() => {
    setMode('manual');
    setValueManualDrawn('');
    onChangeManual('');
    onChangeAuto('');
  }, [onChangeManual, onChangeAuto]);

  const saveDrawnImage = useCallback(() => {
    if (!valueManualDrawn) return;
    setValueManualDrawn('');
    if (valueManual !== valueManualDrawn) {
      onChangeManual(valueManualDrawn);
    }
    onChangeAuto(valueManualDrawn);
  }, [valueManual, valueManualDrawn, onChangeManual, onChangeAuto]);

  const isPadState = (states: SignaturePadState[]): boolean => states.includes(normalizedPadState);

  useEffect(() => {
    if (valueManual && mode === 'auto') {
      setMode('manual');
    }
  }, [valueManual, mode]);

  useEffect(() => {
    if (mode === 'manual' && valueManualDrawn && width && height) {
      drawSignatureToCanvas(valueManualDrawn);
    }
  }, [mode, valueManualDrawn, width, height, drawSignatureToCanvas]);

  useEffect(() => {
    if (valueAuto) {
      setHasAutoLoadFailed(false);
      isAutoRequestedRef.current = false;
      return;
    }

    if (isAutoRequestedRef.current) return;
    isAutoRequestedRef.current = true;

    const fetchSignature = async () => {
      try {
        const response = await getSignature();
        const signatureBase64 = `data:image/png;base64,${response.signature}`;
        setHasAutoLoadFailed(false);
        onChangeAuto(signatureBase64);
      } catch {
        setHasAutoLoadFailed(true);
      }
    };

    void fetchSignature();
  }, [valueAuto, getSignature, onChangeAuto]);

  return (
    <div className={clsx(cn.Signature, className)}>
      <div
        className={clsx(
          cn.SignatureMain,
          isPadState(['auto-generated', 'auto-loading']) ? cn.SignatureMainAuto : cn.SignatureMainManual,
        )}
        ref={ref}
      >
        <Flex direction="row" justify={isPadState(['manual-drawn']) ? 'end' : 'center'} className={cn.SignatureHeader}>
          <Text.Tag tag="h6" weight="medium" size="regular" color="primary" align="center">
            <Animation.FadeScale name="generated-signature" condition={isPadState(['auto-generated', 'auto-loading'])}>
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
          {isPadState(['auto-generated', 'auto-loading']) ? (
            <Flex direction="column" align="center" justify="start">
              <Animation.FadeScale flex name="signature" condition={valueAuto !== ''}>
                <img className={cn.SignatureAutoPanelImage} src={valueAuto} alt="signature" />
              </Animation.FadeScale>
              <Animation.FadeScale flex name="signature" condition={valueAuto === '' && !hasAutoLoadFailed}>
                <div className={cn.SignatureAutoPanelLoader} style={{ height: 142 }}>
                  <Loader size="sm" color="primary" />
                </div>
              </Animation.FadeScale>
              <Animation.FadeScale flex name="auto-failed" condition={valueAuto === '' && hasAutoLoadFailed}>
                <Flex direction="row" align="center" style={{ height: 78 }}>
                  <Text.Tag weight="regular" size="small" color="secondary">
                    Automatische Signatur konnte nicht geladen werden.
                  </Text.Tag>
                </Flex>
              </Animation.FadeScale>
              <Animation.FadeScale flex name="auto-note" condition={valueAuto !== ''}>
                <Flex direction="row" align="center" justify="center" gap="xxs" mt="xs">
                  <Check size={24} className={cn.SignatureAutoPanelNoteIcon} />
                  <Text.Tag weight="regular" size="small" color="secondary">
                    Diese Unterschrift ist ausreichend
                  </Text.Tag>
                </Flex>
              </Animation.FadeScale>
              <Animation.FadeScale flex name="manual-switch" condition={canSwitchToManual}>
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
                <img width={width} height={height} alt="signature" src={manualStoredImage} />
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
        <Flex direction="row" grow="equal" align="center" justify="space-between" gap="md" mt="md">
          <Animation.FadeScale flex name="to-auto" condition={canSwitchToAuto}>
            <Control.Button fullWidth blurAfterClick color="tertiary" onClick={toAuto}>
              Abbrechen
            </Control.Button>
          </Animation.FadeScale>
          <Control.Button
            fullWidth
            blurAfterClick
            color="primary"
            disabled={!valueManualDrawn}
            onClick={saveDrawnImage}
          >
            Speichern
          </Control.Button>
        </Flex>
      </Animation.FadeScale>
    </div>
  );
};
