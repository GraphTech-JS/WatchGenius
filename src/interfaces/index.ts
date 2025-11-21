interface Message {
  content: string;
  by: "me" | "ai";
  id: number;
  time?: string;
  isSaved?: boolean;
  savedSearch?: {            
    searchTerm: string;
    filters: string[];         
  };
}

interface IMainContext {
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
  sideChatOpened: boolean;
  setSideChatOpened: (opened: boolean) => void;
  setMessages: (messages: Message[]) => void;
  setMessage: (message: Message) => void;
  message: Message;
  messages: Array<Message>;
  savedCatalogFilters: {
    searchTerm: string;
    filters: string[];
  } | null;
  setSavedCatalogFilters: (filters: { searchTerm: string; filters: string[] } | null) => void;
}

interface IWatch {
  id: number;
  slug: string;
  title?: string;
  image: string;
  brand: string;
  price: number;
  rating: number;
  changePercent: number;
  createdAt?: string;
  diameter?: number;
  description?: string;
  material?: string;
  waterResistance?: string;
  movement?: string;
  releaseYear?: string;
  caseMaterial?: string;
  strapMaterial?: string;
  features?: string[];
  chartData?: number[];
  chartColor?: string;
  chartId?: string;
  caliber?: string;
  index?: 'A' | 'B' | 'C'; 
}

interface ISearchProps extends React.HTMLAttributes<HTMLInputElement> {
  type: "catalog";
  classNames?: string;
  searchList: IWatch[];
}



export * from "./catalog";
export * from "./product";
export * from "./compare";
export * from "./watch";

export type { Message, IMainContext, IWatch, ISearchProps };
