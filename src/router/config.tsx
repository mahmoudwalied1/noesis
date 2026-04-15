import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import NotFound from "../pages/NotFound";
import Auth from "../pages/auth/page";
import Splash from "../pages/splash/page";
import Home from "../pages/home/page";
import SmartNotes from "../pages/notes/page";
import AdaptiveQuizzes from "../pages/quizzes/page";
import SmartFlashcards from "../pages/flashcards/page";
import VisualMindMaps from "../pages/mindmaps/page";
import StudyRoom from "../pages/study-room/page";
import VoiceChat from "../pages/voice-chat/page";
import ShareNotes from "../pages/share-notes/page";
import QuizChallenges from "../pages/quiz-challenges/page";
import Performance from "../pages/performance/page";
import LiveDiscussions from "../pages/live-discussions/page";
import GlassesPreorder from "../pages/glasses-preorder/page";
import GlassesControls from "../pages/glasses-controls/page";
import MergeNotes from "../pages/merge-notes/page";
import ExportNotes from "../pages/export-notes/page";
import Glasses3D from "../pages/glasses-3d/page";

const VirtualTutor = lazy(() => import('../pages/virtual-tutor/page'));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/splash",
    element: <Splash />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/virtual-tutor",
    element: <VirtualTutor />,
  },
  {
    path: "/ai-explanations",
    element: <VirtualTutor />,
  },
  {
    path: "/notes",
    element: <SmartNotes />,
  },
  {
    path: "/quizzes",
    element: <AdaptiveQuizzes />,
  },
  {
    path: "/flashcards",
    element: <SmartFlashcards />,
  },
  {
    path: "/mindmaps",
    element: <VisualMindMaps />,
  },
  {
    path: "/study-room",
    element: <StudyRoom />,
  },
  {
    path: "/voice-chat",
    element: <VoiceChat />,
  },
  {
    path: "/share-notes",
    element: <ShareNotes />,
  },
  {
    path: "/quiz-challenges",
    element: <QuizChallenges />,
  },
  {
    path: "/performance",
    element: <Performance />,
  },
  {
    path: "/live-discussions",
    element: <LiveDiscussions />,
  },
  {
    path: "/glasses-preorder",
    element: <GlassesPreorder />,
  },
  {
    path: "/glasses-controls",
    element: <GlassesControls />,
  },
  {
    path: "/merge-notes",
    element: <MergeNotes />,
  },
  {
    path: "/export-notes",
    element: <ExportNotes />,
  },
  {
    path: "/glasses-3d",
    element: <Glasses3D />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
