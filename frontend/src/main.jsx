import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page.jsx';

// Routes
import Login from './routes/Login.jsx';
import Feedback from './routes/FeedBack.jsx';
import FAQ from './routes/FAQ.jsx';
import About from './routes/About.jsx';
import Articles, { loader as articlesLoader } from './routes/Articles.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Articles />,
				loader: articlesLoader,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'feedback',
				element: <Feedback />,
			},
			{
				path: 'faq',
				element: <FAQ />,
			},
			{
				path: 'about',
				element: <About />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
