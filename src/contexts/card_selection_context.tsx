import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  startTransition,
} from "react";

export type Card = {
  name: string;
  type: string;
  image: string;
  exclude: string[];
};

export const CARDS_BASE_GAME = [
  {
    name: "Leader 1",
    type: "LEADER",
    image: "/cards/base/card_leader_1.png",
    exclude: [],
  },
  {
    name: "Leader 2",
    type: "LEADER",
    image: "/cards/base/card_leader_2.png",
    exclude: [],
  },
  {
    name: "Leader 3",
    type: "LEADER",
    image: "/cards/base/card_leader_3.png",
    exclude: [],
  },
  {
    name: "Leader 4",
    type: "LEADER",
    image: "/cards/base/card_leader_4.png",
    exclude: [],
  },
  {
    name: "Leader 5",
    type: "LEADER",
    image: "/cards/base/card_leader_5.png",
    exclude: [],
  },
  {
    name: "Action 1",
    type: "ACTION",
    image: "cards/base/card_action_1.png",
    exclude: ["AGORA"],
  },
  {
    name: "Action 2",
    type: "ACTION",
    image: "cards/base/card_action_2.png",
    exclude: ["AGORA"],
  },
  {
    name: "Action 3",
    type: "ACTION",
    image: "cards/base/card_action_3.png",
    exclude: ["AGORA"],
  },
  {
    name: "Action 4",
    type: "ACTION",
    image: "cards/base/card_action_4.png",
    exclude: ["AGORA"],
  },
  {
    name: "Action 5",
    type: "ACTION",
    image: "cards/base/card_action_5.png",
    exclude: [],
  },
  {
    name: "Action 6",
    type: "ACTION",
    image: "cards/base/card_action_6.png",
    exclude: ["PANTHEON"],
  },
  {
    name: "Action 7",
    type: "ACTION",
    image: "cards/base/card_action_7.png",
    exclude: ["AGORA"],
  },
  {
    name: "Action 8",
    type: "ACTION",
    image: "cards/base/card_action_8.png",
    exclude: ["PANTHEON"],
  },
  {
    name: "Action 9",
    type: "ACTION",
    image: "cards/base/card_action_9.png",
    exclude: [],
  },
  {
    name: "Action 10",
    type: "ACTION",
    image: "cards/base/card_action_10.png",
    exclude: [],
  },
  {
    name: "Action 11",
    type: "ACTION",
    image: "cards/base/card_action_11.png",
    exclude: ["PANTHEON"],
  },
  {
    name: "Action 12",
    type: "ACTION",
    image: "cards/base/card_action_12.png",
    exclude: [],
  },
];

export const CARDS_AGORA_GAME = [
  {
    name: "Leader A1",
    type: "LEADER",
    image: "/cards/agora/card_leader_1.png",
    exclude: [],
  },
  {
    name: "Action A1",
    type: "ACTION",
    image: "/cards/agora/card_action_1.png",
    exclude: [],
  },
  {
    name: "Action A2",
    type: "ACTION",
    image: "/cards/agora/card_action_2.png",
    exclude: [],
  },
  {
    name: "Action A3",
    type: "ACTION",
    image: "/cards/agora/card_action_3.png",
    exclude: [],
  },
  {
    name: "Action A4",
    type: "ACTION",
    image: "/cards/agora/card_action_4.png",
    exclude: [],
  },
  {
    name: "Action A5",
    type: "ACTION",
    image: "/cards/agora/card_action_5.png",
    exclude: [],
  },
];

export const CARDS_PANTHEON_GAME = [
  {
    name: "LeaderP1",
    type: "LEADER",
    image: "/cards/pantheon/card_leader_1.png",
    exclude: [],
  },
  {
    name: "Leader P2",
    type: "LEADER",
    image: "/cards/pantheon/card_leader_2.png",
    exclude: [],
  },
  {
    name: "Leader P3",
    type: "LEADER",
    image: "/cards/pantheon/card_leader_3.png",
    exclude: [],
  },
  {
    name: "Action P1",
    type: "ACTION",
    image: "/cards/pantheon/card_action_1.png",
    exclude: [],
  },
  {
    name: "Action P2",
    type: "ACTION",
    image: "/cards/pantheon/card_action_2.png",
    exclude: [],
  },
  {
    name: "Action P3",
    type: "ACTION",
    image: "/cards/pantheon/card_action_3.png",
    exclude: [],
  },
];

export enum CARD_GAME_TYPE {
  LEADER = "LEADER",
  ACTION = "ACTION",
}

export const getCardsByType = (deck: Card[], cardType: CARD_GAME_TYPE) =>
  deck.filter((card) => card.type === cardType);

export const filterBaseDeckByExpansions = (
  deck: Card[],
  activeExpansions: string[]
): Card[] => {
  return deck.filter(
    (card) => !card.exclude?.some((ex) => activeExpansions.includes(ex))
  );
};

export const mergeExpansionCards = (
  deck: Card[],
  expansionCards: Card[],
  isActive: boolean
): Card[] => {
  if (isActive) {
    return [
      ...deck.filter(
        (card) => !expansionCards.some((expCard) => expCard.name === card.name)
      ),
      ...expansionCards,
    ];
  } else {
    return deck.filter(
      (card) => !expansionCards.some((expCard) => expCard.name === card.name)
    );
  }
};

export const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

interface CardSelectionContextProps {
  leaderCards: Card[];
  actionCards: Card[];
  leaderSelected: Card;
  includeAgora: boolean;
  includePantheon: boolean;
  setIncludeAgora: (checked: boolean) => void;
  setIncludePantheon: (checked: boolean) => void;
  setLeaderSelected: (card: Card) => void;
  resetAll: () => void;
}

const CardSelectionContext = createContext<
  CardSelectionContextProps | undefined
>(undefined);

export const CardSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [leaderSelected, setLeaderSelected] = useState(
    getCardsByType(CARDS_BASE_GAME, CARD_GAME_TYPE.LEADER)[0]
  );
  const [includeAgora, setIncludeAgoraState] = useState(false);
  const [includePantheon, setIncludePantheonState] = useState(false);

  const [activeExpansions, setActiveExpansions] = useState<string[]>([]);

  const handleIncludeAgora = (checked: boolean) => {
    startTransition(() => {
      setIncludeAgoraState(checked);
      setActiveExpansions((prev) => {
        if (checked) return [...new Set([...prev, "AGORA"])];
        return prev.filter((e) => e !== "AGORA");
      });
    });
  };

  const handleIncludePantheon = (checked: boolean) => {
    startTransition(() => {
      setIncludePantheonState(checked);
      setActiveExpansions((prev) => {
        if (checked) return [...new Set([...prev, "PANTHEON"])];
        return prev.filter((e) => e !== "PANTHEON");
      });
    });
  };

  let filteredLeaders = filterBaseDeckByExpansions(
    getCardsByType(CARDS_BASE_GAME, CARD_GAME_TYPE.LEADER),
    activeExpansions
  );
  let filteredActions = filterBaseDeckByExpansions(
    getCardsByType(CARDS_BASE_GAME, CARD_GAME_TYPE.ACTION),
    activeExpansions
  );

  filteredLeaders = mergeExpansionCards(
    mergeExpansionCards(
      filteredLeaders,
      CARDS_AGORA_GAME.filter((c) => c.type === CARD_GAME_TYPE.LEADER),
      includeAgora
    ),
    CARDS_PANTHEON_GAME.filter((c) => c.type === CARD_GAME_TYPE.LEADER),
    includePantheon
  );

  filteredActions = mergeExpansionCards(
    mergeExpansionCards(
      filteredActions,
      CARDS_AGORA_GAME.filter((c) => c.type === CARD_GAME_TYPE.ACTION),
      includeAgora
    ),
    CARDS_PANTHEON_GAME.filter((c) => c.type === CARD_GAME_TYPE.ACTION),
    includePantheon
  );

  const resetAll = () => {
    setLeaderSelected(
      getCardsByType(CARDS_BASE_GAME, CARD_GAME_TYPE.LEADER)[0]
    );
    setIncludeAgoraState(false);
    setIncludePantheonState(false);
    setActiveExpansions([]);
  };

  const value = useMemo(
    () => ({
      leaderCards: filteredLeaders,
      actionCards: filteredActions,
      leaderSelected,
      includeAgora,
      includePantheon,
      resetAll,
      setIncludeAgora: handleIncludeAgora,
      setIncludePantheon: handleIncludePantheon,
      setLeaderSelected,
    }),
    [
      filteredLeaders,
      filteredActions,
      leaderSelected,
      includeAgora,
      includePantheon,
    ]
  );

  return (
    <CardSelectionContext.Provider value={value}>
      {children}
    </CardSelectionContext.Provider>
  );
};

export const useCardSelection = () => {
  const context = useContext(CardSelectionContext);
  if (!context)
    throw new Error(
      "useCardSelection debe usarse dentro de CardSelectionProvider"
    );
  return context;
};
