import { TextBlocks, type TextBlockItem } from '../text-blocks/text-blocks.component';
import whatsAppSrc from './assets/whatsapp.svg';
import phoneSrc from './assets/phone.svg';
import cn from './sidebar.module.css';

export interface SidebarProps {
  info: TextBlockItem[];
  whatsapp: string;
  tel: string;
}

export const Sidebar = (props: SidebarProps) => {
  const { info = [], whatsapp = '', tel = '' } = props;

  const getTelForLink = (tel: string): string => 'tel:+49' + tel.replace(/^0|[^0-9.]/g, '');

  return (
    <div className={cn.Sidebar}>
      <TextBlocks blocks={info} />
      <ul className={cn.SidebarContact}>
        {whatsapp ? (
          <li className={cn.SidebarLink}>
            <img className={cn.SidebarWhatsapp} src={whatsAppSrc} alt="whatsapp" />
            <a className={cn.SidebarText} href={'https://' + whatsapp} target="_blank">
              {whatsapp}
            </a>
          </li>
        ) : null}
        {tel ? (
          <li className={cn.SidebarLink}>
            <div className={cn.SidebarPhone}>
              <img className={cn.SidebarPhoneImage} src={phoneSrc} alt="phone" />
            </div>
            <a className={cn.SidebarText} href={getTelForLink(tel)} target="_blank">
              {tel}
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
};
