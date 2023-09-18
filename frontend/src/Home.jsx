import './Home.css';
import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<NavBar />
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default Home;
