import React, {useState, useEffect} from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
import wordsToNumbers from 'words-to-numbers';

const myAlanKey = "9f73f61c5a3dcaa028cc1a7442aac10d2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {

	const [newsArticles, setNewsArticles] = useState([]);
	const [activeArticle, setActiveArticle] = useState(-1);
	const classes = useStyles();

	useEffect(()=>{

		alanBtn({
			key: myAlanKey,
			onCommand: ({command, articles, number}) => {       //{command} = commandData ==> command = commandData.command
				if (command === 'newHeadlines') {
					setNewsArticles(articles);
					setActiveArticle(-1);
				} else if (command === 'highlight') {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
				} else if (command === 'open') {
					const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
					const article =  articles[parsedNumber - 1];

					if (parsedNumber > 20 ) {
						alanBtn().playText('Sorry, something went wrong. Please try again');
					} else if (article) {
						window.open(article.url, '_blank');
						alanBtn().playText('Opening the article.');
					}
					
				}
			}
		});

	}, []);

	return(
		<div>
			<div className={classes.logoContainer} >
				<img src="https://c.pxhere.com/images/79/9a/2825859c59c31cde36b5104b5552-1437789.jpg!d" className={classes.newsLogo} alt="News Logo"/>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle}/>
		</div>
	);
}

export default App; 