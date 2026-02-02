import Main from './page/mainPage';
import SearchPage from './page/searchPage';
import MyBookPage from './page/myBookPage';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import SearchSkeleton from './components/Body/skeleton/SearchSkeleton';

function App() {
  return(
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/search' element={<Suspense fallback={<SearchSkeleton/>}><SearchPage/></Suspense>}/>
      <Route path='/mybook' element={<MyBookPage/>}/>
    </Routes>
  )
}

export default App;