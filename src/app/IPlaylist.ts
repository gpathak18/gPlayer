import { Track } from "./Itarck";
export interface Playlist {
    "TrackCount": Number,
    "UserIsOwner": boolean,
    "IsHidden": boolean,
    "CollectionStateToken"?: string,
    "Tracks": {
      "Items": Array<Track>,
      "TotalItemCount": Number
    },
    "_id": string,
    "Name": string,
    "ImageUrl"?:string,
    "Link"?: string,
    "Source"?: string,
    "CompatibleSources"?:  string
}