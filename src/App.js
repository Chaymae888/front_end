import logo from './logo.svg';
import './App.css';
import Sidebar from './componants/sidebar/Sidebar';
import Home from './componants/home/Home';
import About from './componants/about/About';
// import Resume from './componants/resume/Resume';
// import Services from './componants/services/Services';
// import Portfolio from './componants/portfolio/Portfolio';
// import Blog from './componants/blog/Blog';
// import Contact from './componants/contact/Contact';

const App = ()=> {
  return (
    <>
      <Sidebar />
      <main className='main'>
         {/* <Home /> */}
        <About />  
        {/*<Services />
        <Resume />
        <Portfolio /> 
        <Blog />
        <Contact /> */}
      </main>
    </>
  )
}

export default App;
