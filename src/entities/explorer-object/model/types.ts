import { Tag } from "@/entities/tags"

export type FileSystemObject = {
    id: string,
    type: "File" | "Folder",
    name: string,
    sizeInBytes: number,
    createdAt: string,
    isFavorite: boolean,
    tags: Tag[]
}

export type FileModel = {
    description: string
} & FileSystemObject

export type FolderModel = {
    content: FileSystemObject[]
    objectCount: number
} & FileSystemObject