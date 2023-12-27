export const FM_API_URL = "https://api.faqmy.website/v1/";
export const KEY_LS_TOKEN = "fq-user";

export const WIDGET_URL = location.origin + "/widget/faqmy-widget-main.js";
// export const WIDGET_URL = "http://192.168.2.65:8005/faqmy-widget-main.js";

export const DEFAULT_WIDGET_LIST_COLOR: [
  string[],
  string[],
  string[],
  string[],
  string[]
] = [
  ["#F44336", "#E91E63", "#9C27B0", "#FF5722"],
  ["#673AB7", "#3F51B5", "#2196F3", "#FFEB3B"],
  ["#03A9F4", "#00BCD4", "#009688", "#FF9800"],
  ["#4CAF50", "#8BC34A", "#CDDC39", "#9E9E9E"],
  ["#607D8B", "#FFC107", "#795548", "#000000"],
];

export const DEFAULT_STACK_NAME = "Stack name";
export const DEFAULT_STACK_DESCRIPTION = "Stack description";
export const DEFAULT_STACK_INITIAL_QUESTION =
  "Hi there! Feel free to ask me any questions, I guarantee an instant response!";
export const DEFAULT_STACK_WIDGET_DELAY = 3000;

export const DEFAULT_STACK_WIDGET_COLOR = "#3F51B5";

export const INITIAL_CARDS: { question: string; answer: string }[] = [
  {
    question: "What does your company do in one line?",
    answer: "Our company provides professional cleaning services.",
  },
  {
    question: "What is your company name?",
    answer: "Our company name is Cleaning Express.",
  },
  {
    question: "Who do you primarily serve?",
    answer: "We primarily serve residential and commercial customers.",
  },
  {
    question: "What does the pricing look like for this?",
    answer:
      "Our pricing varies depending on the size of the job and the services requested.",
  },
  {
    question:
      "Whats the key benefit your customers receive by using your product or service?",
    answer:
      "The key benefit our customers receive by using our services is a clean and healthy environment.",
  },
  {
    question:
      "What is the primary customer service channel and contact email or phone?",
    answer:
      "Our primary customer service channel is email and our contact email is info@cleaningexpress.com.",
  },
];
