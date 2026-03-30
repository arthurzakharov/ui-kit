import { useCallback, useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useResizeObserver } from 'usehooks-ts';
import { Check, RefreshCw, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { Button, ButtonText } from '@controls/buttons';
import { Loader } from '@components/loader';
import type { Base } from '@utils/types';
import { baseProps } from '@utils/functions';
import cn from '@components/signature/signature.module.css';

type SignaturePadState = 'auto-loading' | 'auto-generated' | 'manual-blank' | 'manual-drawn' | 'manual-stored';

export interface SignatureProps extends Base {
  auto: string;
  manual: string;
  getSignature: () => Promise<{ signature: string }>;
  onChangeManual: (value: string) => void;
  onChangeAuto: (value: string) => void;
}

export const Signature = ({
  // Signature props
  auto,
  manual,
  getSignature,
  onChangeManual,
  onChangeAuto,
  // Base props
  ...base
}: SignatureProps) => {
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
    <div
      data-testid={baseProps(base, 'data-testid', 'signature')}
      className={clsx(cn.Signature, baseProps(base, 'className'))}
    >
      <div
        className={clsx(cn.Main, isPadState(['auto-generated', 'auto-loading']) ? cn.MainAuto : cn.MainManual)}
        ref={ref}
      >
        <div className={clsx(cn.Header, isPadState(['manual-drawn']) ? cn.HeaderManualDraw : cn.HeaderNotManualDraw)}>
          {isPadState(['auto-generated', 'auto-loading']) && (
            <span className={cn.HeaderTitle}>Wir haben eine digitale Signature Sie generiert.</span>
          )}
          {isPadState(['manual-blank', 'manual-stored']) && <span className={cn.HeaderTitle}>Ihre Signatur:</span>}
          {isPadState(['manual-drawn']) && (
            <ButtonText
              blurAfterClick
              text="Neu starten"
              underlined
              icon={<RefreshCw />}
              className={cn.HeaderReset}
              onClick={clearCanvas}
            />
          )}
        </div>
        {isPadState(['auto-generated', 'auto-loading']) ? (
          <div className={cn.AutoPanel}>
            {auto !== '' && <img className={cn.AutoPanelImage} src={auto} alt="signature" />}
            {auto === '' && !hasAutoLoadFailed && (
              <Loader size="sm" color="accent-primary" className={cn.AutoPanelLoader} />
            )}
            {auto === '' && hasAutoLoadFailed && (
              <div className={cn.AutoPanelError}>
                <span className={cn.AutoPanelErrorTitle}>Automatische Signatur konnte nicht geladen werden.</span>
                <ButtonText
                  blurAfterClick
                  underlined
                  text="Erneut versuchen"
                  size="sm"
                  iconPosition="right"
                  icon={<RotateCcw />}
                  onClick={retryAutoFetch}
                />
              </div>
            )}
            {auto !== '' && (
              <div className={cn.AutoPanelLabel}>
                <Check className={cn.AutoPanelLabelIcon} />
                <span className={cn.AutoPanelLabelText}>Diese Unterschrift ist ausreichend</span>
              </div>
            )}
            {canSwitchToManual && (
              <ButtonText
                blurAfterClick
                color="link"
                text="Per Hand/Maus unterschreiben"
                underlined
                className={cn.AutoPanelButton}
                onClick={toManual}
              />
            )}
          </div>
        ) : (
          <div className={cn.ManualPanel}>
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
            {isPadState(['manual-stored']) && (
              <ButtonText
                blurAfterClick
                underlined
                text="Zurücksetzen"
                className={cn.ManualPanelButton}
                onClick={redraw}
              />
            )}
          </div>
        )}
      </div>
      {isPadState(['manual-blank', 'manual-drawn']) && (
        <div className={cn.Footer}>
          <Button fullWidth blurAfterClick text="Abbrechen" color="tertiary" onClick={toAuto} />
          <Button
            fullWidth
            blurAfterClick
            text="Speichern"
            color="primary"
            disabled={!valueManualDrawn}
            onClick={saveDrawnImage}
          />
        </div>
      )}
    </div>
  );
};
