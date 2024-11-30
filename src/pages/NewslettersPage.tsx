import SendNewsletter from '../components/newsletter/SendNewsletter';
import Subscribe from '../components/subscribe/Subscribe';
import Unsubscribe from '../components/unsubscribe/Unsubscribe';

const NewslettersPage: React.FC = () => {
  return (
    <>
      <Subscribe />
      <Unsubscribe />
      <SendNewsletter />
    </>
  );
};

export default NewslettersPage;
