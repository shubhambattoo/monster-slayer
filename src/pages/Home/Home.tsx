import Dialog from '@components/dialog/Dialog';
import { Container } from '@components/layout';
import axe from '@images/axe.png';
import potion from '@images/potion.png';
import surrender from '@images/surrender.png';
import sword from '@images/sword.png';
import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';

type State = {
  playerHealth: number;
  monsterHealth: number;
  turns: Array<{ player: string; text: string }>;
  spclAvailable: boolean;
};

function calcDamage(min: number, max: number) {
  return Math.max(Math.floor(Math.random() * max) + 1, min);
}

const Home: React.FC = () => {
  const [isModal, setIsModal] = useState(false);
  const [showTurns, setShowTurns] = useState(false);
  const [modalText, setModalText] = useState('You lost the game. New game?');
  const [state, setState] = useState<State>({
    playerHealth: 100,
    monsterHealth: 100,
    turns: [],
    spclAvailable: false,
  });

  useEffect(() => {
    if (state.monsterHealth <= 0) {
      setIsModal(true);
      setModalText('You won the game. New game?');
    } else if (state.playerHealth <= 0) {
      setIsModal(true);
      setModalText('You lost the game. New game?');
    }
  }, [state.playerHealth, state.monsterHealth]);

  function hit() {
    const damage = calcDamage(3, 10);
    setState((prevState) => {
      return {
        ...prevState,
        monsterHealth: prevState.monsterHealth - damage,
        turns: [
          {
            text: 'P1 hits the monster for ' + damage + ' damage.',
            player: 'P1',
          },
          ...prevState.turns,
        ],
      };
    });

    monsterAttack();
  }

  function attack() {
    const damage = calcDamage(4, 11);
    setState((prevState) => {
      return {
        ...prevState,
        monsterHealth: prevState.monsterHealth - damage,
        turns: [
          {
            text: 'P1 hits the monster for ' + damage + ' damage.',
            player: 'P1',
          },
          ...prevState.turns,
        ],
        spclAvailable: true,
      };
    });
    timeOut();

    monsterAttack();
  }

  function timeOut() {
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, spclAvailable: false }));
    }, 2000);
  }

  function heal() {
    if (state.playerHealth <= 90) {
      setState((prevState) => ({
        ...prevState,
        playerHealth: prevState.playerHealth + 10,
      }));
    } else {
      setState((prevState) => ({ ...prevState, playerHealth: 100 }));
    }
    setState((prevState) => ({
      ...prevState,
      turns: [{ text: 'P1 heals for 10', player: 'p1' }, ...prevState.turns],
    }));
    monsterAttack();
  }

  function monsterAttack() {
    const damage = calcDamage(5, 12);
    setState((prevState) => {
      return {
        ...prevState,
        playerHealth: prevState.playerHealth - damage,
        turns: [
          {
            text: 'Monster hits the player for ' + damage + ' damage.',
            player: 'Monster',
          },
          ...prevState.turns,
        ],
      };
    });
  }

  function resetGame() {
    setState({
      playerHealth: 100,
      monsterHealth: 100,
      turns: [],
      spclAvailable: false,
    });
    setIsModal(false);
    setModalText('');
  }

  function handleSuccess() {
    resetGame();
  }

  return (
    <>
      <Container>
        <div className="mt-[80px] flex w-[80%] flex-col rounded-md border-8 border-orange-200 bg-[rgba(4,27,66,.8)] p-6 text-center font-bold text-white sm:w-[50%]">
          <div className="text-[.685rem] text-white sm:text-[1.25rem]">
            Monster Health :{' '}
            {state.monsterHealth <= 0 ? 0 : state.monsterHealth}
          </div>
          <div className="m-auto mt-[15px] h-[35px] w-[80%] bg-[#eee] transition-[width]">
            <div
              className="m-0 h-[35px] w-[100%] bg-green-600 transition-[width]"
              style={{
                width: `${state.monsterHealth <= 0 ? 0 : state.monsterHealth}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="mt-[80px] flex w-[80%] flex-col rounded-md border-8 border-orange-200 bg-[rgba(4,27,66,.8)] p-6 text-center font-bold text-white sm:w-[50%]">
          <div className="text-[.685rem] text-white sm:text-[1.25rem]">
            Your Health : {state.playerHealth <= 0 ? 0 : state.playerHealth}
          </div>
          <div className="m-auto mt-[15px] h-[35px] w-[80%] bg-[#eee] transition-[width]">
            <div
              className="m-0 h-[35px] w-[100%] bg-green-600 transition-[width]"
              style={{
                width: `${state.playerHealth <= 0 ? 0 : state.playerHealth}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="mt-[40px] flex w-[100%] justify-between px-2 sm:w-[50%] sm:justify-evenly sm:px-0">
          <div className="flex flex-col items-center">
            <button
              onClick={hit}
              className="flex justify-center rounded-md border-[5px] border-orange-200 bg-[rgba(4,27,66,.67)] p-2"
            >
              <img
                src={sword}
                alt="sword icon which signifyes to hit"
                className="w-[30px] sm:w-[50px]"
              />
            </button>
            <div className="mt-3 text-[.65rem] uppercase text-white sm:text-[1rem]">
              Hit
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={attack}
              className="flex justify-center rounded-md border-[5px] border-orange-200 bg-[rgba(4,27,66,.67)] p-2 disabled:opacity-60"
              disabled={state.spclAvailable}
            >
              <img
                src={axe}
                alt="axe icon which signifyes to attack"
                className="w-[30px] sm:w-[50px]"
              />
            </button>
            <div className="mt-3 text-[.65rem] uppercase text-white sm:text-[1rem]">
              Attack
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={heal}
              className="flex justify-center rounded-md border-[5px] border-orange-200 bg-[rgba(4,27,66,.67)] p-2"
            >
              <img
                src={potion}
                alt="potion icon which signifyes to heal"
                className="w-[30px] sm:w-[50px]"
              />
            </button>
            <div className="mt-3 text-[.65rem] uppercase text-white sm:text-[1rem]">
              Heal
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={resetGame}
              className="flex justify-center rounded-md border-[5px] border-orange-200 bg-[rgba(4,27,66,.67)] p-2"
            >
              <img
                src={surrender}
                alt="white flag icon which signifyes to surrender"
                className="w-[30px] sm:w-[50px]"
              />
            </button>
            <div className="mt-3 text-[.65rem] uppercase text-white sm:text-[1rem]">
              Give up!
            </div>
          </div>
        </div>
        <div
          style={{
            height: showTurns ? '300px' : 'inherit',
            borderTop: '4px solid white',
            borderImage:
              'linear-gradient(to right, transparent 0%, rgba(255,255,255, .8) 50%, transparent 100%) 30',
          }}
          className="z-1000 duration-2000 fixed bottom-0 w-[75%] overflow-y-auto rounded-t-md bg-[rgba(4,27,66,.95)] transition-[height] ease-in-out sm:w-[50%]"
        >
          <div className="flex justify-center">
            <button
              className="cursor-pointer p-3 pt-5 text-[.8rem] uppercase text-white sm:text-[24px]"
              onClick={() => setShowTurns(!showTurns)}
            >
              Battle log
            </button>
          </div>

          {showTurns &&
            state.turns.map((turn, i) => {
              return (
                <p
                  className={clsx(
                    'mb-3 px-2 text-center text-[10px] sm:text-[12px]',
                    turn.player.toLowerCase() === 'p1' && 'text-green-400',
                    turn.player.toLowerCase() === 'monster' && 'text-red-400',
                  )}
                  key={i}
                >
                  {turn.text}
                </p>
              );
            })}
        </div>
      </Container>
      <Dialog show={isModal} onSuccess={handleSuccess} text={modalText} />
    </>
  );
};

export default Home;
