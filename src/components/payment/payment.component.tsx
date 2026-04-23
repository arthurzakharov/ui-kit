import { Block } from './components/block/block.component';
import { Glass } from './components/glass/glass.component';
import { Info } from './components/info/info.component';
import { Sidebar } from './components/sidebar/sidebar.component';
import { TextBlocks } from './components/text-blocks/text-blocks.component';

export type { PaymentBlockProps } from './components/block/block.component';
export type { PaymentGlassProps } from './components/glass/glass.component';
export type { PaymentInfoProps } from './components/info/info.component';
export type { PaymentSidebarProps } from './components/sidebar/sidebar.component';
export type { PaymentTextBlocksProps, PaymentTextBlockItem } from './components/text-blocks/text-blocks.component';

export const Payment = {
  Block,
  Glass,
  Info,
  Sidebar,
  TextBlocks,
};
