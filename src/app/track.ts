import { Album } from './album';
import { Artist } from './artist';


export class Track implements Track {

    private ReleaseDate?: string;
    private Duration?: string;
    private TrackNumber: number;
    private IsExplicit?: boolean;
    private Genres?: Array<string>;
    private Subgenres?: Array<string>;
    private Rights?: Array<string>;
    private Subtitle?: string;
    private Album: Album;
    private Artist?: string;
    private Artists?: Array<{
        Role: string;
        Artist: Artist;
    }>;

    private _Id: string;    
    private Name: string;
    private ImageUrl?: string;
    private Image: any;
    private Link: string;
    private Source: string;
	private CompatibleSources?: string;
    private Rating?: number;
    private Year: number;

    constructor(name?: string) {
        this.Name = name;
        this.Rating = 0;
    }


	public get id(): string {
		return this._Id;
	}

	public set id(value: string) {
		this._Id = value;
	}
    
    public get trackNumber(): number {
        return this.TrackNumber;
    }

    public set trackNumber(value: number) {
        this.TrackNumber = value;
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

    public get artist(): string {
		return this.Artist;
	}

	public set artist(value: string) {
		this.Artist = value;
	}
    
    public get rating(): number {
        return this.Rating;
    }
    
    public set rating(value: number) {
        this.Rating = value;
    }

    public get image(): any {
		return this.Image;
	}

	public set image(value: any) {
		this.Image = value;
    }
    
	public get album(): Album {
		return this.Album;
	}

	public set album(value: Album) {
		this.Album = value;
    }
    
    public get year(): number {
		return this.Year;
	}

	public set year(value: number) {
		this.Year = value;
	}
}
