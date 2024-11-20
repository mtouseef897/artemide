"use client";

import animation from "@/animation";
import AnimatedContainer from "@/components/AnimatedContainer";
import { usePage } from "@/context/PageContext";
import Page1 from "@/screens/Page1";
import Page2 from "@/screens/Page2";
import Page3 from "@/screens/Page3";
import Page4 from "@/screens/Page4";
import Page5 from "@/screens/Page5";
import Page6 from "@/screens/Page6";
import Page7 from "@/screens/Page7";
import Page8 from "@/screens/Page8";
import WelcomeScreen from "@/screens/WelcomeScreen";

export default function Event() {
  const { pageNumber, updatePageNumber } = usePage();

  return (
    <>



      {pageNumber === 0 && <WelcomeScreen />}
      <AnimatedContainer
        trigger={pageNumber === 1}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page1 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 2}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page2 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 3}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page3 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 4}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page4 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 5}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page5 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 6}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page6 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 7}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page7 />
      </AnimatedContainer>
      <AnimatedContainer
        trigger={pageNumber === 8}
        animation={animation.fadeInOut}
        className="flex-1 flex "
      >
        <Page8 />
      </AnimatedContainer>


      
      
    </>
  );
}
