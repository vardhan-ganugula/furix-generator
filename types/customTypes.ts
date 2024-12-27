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
export type { socialData,buttonInterface, Topic }