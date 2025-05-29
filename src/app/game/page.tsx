/* eslint-disable @next/next/no-img-element */
"use client";

import React, { startTransition, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { Card } from "@/components/ui/card";
import { useCardSelection } from "@/contexts/card_selection_context";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "../../contexts/card_selection_context";
import { Spotlight } from "@/components/ui/spotlight-new";

const GameScreen = () => {
  const { actionCards, leaderSelected, resetAll } = useCardSelection();
  const navigation = useRouter();

  const [cards, setCards] = React.useState(shuffleArray(actionCards));
  const [swiperKey, setSwiperKey] = React.useState(0);

  useEffect(() => {
    setCards(shuffleArray(actionCards));
    setSwiperKey((prev) => prev + 1);
  }, [actionCards]);

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 z-50 pointer-events-none">
        <Spotlight
          width={window.innerWidth}
          height={window.innerHeight}
          gradientFirst="radial-gradient(
                rgba(255, 255, 255, 0.1) 0%,
                rgba(141, 12, 233, 0.04) 50%,
                rgba(210, 100, 45, 0.0) 80%
              )"
        />
      </div>
      <div className="flex flex-col items-center gap-4 h-full w-full">
        <section
          style={{
            width: "100svw",
            height: "100svh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            maxWidth: "1024px",
          }}
        >
          <Card
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "20px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div
              className="flex items-center gap-6 flex-wrap justify-center"
              style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
            >
              <img
                src={leaderSelected.image}
                alt={leaderSelected.name}
                draggable={false}
                style={{
                  maxWidth: "200px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              />

              <Swiper
                key={swiperKey}
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="w-[50%] h-[50%] max-w-[350px] max-h-[500px]"
                loop
                direction="horizontal"
                allowSlideNext={false}
                onRealIndexChange={(swiper) => {
                  if (swiper.realIndex === 0) {
                    startTransition(() => {
                      setCards(shuffleArray(cards));
                      setSwiperKey((prev) => prev + 1);
                    });
                  }
                }}
              >
                {cards.map((card) => (
                  <SwiperSlide
                    key={card.name}
                    className="bg-transparent border-2 rounded-[10px] border-[#0000004b] shadow-[0_0_10px_#0000005f]"
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      draggable={false}
                      className="w-full h-full object-fill rounded-lg pointer-none"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Separator />
            <Button
              onClick={() => {
                startTransition(() => {
                  resetAll();
                  navigation.push("/");
                });
              }}
            >
              Volver
            </Button>
          </Card>
        </section>
      </div>
    </>
  );
};

export default GameScreen;
