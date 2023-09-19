import './Articles.css';

const API_KEY = import.meta.env.ARTICLES_API_KEY;

export async function loader() {
	const data = await fetch(`https://newsapi.org/v2/everything?q=mentalhealth&apiKey=${API_KEY}`);
	console.log(data);
}

const Articles = () => {
	return (
		<>
			<div className='articles'>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
				<div className='article'>
					<div className='title'>Tittle</div>
					<div className='description'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi
						ratione eos deserunt voluptas eius necessitatibus laborum deleniti
						voluptatibus. Cumque odio labore atque minus iusto, voluptates
						officiis. Totam, necessitatibus facilis?
					</div>
					<div className='author'>By Author</div>
				</div>
			</div>
		</>
	);
};

export default Articles;
