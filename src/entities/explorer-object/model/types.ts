export type FileSystemObject = {
    id: string,
    type: "File" | "Folder",
    name: string,
    sizeInBytes: number,
    createdAt: string,
    isFavorite: boolean,
}

export type FileModel = {
    description: string
} & FileSystemObject

export type FolderModel = {
    content: FileSystemObject[]
} & FileSystemObject