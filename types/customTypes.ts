interface socialData {
    title: string,
    url: string,
    icon: React.ElementType
}
interface buttonInterface {
    onClick: () => void;
    isActive: boolean;
    icon: React.ElementType;
  
}
interface Topic {
    title: string;
    description: string;
    icon: any;
    category: Array<string>;
    url: string;
}

interface JWTtokenInfo{
    id: string,
    email: string,
    role: string
}
interface UserProfileDetails{
    username: string,
    email: string,
    role: string,
    avatar: string,
    isVerified: boolean,
    token: number,
    firstName?: string,
    lastName?: string,
    _id?: string,
    __v?: number
}


export type { socialData,buttonInterface, Topic, JWTtokenInfo,UserProfileDetails }