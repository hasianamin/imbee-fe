import { Metadata } from "next";
import QuestionPage from "./components/questions/QuestionPage";

export const metadata: Metadata = {
  title: "Imbee - Test",
};

export default function Home() {
  return <QuestionPage />;
}
