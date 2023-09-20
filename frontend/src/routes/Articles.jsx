import { Link, useLoaderData } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './styles/Articles.css';

const API_KEY = import.meta.env.VITE_ARTICLES_API_KEY;

export async function loader() {
	let currentDate = new Date();
	let yesterday = new Date(currentDate);
	yesterday.setDate(currentDate.getDate() - 1);
	const data = await fetch(
		`https://newsapi.org/v2/everything?q=mental%20health&from=${yesterday}&apiKey=${API_KEY}`
	);
	return data;
}

const Articles = () => {
	const { articles } = useLoaderData();
	let i = 0;
	return (
		<>
			{articles.length ? (
				<div className='articles'>
					{articles.map((article) => (
						<div key={i++} className='article'>
							<Link to={article.url}>
								<div className='article-title'>{article.title}</div>
								<div className='description-container'>
									<p className='article-description'>{article.description}</p>
									{article.urlToImage && (
										<img className='article-img' src={article.urlToImage} />
									)}
								</div>
								<div className='meta-data'>
									By <span className='article-author'>{article.author}</span>{' '}
									<span className='article-date'>
										{formatDistanceToNow(new Date(article.publishedAt), {
											addSuffix: true,
										})}
									</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			) : (
				<div className='title'>No articles availble</div>
			)}
		</>
	);
};

export default Articles;
