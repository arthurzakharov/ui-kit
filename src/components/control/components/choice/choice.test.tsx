import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/choice/choice.stories';

const {
  DefaultValues,
  Checked,
  Focused,
  Hovered,
  Disabled,
  TypeRadio,
  TypeCheckbox,
  StateIdle,
  StateError,
  StateSuccess,
} = composeStories(stories);

describe('Choice Snapshot', () => {
  it('DefaultValues', async () => {
    const { container } = render(<DefaultValues />);
    expect(container).toMatchSnapshot();
  });

  it('Checked', async () => {
    const { container } = render(<Checked />);
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

  it('Disabled', async () => {
    const { container } = render(<Disabled />);
    expect(container).toMatchSnapshot();
  });

  it('TypeRadio', async () => {
    const { container } = render(<TypeRadio />);
    expect(container).toMatchSnapshot();
  });

  it('TypeCheckbox', async () => {
    const { container } = render(<TypeCheckbox />);
    expect(container).toMatchSnapshot();
  });

  it('StateIdle', async () => {
    const { container } = render(<StateIdle />);
    expect(container).toMatchSnapshot();
  });

  it('StateError', async () => {
    const { container } = render(<StateError />);
    expect(container).toMatchSnapshot();
  });

  it('StateSuccess', async () => {
    const { container } = render(<StateSuccess />);
    expect(container).toMatchSnapshot();
  });
});
