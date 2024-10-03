// UserData model adaptation for the External Api to retrieve random information and images for fictional person

export class UserData {
    results?: UserInfo[];
}

export class UserInfo{
    name?: UserName;
    picture?: UserPhotos;
}

export class UserName {
    title?: string;
    first?: string;
    last?: string;
}
export class UserPhotos {
    large?: string;
    medium?: string;
    thumbnail?: string;
}
