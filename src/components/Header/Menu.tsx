import { useNavigate, useLocation } from "react-router-dom"

export default function Menu(){
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const isActive = (path:string)=>currentPath===path;

  return(
  <div className="h-full w-80 flex justify-center items-center 
  max-[1025px]:justify-end
  max-[426px]:w-40 max-[426px]:mr-2.5
">
    <button className={`h-10 w-10 cursor-pointer border-b-4 ml-2.5
    ${isActive("/")?"border-b-emerald-600 text-emerald-600":"border-b-white text-black"}
    `} 
    onClick={()=>{
      navigate('/')
    }}>홈</button>

    <button className={`h-10 w-15 cursor-pointer border-b-4 ml-2.5
    ${isActive("/search")?"border-b-emerald-600 text-emerald-600":"border-b-white text-black"}
    `} onClick={()=>{
      navigate(`/search?page=1`);
    }}>책 검색</button>
    <button className={`h-10 w-15 cursor-pointer border-b-4 ml-2.5 mr-5
    ${isActive("/mybook")?"border-b-emerald-600 text-emerald-600":"border-b-white text-black"}
    max-[426px]:mr-0
    `} onClick={()=>{
      navigate('/mybook?sort=reading&page=1');
    }}>내 책장</button>
  </div>
  )
  
  
}