import Navbar from '../../assets/views/common/Navbar.jsx'
import Body from '../../assets/views/common/Body.jsx'
import Perfect from '../../assets/views/common/Add_appartement.jsx'
import Appartement from '../../assets/views/common/appartement.jsx'
import Client from '../../assets/views/common/Client.jsx'
const index = () => {
  return (
    <>
     <Navbar></Navbar>  
    <Body></Body> 
    <Perfect></Perfect>
    <Client></Client>
    <Appartement></Appartement>
    </>
    )
}

export default index