import Header from '@/components/Header';
import Popup from '@/components/Popup';
import PopupButton from '@/components/PopupButton';
import PopupTitle from '@/components/PopupTitle';

export default function Home() {
 return (
  <>
   <Header />
   <Popup />
   <PopupButton buttonLeft="left" buttonRight="right" />
   <PopupTitle />
  </>
 );
}
