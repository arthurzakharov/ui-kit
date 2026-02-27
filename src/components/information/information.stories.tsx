import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Information } from '@components/information/information.component';

const meta = {
  title: 'Components/Information',
  component: Information,
  render: (args) => (
    <Information {...args}>
      <p>
        Lorem ipsum dolor sit <b>amet consectetur</b> adipisicing elit. Exercitationem non enim rerum voluptatum quae
        consequatur dolor, id maiores culpa. Ratione!
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis beatae asperiores accusantium adipisci
        minima dolore. Optio eum excepturi nostrum at deleniti, quae hic provident aspernatur autem nemo assumenda
        officia dolores expedita voluptas dolorem similique illo consectetur! Veritatis, pariatur fuga accusamus
        explicabo soluta voluptas et voluptate sit consequuntur iste placeat quis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eos consequuntur a culpa molestias iure et, illo
        dolore, explicabo assumenda dolor odit animi similique quasi?
      </p>
    </Information>
  ),
} satisfies Meta<typeof Information>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Information',
  play: async ({ canvasElement, step }) => {
    const information = within(canvasElement).getByTestId('information');

    await step('Then the information component is not empty', async () => {
      await expect(information).not.toBeEmptyDOMElement();
    });
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'color-success',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const information = canvas.getByTestId('custom-test-id');

    await step('Then the information component has the custom test id', async () => {
      await expect(information).toBeInTheDocument();
    });

    await step('Then the information component has the custom class name', async () => {
      await expect(information).toHaveClass(String(args.className));
    });
  },
};
