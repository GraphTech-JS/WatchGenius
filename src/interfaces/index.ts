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
  title: string;
  image: string;
  price: number | string;
  slug: string;
  id: number;
}

interface ISearchProps extends React.HTMLAttributes<HTMLInputElement> {
  type: "catalog";
  classNames?: string;
  searchList: IWatch[];
}

export type { Message, IMainContext, IWatch, ISearchProps };
