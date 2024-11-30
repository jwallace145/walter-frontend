import SendNewsletter from '../components/newsletter/SendNewsletter';
import Subscribe from '../components/subscribe/Subscribe';

const NewslettersPage: React.FC = () => {
  return (
    <>
      <Subscribe />
      <SendNewsletter />
    </>
  );
};

export default NewslettersPage;
