import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function NavBar() {
	return (
		<div className='navbar'>
			<div className='logo-text'>Manosukari</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='assesment'>Assesment</Link>
					</li>
					<li>
						<Link to='about'>About</Link>
					</li>
					<li>
						<Link to='therapists'>Therapist Directory</Link>
					</li>
					<li>
						<Link to='faq'>FAQ</Link>
					</li>
					<li>
						<Link to='assesment'>Assesment</Link>
					</li>
					<li>
						<Link to='feedback'>Feedback</Link>
					</li>
					<li>
						<Link to='login'>Login</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default NavBar;
