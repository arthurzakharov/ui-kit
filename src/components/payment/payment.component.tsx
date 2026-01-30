import { Block } from '@components/payment/components/block/block.component';
import { Glass } from '@components/payment/components/glass/glass.component';
import { Sidebar } from '@components/payment/components/sidebar/sidebar.component';
import { TextBlocks } from '@components/payment/components/text-blocks/text-blocks.component';

export type { PaymentBlockProps } from '@components/payment/components/block/block.component';
export type { PaymentGlassProps } from '@components/payment/components/glass/glass.component';
export type { PaymentSidebarProps } from '@components/payment/components/sidebar/sidebar.component';
export type {
  PaymentTextBlocksProps,
  PaymentTextBlockItem,
} from '@components/payment/components/text-blocks/text-blocks.component';

export const Payment = {
  Block,
  Glass,
  Sidebar,
  TextBlocks,
};
