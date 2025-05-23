import { Tag } from "@/entities/tags"

export type FileSystemObject = {
    id: string,
    type: "File" | "Folder",
    name: string,
    sizeInBytes: number,
    createdAt: string,
    isFavorite: boolean,
    tags: Tag[],
    comments: Commentary[],
    parentFolderId: string
}

export type FileModel = {
    description: string
    ownershipType: FileOwnership,
    fileObjectRights: FileRights,
} & FileSystemObject

export enum FileRights {
    None = 0,
    
    Read = 1 << 0, 
    Update = 1 << 1, 
    Delete = 1 << 2, 
}

export enum FileOwnership {
    Unknown = 0,

    Owner = 1,
    Shared = 2,
}

export type FolderModel = {
    content: FileSystemObject[]
    objectsCount: number
} & FileSystemObject

export type CountObjects = {
    countBytesTotal: number,
    countQuantityTotal: number,
}

export type Commentary = {
    id: string, 
    content: string,
    createdAt: string,
    username: string
}

export enum ShareRights {
    None = 0,
    Read = 1 << 0, 
    Write = 1 << 1, 
    Delete = 1 << 2, 
  }

export type ShareLink = {
    id: string;
    daysToExpire: number;
    fileRights: ShareRights; 
};