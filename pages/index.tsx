import Layout from 'components/Layout';
import Auth from 'components/Auth';

const Home: React.FC = () => {
  return (
    <Layout title='Login'>
      <Auth></Auth>
    </Layout>
  );
};

export default Home;
