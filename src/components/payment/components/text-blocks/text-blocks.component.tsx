import { Text } from '@components/text/text.component';
import cn from '@components/payment/components/text-blocks/text-blocks.module.css';

export interface PaymentTextBlockItem {
  title: string;
  text: string;
  placeholders?: Record<string, () => unknown>;
}

export interface PaymentTextBlocksProps {
  blocks: PaymentTextBlockItem[];
}

export const TextBlocks = (props: PaymentTextBlocksProps) => {
  const { blocks = [] } = props;

  /**
   * Replaces placeholders in the title and text of a TextBlockItem with their corresponding values
   * provided by callback functions in the placeholders object.
   * @example {
   *   title: 'Some title',
   *   text: 'Some text <b>#XXX-text €</b> value',
   *   placeholders: {
   *     '#XXX-text': () => '25',
   *   },
   * }
   * @param {TextBlockItem} block - The TextBlockItem object containing the title, text, and placeholders.
   *   - `title` {string} The title text containing placeholders.
   *   - `text` {string} The body text containing placeholders.
   *   - `placeholders` {Object} A map of placeholder strings to callback functions.
   *     Each callback function returns a replacement string for its corresponding placeholder.
   * @returns {TextBlockItem} A new TextBlockItem object with placeholders in the title and text replaced
   * by their corresponding values.
   */
  const applyPlaceholders = (block: PaymentTextBlockItem): PaymentTextBlockItem => {
    let updatedTitle = block.title;
    let updatedText = block.text;
    if (block.placeholders) {
      Object.keys(block.placeholders).forEach((placeholder) => {
        if (!block.placeholders?.[placeholder]) return;
        const destination = placeholder.split('-')[1];
        const value = block.placeholders[placeholder]() as string;
        if (destination === 'title') updatedTitle = updatedTitle.replace(new RegExp(placeholder, 'g'), value);
        if (destination === 'text') updatedText = updatedText.replace(new RegExp(placeholder, 'g'), value);
      });
    }
    return {
      title: updatedTitle,
      text: updatedText,
    };
  };

  return (
    <div className={cn.TextBlocks}>
      {blocks.map(applyPlaceholders).map(({ title, text }, i) => (
        <div key={i} className={cn.TextBlocksContent}>
          <h6 className={cn.TextBlocksTitle}>{title}</h6>
          <Text>{text}</Text>
        </div>
      ))}
    </div>
  );
};
