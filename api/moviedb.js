import axios from "axios";
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const apiBaseUrl = "https://api.themoviedb.org/3";

// endpoints
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;

// dynamic endpoints
const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = (id) => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// search endpoints
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

// person endpoints
const personDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMovieEndpoint = (id) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

export const image500 = (path) => (path ? `https://image.tmdb.org/t/p/w500${path}` : null);
export const image342 = (path) => (path ? `https://image.tmdb.org/t/p/w342${path}` : null);
export const image185 = (path) => (path ? `https://image.tmdb.org/t/p/w185${path}` : null);

const apiCall = async (endpoint, params) => {
	const options = {
		method: "GET",
		url: endpoint,
		params: params ? params : {},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.log("error", error);
		return {};
	}
};

export const fetchTrendingMovies = () => {
	return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
	return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
	return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = (movie_id) => {
	return apiCall(movieDetailsEndpoint(movie_id));
};

export const fetchMovieCredits = (movie_id) => {
	return apiCall(movieCreditsEndpoint(movie_id));
};

export const fetchSimilarMovies = (movie_id) => {
	return apiCall(similarMoviesEndpoint(movie_id));
};

export const fetchPersonDetails = (person_id) => {
	return apiCall(personDetailsEndpoint(person_id));
};

export const fetchPersonMovies = (person_id) => {
	return apiCall(personMovieEndpoint(person_id));
};

export const fetchSearchedMovies = (params) => {
	return apiCall(searchMoviesEndpoint, params);
};
