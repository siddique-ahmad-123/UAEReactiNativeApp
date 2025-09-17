import { Redirect } from "expo-router";
import CarouselWithLeftRightPartialVisible from "./selfMade";

export default function Index() {
  return <Redirect href="/(main)/onboarding" />;
  // return <CarouselWithLeftRightPartialVisible/>
}