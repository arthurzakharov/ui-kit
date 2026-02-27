import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within, userEvent, waitFor } from 'storybook/test';
import { DialogArticle } from '@components/dialog-article';

const meta: Meta<typeof DialogArticle> = {
  title: 'Components/DialogArticle',
  component: DialogArticle,
  args: {
    cancel: {
      text: 'Cancel',
      fn: fn(),
    },
    confirm: {
      text: 'Accept',
      fn: fn(),
    },
  },
  argTypes: {
    cancel: {
      control: false,
      description: 'Optional **cancel button** configuration. If provided, a cancel button will be displayed.',
    },
    confirm: {
      control: false,
      description: 'Optional **confirm button** configuration. If provided, a confirm button will be displayed.',
    },
  },
  render: (args) => (
    <DialogArticle {...args}>
      <h1>Lorem ipsum dolor sit,</h1>
      <p>
        amet <span className="b">consectetur adipisicing</span> elit. Laboriosam reprehenderit dolorum cum est ullam
        consequatur labore at molestias quaerat commodi atque <strong>tenetur earum</strong> aut sapiente, distinctio
        sit? Quasi libero necessitatibus, mollitia nobis odit earum tenetur itaque sint <b>quam cumque</b>, voluptate,
        <span className="strong">enim acc</span>usamus aperiam nihil quidem?
      </p>
      <h2>Adipisci quas dolor sit eum ipsam.</h2>
      <p>
        Qui provident laboriosam, tempora sed maxime, quidem omnis veniam est aspernatur temporibus dolore fugit
        tenetur, sunt fugiat obcaecati? Quo impedit doloremque eligendi in vero temporibus ad eveniet fugiat provident
        delectus placeat est magni doloribus tenetur vel, facere explicabo, illum consectetur? Exercitationem,
        repellendus, fuga, voluptatem est et quibusdam aut eum itaque optio placeat accusamus molestias dignissimos
        adipisci.
      </p>
      <div className="ol">
        <div className="li">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
        <div className="li">
          Ab nostrum, amet dolorum adipisci quaerat placeat dolore. Nihil ullam repudiandae corrupti.
        </div>
        <div className="li">Deleniti dolorum vel harum. Blanditiis temporibus iure quo facere nobis!</div>
      </div>
      <div className="h1">Consequuntur porro commodi sit libero recusandae quod,</div>
      <p>
        expedita, delectus nostrum quibusdam eos alias, <a href="#">obcaecati aliquid quaerat</a> laboriosam natus
        repellat sapiente. Vitae deleniti veritatis eligendi facilis illum quia expedita. Soluta ipsa officia maiores
        modi placeat perspiciatis ad nemo enim delectus error, minima architecto repellat dolorum fugiat nam harum quasi
        atque repudiandae?
      </p>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
          </tr>
          <tr>
            <td>Row 3, Cell 1</td>
            <td>Row 3, Cell 2</td>
            <td>Row 3, Cell 3</td>
          </tr>
        </tbody>
      </table>
      <ol>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
        <li>Ab nostrum, amet dolorum adipisci quaerat placeat dolore. Nihil ullam repudiandae corrupti.</li>
        <li>Deleniti dolorum vel harum. Blanditiis temporibus iure quo facere nobis!</li>
      </ol>
      <hr />
      <p>
        Debitis, mollitia amet quae culpa animi incidunt vel aliquam hic fugit, dolorum, repudiandae et eveniet esse
        vitae optio dolor quas nisi cum totam tempora. Ut suscipit id aut officiis accusantium quibusdam porro
        voluptates tenetur obcaecati ad natus nam optio totam dolorum perferendis, ipsum rerum dicta voluptas odit iste
        in pariatur quos? <span className="a">Veniam recusandae</span> corrupti id reprehenderit vitae quam quaerat,
        optio eum minima at vero voluptatem nam porro vel ullam incidunt ut aliquid natus praesentium repellat impedit
        provident inventore enim ipsa.
      </p>
      <div className="ul">
        <div className="li">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
        <div className="li">
          Ab nostrum, amet dolorum adipisci quaerat placeat dolore. Nihil ullam repudiandae corrupti.
        </div>
        <div className="li">Deleniti dolorum vel harum. Blanditiis temporibus iure quo facere nobis!</div>
      </div>
      <div className="hr" />
      <ul>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</li>
        <li>Ab nostrum, amet dolorum adipisci quaerat placeat dolore. Nihil ullam repudiandae corrupti.</li>
        <li>Deleniti dolorum vel harum. Blanditiis temporibus iure quo facere nobis!</li>
      </ul>
      <p>
        Debitis, fugit necessitatibus iste, architecto quibusdam ut tempora officia doloremque dolore corrupti quam.
        Eius corrupti quidem beatae quos dolore eaque odio. Ducimus iusto alias quidem numquam fuga similique incidunt
        necessitatibus in laborum iste non omnis nobis nam doloremque temporibus quisquam voluptatibus, vero commodi!
        Iure accusamus doloribus hic culpa dicta perferendis eum quam veniam vero totam ratione saepe atque, porro
        incidunt.
      </p>
      <div className="h2">Earum tempora sed recusandae ea</div>
      <div className="p">
        ipsam voluptatibus doloremque voluptate, doloribus obcaecati delectus. Accusantium veritatis itaque ex et vitae
        ratione quibusdam quod mollitia, dolorum maxime expedita dolor nesciunt ullam deleniti doloribus consequuntur,
        fugit unde. Libero exercitationem quod cum. Quisquam veritatis omnis doloremque, eius, minus sit aut nisi
        aspernatur fuga ad, laudantium numquam beatae iste! Eveniet corporis voluptates consectetur quam et fugit dicta
        temporibus, eaque officia ab sint dignissimos officiis iure quas tenetur!
      </div>
    </DialogArticle>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'DialogArticle',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const dialogArticle = canvas.getByTestId('dialog-article');

    await step('Then the dialog article is rendered', async () => {
      expect(dialogArticle).toBeInTheDocument();
    });

    await step('Then both cancel and confirm buttons are visible', async () => {
      const cancelButton = canvas.getByTestId('dialog-article-cancel');
      const confirmButton = canvas.getByTestId('dialog-article-confirm');
      expect(cancelButton).toBeInTheDocument();
      expect(confirmButton).toBeInTheDocument();
    });

    await step('When user clicks the cancel button', async () => {
      const cancelButton = canvas.getByTestId('dialog-article-cancel');
      await userEvent.click(cancelButton);
      expect(args.cancel?.fn).toHaveBeenCalled();
    });

    await step('When user clicks the confirm button', async () => {
      const confirmButton = canvas.getByTestId('dialog-article-confirm');
      await userEvent.click(confirmButton);
      expect(args.confirm?.fn).toHaveBeenCalled();
    });

    await step('The dialog article has no bottom padding', async () => {
      expect(dialogArticle).toHaveStyle({ paddingBottom: '0' });
    });
  },
};

export const OnlyConfirm: Story = {
  args: {
    confirm: {
      text: 'Continue',
      fn: fn(),
    },
    cancel: undefined,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then only the confirm button is visible', async () => {
      const confirmButton = canvas.getByTestId('dialog-article-confirm');
      const cancelButton = canvas.queryByTestId('dialog-article-cancel');
      expect(confirmButton).toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
    });
  },
};

export const OnlyCancel: Story = {
  args: {
    cancel: {
      text: 'Go Back',
      fn: fn(),
    },
    confirm: undefined,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the dialog article is rendered', async () => {
      const dialogArticle = canvas.getByTestId('dialog-article');
      expect(dialogArticle).toBeInTheDocument();
    });

    await step('Then only the cancel button is visible', async () => {
      const cancelButton = canvas.getByTestId('dialog-article-cancel');
      const confirmButton = canvas.queryByTestId('dialog-article-confirm');
      expect(cancelButton).toBeInTheDocument();
      expect(confirmButton).not.toBeInTheDocument();
    });
  },
};

export const WithoutButtons: Story = {
  args: {
    cancel: undefined,
    confirm: undefined,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then no buttons are visible', async () => {
      const buttonsContainer = canvas.queryByTestId('dialog-article-buttons');
      const cancelButton = canvas.queryByTestId('dialog-article-cancel');
      const confirmButton = canvas.queryByTestId('dialog-article-confirm');
      expect(buttonsContainer).not.toBeInTheDocument();
      expect(cancelButton).not.toBeInTheDocument();
      expect(confirmButton).not.toBeInTheDocument();
    });
  },
};

export const MobileSize: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    viewport: { value: 'iphone14' },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const dialogArticle = canvas.getByTestId('dialog-article');
    await step('Then the dialog article has increased bottom padding on mobile', async () => {
      await waitFor(() => {
        expect(dialogArticle).toHaveStyle({ paddingBottom: '108px' });
      });
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'bg-color-grey-300',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const dialogArticle = canvas.getByTestId(String(args['data-testid']));

    await step('Then the dialog article has the custom test id', async () => {
      await expect(dialogArticle).toBeInTheDocument();
    });

    await step('Then the dialog article has the custom class name', async () => {
      await expect(dialogArticle).toHaveClass(String(args.className));
    });
  },
};
