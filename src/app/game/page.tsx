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
    <div className="flex flex-col items-center h-screen gap-4">
      {cards[0].name}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          zIndex: -1,
          filter: "blur(100px)",
          transform: "rotate(-180deg)",
          backgroundImage: `url(${leaderSelected.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      <section
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
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
          }}
        >
          <div
            className="flex items-center gap-6"
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
  );
};

export default GameScreen;
