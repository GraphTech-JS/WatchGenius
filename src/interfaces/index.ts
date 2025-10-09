interface Message {
  content: string;
  by: "me" | "ai";
  id: number;
}

interface IMainContext {
  menuOpened: boolean;
  setMenuOpened: (opened: boolean) => void;
  setMessages: (messages: Message[]) => void;
  setMessage: (message: Message) => void;
  message: Message;
  messages: Array<Message>;
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
}

interface ISearchProps extends React.HTMLAttributes<HTMLInputElement> {
  type: "catalog";
  classNames?: string;
  searchList: IWatch[];
}


interface SortButtonsProps{
  selectedIndex?: string | null;
  onButtonClick?: (button: string | null) => void;
}
export type { Message, IMainContext, IWatch, ISearchProps, SortButtonsProps };
