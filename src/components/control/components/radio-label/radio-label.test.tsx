import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/radio-label/radio-label.stories';

const {
  DefaultValue,
  CheckedValueIsString,
  CheckedValueIsArray,
  NotCheckedValueIsString,
  NotCheckedValueIsArray,
  Focused,
  Hovered,
  StateIdle,
  StateSuccess,
  StateErrorCheckedSingleChoice,
  StateErrorNotCheckedIdleSingleChoice,
  StateErrorNotCheckedError,
  MultiChoiceErrorState,
} = composeStories(stories);

describe('RadioLabel Snapshot', () => {
  it('DefaultValue', async () => {
    const { container } = render(<DefaultValue />);
    expect(container).toMatchSnapshot();
  });

  it('CheckedValueIsString', async () => {
    const { container } = render(<CheckedValueIsString />);
    expect(container).toMatchSnapshot();
  });

  it('CheckedValueIsArray', async () => {
    const { container } = render(<CheckedValueIsArray />);
    expect(container).toMatchSnapshot();
  });

  it('NotCheckedValueIsString', async () => {
    const { container } = render(<NotCheckedValueIsString />);
    expect(container).toMatchSnapshot();
  });

  it('NotCheckedValueIsArray', async () => {
    const { container } = render(<NotCheckedValueIsArray />);
    expect(container).toMatchSnapshot();
  });

  it('Focused', async () => {
    const { container } = render(<Focused />);
    expect(container).toMatchSnapshot();
  });

  it('Hovered', async () => {
    const { container } = render(<Hovered />);
    expect(container).toMatchSnapshot();
  });

  it('StateIdle', async () => {
    const { container } = render(<StateIdle />);
    expect(container).toMatchSnapshot();
  });

  it('StateSuccess', async () => {
    const { container } = render(<StateSuccess />);
    expect(container).toMatchSnapshot();
  });

  it('StateErrorCheckedSingleChoice', async () => {
    const { container } = render(<StateErrorCheckedSingleChoice />);
    expect(container).toMatchSnapshot();
  });

  it('StateErrorNotCheckedIdleSingleChoice', async () => {
    const { container } = render(<StateErrorNotCheckedIdleSingleChoice />);
    expect(container).toMatchSnapshot();
  });

  it('StateErrorNotCheckedError', async () => {
    const { container } = render(<StateErrorNotCheckedError />);
    expect(container).toMatchSnapshot();
  });

  it('MultiChoiceErrorState', async () => {
    const { container } = render(<MultiChoiceErrorState />);
    expect(container).toMatchSnapshot();
  });
});
