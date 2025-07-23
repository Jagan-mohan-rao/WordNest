import { Children, StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/users/UserProfile.jsx'
import Articles from './components/common/Articles.jsx'
import ArticleById from './components/common/ArticleById.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import UserAuthorContext2,{UACobj} from './contexts/UserAuthorContext2.jsx'
import PostArticles from './components/author/PostArticles.jsx'
import Adminprofile from './components/admin/Adminprofile.jsx';


const browserRouterObj =createBrowserRouter([{
path:'/',
element:<RootLayout/>,
children:[
{
path:'',
element:<Home/>
},
{
path:'Signin',
element:<Signin/>
},
{
path:'Signup',
element:<Signup/>
},
{
path:'UserProfile/:email',
element:<UserProfile/>,
children:[
{
  path:'Articles',
  element:<Articles/>
},
{
  path:':ArticleById',
  element:<ArticleById/>
},
{
  path:'',
  element:<Navigate to="Articles"/>
}       
]
},
{
path:'AuthorProfile/:email',
element:<AuthorProfile/>,
children:[
{
  path:'Articles',
  element:<Articles/>
},
{
  path:':ArticleById',
  element:<ArticleById/>
},
{
  path:'article',
  element:<PostArticles/>
},
{
  path:'',
  element:<Navigate to="Articles"/>
}       

]
},
{
  path:'Adminprofile',
  element:<Adminprofile/>
}

]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext2>
      <RouterProvider router={browserRouterObj} />
    </UserAuthorContext2>
  </StrictMode>
)
