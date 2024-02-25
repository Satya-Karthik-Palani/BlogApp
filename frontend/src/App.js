import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import {Toaster} from "react-hot-toast"
import Home from "./components/Home";
import AddPost from './components/AddPost';
import EditPost from "./components/EditPost";
import Signup from './components/Signup';
import postContext from './utils/postContext';
import { useEffect,useState } from 'react';
import Post from './components/Post';

function App() {
  const [post,setPost]  = useState([]);
  const [currpost,setCurrpost]  = useState([]);
  const [theme,setTheme] = useState(null);

  useEffect(()=>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
    }
    else{
      setTheme('light');
    }
  },[])

  useEffect(()=>{
    if(theme==="dark"){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
  },[theme])
  const themeSwitchHandler = ()=>{
    setTheme(theme==="dark" ? "light" : "dark");
  }
  return (
      <div className="dark:bg-[#181a1b]">
        <postContext.Provider value={{post:post,setPost,currpost:currpost,setCurrpost}}>
          <Router>
            <Header themeSwitchHandler={themeSwitchHandler}/>
            <Routes>
              <Route exact path="/" element={<Home url={"posts"} />}></Route>
              <Route exact path="/me" element={<Home url={"posts/me"}/>}></Route>
              <Route exact path="/editpost/:id" element={<EditPost/>}></Route>
              <Route exact path="/post/:id" element={<Post/>}></Route>
              <Route exact path="/newpost" element={<AddPost/>}></Route>
              <Route exact path="/signup" element={<Signup isSignUp={true} />}></Route>
              <Route exact path="/signin" element={<Signup isSignUp={false}/>}></Route>
            </Routes>
          </Router>
          <Toaster/>
        </postContext.Provider>
      </div>
  );
}

export default App;
