import React from "react";
import {
  Folder,
  ClipboardList,
  StickyNote,
  Trophy,
  Flag,
  BellRing,
} from "lucide-react";
import CreateNewComponent from "@/components/ui/create-new";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import PageTitle from "@/components/PageTitle";

export const metadata = {
  title: "Create  | Fyrre Magazine",
  description: "Ceate your own artical, writers, editors and artists",
};
const actionItems = [
  {
    link: "https://easyui.pro",
    icon: <Folder />,
    name: "Project",
  },
  {
    link: "/task",
    icon: <ClipboardList />,
    name: "Task",
  },
  {
    link: "/note",
    icon: <StickyNote />,
    name: "Note",
  },
  {
    link: "/goal",
    icon: <Trophy />,
    name: "Goal",
  },
  {
    link: "/milestone",
    icon: <Flag />,
    name: "Milestone",
  },
  {
    link: "/reminder",
    icon: <BellRing />,
    name: "Reminder",
  },
];

function HomePage() {
  return (
    <BackgroundBeamsWithCollision>
      <div>
        <PageTitle
          className="sr-only"
          imgSrc="/images/titles/Create.svg"
          imgAlt="The word 'Magazine' in bold, uppercase lettering"
        >
          Create
        </PageTitle>
        <CreateNewComponent actions={actionItems} />
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default HomePage;
