import { useLoaderData } from 'react-router-dom';
import './Articles.css';

const API_KEY = import.meta.env.VITE_ARTICLES_API_KEY;

export async function loader() {
	const date = '2023-09-18';
	const data = await fetch(
		`https://newsapi.org/v2/everything?q=mental%20health&from=${date}&apiKey=${API_KEY}`
	);
	return data;
}

const Articles = () => {
	const { articles } = useLoaderData();
	let i = 0;
	console.log(articles);
	return (
		<>
			{articles.length ? (
				<div className='articles'>
					{articles.map((article) => (
						<div key={i++} className='article'>
							<div className='article-title'>{article.title}</div>
							<div className='description-container'>
								<p className='article-description'>{article.description}</p>
								{article.urlToImage && (
									<img className='article-img' src={article.urlToImage} />
								)}
							</div>
							<div className='meta-data'>
								By <span className='article-author'>{article.author}</span> on{' '}
								<span className='article-date'>{article.publishedAt}</span>
							</div>
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
