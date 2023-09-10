export type SongRecord = {
    album : string;
    albumartist: string;
    artist: string;
    duration: string;
    index: string;
    title: string;
    tracknumber: string;
}

export type SongRecordMap = {
    [key: string]: SongRecord;
}