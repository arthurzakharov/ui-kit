import { composeStories } from '@storybook/react-vite';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as stories from '@/components/control/components/button/button.stories';

const {
  Default,
  CustomColor,
  CustomSize,
  CustomType,
  Disabled,
  Enabled,
  FullWidth,
  WithInfoAsPlainText,
  WithInfoAsTagText,
} = composeStories(stories);

describe('Button Snapshot', () => {
  it('Default', async () => {
    const { container } = render(<Default />);
    expect(container).toMatchSnapshot();
  });

  it('CustomColor', async () => {
    const { container } = render(<CustomColor />);
    expect(container).toMatchSnapshot();
  });

  it('CustomSize', async () => {
    const { container } = render(<CustomSize />);
    expect(container).toMatchSnapshot();
  });

  it('CustomType', async () => {
    const { container } = render(<CustomType />);
    expect(container).toMatchSnapshot();
  });

  it('Disabled', async () => {
    const { container } = render(<Disabled />);
    expect(container).toMatchSnapshot();
  });

  it('Enabled', async () => {
    const { container } = render(<Enabled />);
    expect(container).toMatchSnapshot();
  });

  it('FullWidth', async () => {
    const { container } = render(<FullWidth />);
    expect(container).toMatchSnapshot();
  });

  it('WithInfoAsPlainText', async () => {
    const { container } = render(<WithInfoAsPlainText />);
    expect(container).toMatchSnapshot();
  });

  it('WithInfoAsTagText', async () => {
    const { container } = render(<WithInfoAsTagText />);
    expect(container).toMatchSnapshot();
  });
});
