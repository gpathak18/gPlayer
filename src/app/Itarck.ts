export interface Track {
    "ReleaseDate"?: string,
    "Duration"?: string,
    "TrackNumber"?,
    "IsExplicit"?,
    ["Genres"]?,
    ["Subgenres"]?,
    ["Rights"]?,
    "Subtitle"?: string,
    "Album"?: {
      "Id": string,
      "Name": string,
      "ImageUrl": string,
      "Link": string,
      "Source": string,
      "CompatibleSources": string
    },
    "Artists"?: [
      {
        "Role": string,
        "Artist": {
          "Id": string,
          "Name": string,
          "ImageUrl": string,
          "Link": string,
          "Source": string,
          "CompatibleSources": string
        }
      }
    ],
    "Id"?: string,
    "Name": string,
    "ImageUrl"?: string,
    "Link": string,
    "OtherIds"?: {
      "music.amg": string
    },
    "Source": string,
    "CompatibleSources"?: string
  }