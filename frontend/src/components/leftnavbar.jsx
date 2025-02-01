import { Link } from "react-router-dom";
const Leftbar = ()=>{
    return ( 
        <div>
            <div className="h-screen w-1/4 min-w-[250px] bg-gray-800 text-white p-4  ">
    {/* Left Screen  Content*/}
    <div className=' hover:bg-gray-900 hover:rounded-xl hover:p-1 '>
    <Link to={'/home'} className='w-full block' >Home</Link></div>
    <div className='hover:bg-gray-900 hover:rounded-xl hover:p-1 my-2'>
    <Link to={'/Create'} className='w-full block' >Create</Link> </div>

  </div>
        </div>
    )
}
export default Leftbar;