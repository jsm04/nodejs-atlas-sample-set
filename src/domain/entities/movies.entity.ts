export interface Movies {
	_id: Id
	plot: string
	genres: string[]
	runtime: number
	cast: string[]
	poster: string
	title: string
	fullplot: string
	languages: string[]
	released: Released
	directors: string[]
	rated: string
	awards: Awards
	lastupdated: string
	year: number
	imdb: Imdb
	countries: string[]
	type: string
	tomatoes: Tomatoes
	num_mflix_comments: number
}

export interface Id {
	$oid: string
}

export interface Released {
	$date: Date
}

export interface Date {
	$numberLong: string
}

export interface Awards {
	wins: number
	nominations: number
	text: string
}

export interface Imdb {
	rating: number
	votes: number
	id: number
}

export interface Tomatoes {
	viewer: Viewer
	fresh: number
	critic: Critic
	rotten: number
	lastUpdated: LastUpdated
}

export interface Viewer {
	rating: number
	numReviews: number
	meter: number
}

export interface Critic {
	rating: number
	numReviews: number
	meter: number
}

export interface LastUpdated {
	$date: string
}
