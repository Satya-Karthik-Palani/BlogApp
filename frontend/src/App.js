import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import {Toaster} from "react-hot-toast"
import Home from "./components/Home";
import AddPost from './components/AddPost';
import EditPost from "./components/EditPost";
import Signup from './components/Signup';
import postContext from './utils/postContext';
import { useState } from 'react';
import Post from './components/Post';

function App() {
  const [post,setPost]  = useState([]);
  const [currpost,setCurrpost]  = useState([]);
  return (
      <div className="App">
        <postContext.Provider value={{post:post,setPost,currpost:currpost,setCurrpost}}>
          <Router>
            <Header/>
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
