import {Track} from './track';

export class Album {

    private Id: string;
    private Name: string;
    private ImageUrl: string;
    private Link: string;
	private Source: string;
	private Tracks: Array<Track>
    private CompatibleSources: string

    constructor(name: string){
        this.Name = name;
        this.Id = name;
    }

	public get tracks(): Array<Track> {
		return this.Tracks;
	}

	public set tracks(value: Array<Track>) {
		this.Tracks = value;
	}

	public get id(): string {
		return this.Id;
	}

	public set id(value: string) {
		this.Id = value;
	}

	public get name(): string {
		return this.Name;
	}

	public set name(value: string) {
		this.Name = value;
	}

	public get imageUrl(): string {
		return this.ImageUrl;
	}

	public set imageUrl(value: string) {
		this.ImageUrl = value;
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
