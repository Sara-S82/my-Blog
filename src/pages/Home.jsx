import { Container } from '@mui/material';
import Navbar from '../components/Navbar'
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import { Helmet } from 'react-helmet';
import PostCard from '../components/PostCard';
function Home() {


  return(
<>
<Helmet>
  <title>Home</title>
</Helmet>
<Container disableGutters sx={{
  padding:0,
  backgroundColor:'#f0f4ff'
 ,
 width:'100%'
}}>

<Navbar></Navbar>

<PostCard />
</Container>
</>

  );
  
}
export default Home;