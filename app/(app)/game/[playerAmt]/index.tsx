import Game from "@/components/Game";
import { PlayerAmt } from "@/components/Game";
import { router, useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

interface GameProps {
    params: {
        playerAmt: PlayerAmt;
    }
};

const GamePage = (props: GameProps) => {
    const { playerAmt } = useLocalSearchParams<{ playerAmt: string }>();

    const amount = Number(playerAmt);
    if (amount !== 1 && amount !== 2 && amount !== 3) {
        router.push('/menu');    
    }

    return (
        <Game playerAmt={amount as PlayerAmt}/>
    )
};

export default GamePage;