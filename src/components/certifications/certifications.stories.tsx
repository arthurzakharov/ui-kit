import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationsIconsArgType } from '@story/arg-types';
import { expect, within } from 'storybook/test';
import { Certifications } from '@components/certifications/certifications.component';

const meta = {
  title: 'Components/Certifications',
  component: Certifications,
  args: {
    icons: ['free', 'gdpr', 'ssl'],
  },
  argTypes: {
    icons: CertificationsIconsArgType(),
  },
} satisfies Meta<typeof Certifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Certifications',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const argsIcons = args.icons || [];
    const icons = canvas.getAllByTestId('certifications-icon');
    for (const icon of argsIcons) {
      const index = argsIcons.indexOf(icon);
      await expect(icons[index]).toHaveAttribute('data-icon', icon);
    }
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const certifications = canvas.getByTestId(String(args['data-testid']));

    await step('Then the certifications component has the custom test id', async () => {
      await expect(certifications).toBeInTheDocument();
    });

    await step('Then the certifications component has the custom class name', async () => {
      await expect(certifications).toHaveClass(String(args.className));
    });
  },
};
