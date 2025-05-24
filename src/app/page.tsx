/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCardSelection } from "@/contexts/card_selection_context";
import { useRouter } from "next/navigation";

const HomeScreen = () => {
  const {
    leaderCards,
    leaderSelected,
    includeAgora,
    includePantheon,
    setIncludeAgora,
    setIncludePantheon,
    setLeaderSelected,
  } = useCardSelection();

  const navigation = useRouter();

  return (
    <div className="flex flex-col items-center h-screen gap-4">
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
          <span className="text-2xl font-bold text-center">
            Elegí a tu rival
          </span>
          <Separator />
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-[50%] h-[50%] max-w-[350px] max-h-[500px]"
            loop
            direction="horizontal"
            allowSlideNext={false}
            onRealIndexChange={(swiper) => {
              swiper.allowTouchMove = false;
              swiper.unsetGrabCursor();
              const selectedCard = leaderCards[swiper.realIndex];
              setLeaderSelected(selectedCard);
            }}
            onTouchEnd={(swiper) => {
              swiper.allowTouchMove = true;
            }}
          >
            {leaderCards.map((card) => (
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
          <Separator />
          <section className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center justify-center gap-2">
                Incluír Agora
                <Switch
                  checked={includeAgora}
                  onCheckedChange={setIncludeAgora}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                Incluír Pantheon
                <Switch
                  checked={includePantheon}
                  onCheckedChange={setIncludePantheon}
                />
              </div>
            </div>

            <Button
              onClick={() => {
                navigation.replace("/game");
              }}
            >
              Continuar
            </Button>
          </section>
        </Card>
      </section>
    </div>
  );
};

export default HomeScreen;
