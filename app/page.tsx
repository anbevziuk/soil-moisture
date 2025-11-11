import Layout from './styles';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

export default function Home() {
  return (
    <Layout>
      <Header/>
      <main>
        <Main/>
      </main>
      <Footer/>
    </Layout>
  );
}
