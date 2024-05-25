import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";

// describes the props that this component expects
interface Props{
  children : React.ReactNode;  //since we accept react component here
}

const Layout = ({children}: Props) => { //destructuring the props
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
