import { useCallback, useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useResizeObserver } from 'usehooks-ts';
import { Check, RefreshCw, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import { AnimationFadeSlide } from '@animations/animation-fade-slide';
import { ControlButton } from '@controls/control-button';
import { ControlButtonText } from '@controls/control-button-text';
import { Flex } from '@components/flex/flex.component';
import { Text } from '@components/text/text.component';
import { Loader } from '@components/loader/loader.component';
import type { Base } from '@utils/types';
import cn from '@components/signature/signature.module.css';

type SignaturePadState = 'auto-loading' | 'auto-generated' | 'manual-blank' | 'manual-drawn' | 'manual-stored';

export interface SignatureProps extends Base {
  auto: string;
  manual: string;
  getSignature: () => Promise<{ signature: string }>;
  onChangeManual: (value: string) => void;
  onChangeAuto: (value: string) => void;
}

export const Signature = (props: SignatureProps) => {
  const { auto, manual, getSignature, onChangeManual, onChangeAuto, className = '' } = props;

  const ref = useRef<HTMLDivElement>(null);
  const isAutoRequestedRef = useRef(false);
  const [pad, setPad] = useState<SignatureCanvas | null>(null);
  const [mode, setMode] = useState<'auto' | 'manual'>(manual ? 'manual' : 'auto');
  const [valueManualDrawn, setValueManualDrawn] = useState('');
  const [hasAutoLoadFailed, setHasAutoLoadFailed] = useState(false);
  const { width = 0, height = 0 } = useResizeObserver({ ref, box: 'border-box' });

  const normalizedPadState: SignaturePadState =
    mode === 'auto'
      ? auto
        ? 'auto-generated'
        : 'auto-loading'
      : valueManualDrawn
        ? 'manual-drawn'
        : manual
          ? 'manual-stored'
          : 'manual-blank';

  const canSwitchToManual = auto !== '' || hasAutoLoadFailed;
  const manualStoredImage = manual || valueManualDrawn;

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
  }, [pad, onChangeManual]);

  const clearCanvas = useCallback(() => {
    if (!pad) return;
    pad.clear();
    setValueManualDrawn('');
    onChangeManual('');
  }, [pad, onChangeManual]);

  const toAuto = useCallback(() => {
    setMode('auto');
    setValueManualDrawn('');
  }, []);

  const toManual = useCallback(() => {
    setMode('manual');
  }, []);

  const redraw = useCallback(() => {
    setMode('manual');
    setValueManualDrawn('');
    onChangeManual('');
  }, [onChangeManual]);

  const saveDrawnImage = useCallback(() => {
    if (!valueManualDrawn) return;
    setValueManualDrawn('');
  }, [valueManualDrawn]);

  const isPadState = (states: SignaturePadState[]): boolean => states.includes(normalizedPadState);

  useEffect(() => {
    if (mode === 'manual' && valueManualDrawn && width && height) {
      drawSignatureToCanvas(valueManualDrawn);
    }
  }, [mode, valueManualDrawn, width, height, drawSignatureToCanvas]);

  useEffect(() => {
    if (auto) {
      isAutoRequestedRef.current = false;
      return;
    }

    if (isAutoRequestedRef.current) return;
    isAutoRequestedRef.current = true;

    void getSignature()
      .then((response) => {
        const signatureBase64 = `data:image/png;base64,${response.signature}`;
        setHasAutoLoadFailed(false);
        onChangeAuto(signatureBase64);
      })
      .catch(() => {
        setHasAutoLoadFailed(true);
      });
  }, [auto, getSignature, onChangeAuto]);

  const retryAutoFetch = useCallback(() => {
    setHasAutoLoadFailed(false);
    isAutoRequestedRef.current = true;

    void getSignature()
      .then((response) => {
        const signatureBase64 = `data:image/png;base64,${response.signature}`;
        setHasAutoLoadFailed(false);
        onChangeAuto(signatureBase64);
      })
      .catch(() => {
        setHasAutoLoadFailed(true);
      });
  }, [getSignature, onChangeAuto]);

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
          <Text tag="h6" weight="medium" align="center">
            <AnimationFadeScale name="generated-signature" condition={isPadState(['auto-generated', 'auto-loading'])}>
              Wir haben eine digitale Signature Sie generiert.
            </AnimationFadeScale>
            <AnimationFadeScale name="create-signature" condition={isPadState(['manual-blank', 'manual-stored'])}>
              Ihre Signatur:
            </AnimationFadeScale>
          </Text>
          <AnimationFadeSlide name="reset" direction="rtl" condition={isPadState(['manual-drawn'])}>
            <div className={cn.SignatureHeaderReset}>
              <ControlButtonText blurAfterClick underlined icon={<RefreshCw />} onClick={clearCanvas}>
                Neu starten
              </ControlButtonText>
            </div>
          </AnimationFadeSlide>
        </Flex>
        <Flex direction="row" align="end" justify="center">
          {isPadState(['auto-generated', 'auto-loading']) ? (
            <Flex direction="column" align="center" justify="start">
              <AnimationFadeScale name="signature" condition={auto !== ''}>
                <img className={cn.SignatureAutoPanelImage} src={auto} alt="signature" />
              </AnimationFadeScale>
              <AnimationFadeScale name="signature" condition={auto === '' && !hasAutoLoadFailed}>
                <div className={cn.SignatureAutoPanelLoader} style={{ height: 142 }}>
                  <Loader size="sm" color="accent-primary" />
                </div>
              </AnimationFadeScale>
              <AnimationFadeScale name="auto-failed" condition={auto === '' && hasAutoLoadFailed}>
                <Flex direction="column" align="center" justify="center" style={{ height: 78 }} gap="xs">
                  <Text tag="span" size="body-small" color="text-secondary">
                    Automatische Signatur konnte nicht geladen werden.
                  </Text>
                  <ControlButtonText
                    blurAfterClick
                    underlined
                    size="sm"
                    iconPosition="right"
                    icon={<RotateCcw />}
                    onClick={retryAutoFetch}
                  >
                    Erneut versuchen
                  </ControlButtonText>
                </Flex>
              </AnimationFadeScale>
              <AnimationFadeScale name="auto-note" condition={auto !== ''}>
                <Flex direction="row" align="center" justify="center" gap="xxs" mt="xs">
                  <Check size={24} className={cn.SignatureAutoPanelNoteIcon} />
                  <Text tag="span" size="body-small" color="text-secondary">
                    Diese Unterschrift ist ausreichend
                  </Text>
                </Flex>
              </AnimationFadeScale>
              <AnimationFadeScale name="manual-switch" condition={canSwitchToManual}>
                <div className={cn.SignatureAutoPanelButton}>
                  <ControlButtonText blurAfterClick underlined onClick={toManual}>
                    per Hand/Maus unterschreiben
                  </ControlButtonText>
                </div>
              </AnimationFadeScale>
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
              <AnimationFadeScale
                name="to-generated"
                condition={isPadState(['manual-stored'])}
                className={cn.SignatureManualPanelButton}
              >
                <ControlButtonText blurAfterClick underlined onClick={redraw}>
                  Zurücksetzen
                </ControlButtonText>
              </AnimationFadeScale>
            </div>
          )}
        </Flex>
      </div>
      <AnimationFadeScale name="footer" condition={isPadState(['manual-blank', 'manual-drawn'])}>
        <Flex direction="row" grow="equal" align="center" justify="space-between" gap="md" mt="md">
          <ControlButton fullWidth blurAfterClick color="tertiary" onClick={toAuto}>
            Abbrechen
          </ControlButton>
          <ControlButton fullWidth blurAfterClick color="primary" disabled={!valueManualDrawn} onClick={saveDrawnImage}>
            Speichern
          </ControlButton>
        </Flex>
      </AnimationFadeScale>
    </div>
  );
};
