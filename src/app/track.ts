import { Album } from "./album";
import { Artist } from "./artist";


export class Track implements Track {

    private ReleaseDate?: string;
    private Duration?: string;
    private TrackNumber?: number;
    private IsExplicit?: boolean;
    private Genres?: Array<string>;
    private Subgenres?: Array<string>;
    private Rights?: Array<string>;
    private Subtitle?: string;
    private Album?: Album;
    private Artists?: Array<{
        Role: string;
        Artist: Artist;
    }>

    private _Id?: string;
    private Name: string;
    private ImageUrl?: string;
    private Link: string;
    private Source: string;
    private CompatibleSources?: string

    constructor(name?: string){
        this.Name = name;
    }

	public get name(): string {
		return this.Name;
	}

	public set name(value: string) {
		this.Name = value;
	}

	public get link(): string {
		return this.Link;
	}

	public set link(value: string) {
		this.Link = value;
	}

	public get source(): string {
		return this.Source;
	}

	public set source(value: string) {
		this.Source = value;
	}

 


}
