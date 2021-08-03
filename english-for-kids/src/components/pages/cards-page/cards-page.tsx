import React, { useEffect, useState } from 'react';
import './cards-page.css';
import { useLocation } from 'react-router-dom';
import { CardsBoard } from './cards-board/cards-board';
import { Card, Cards } from '../../../shared/interfaces';
import { GameButton } from './game-button/game-button';
import { getCardsFromApi } from '../../../shared/api';

type CardsPageProps = {
  toFinish(): void;
};

const CORRECT_AUDIO_SRC = '/cards/audio/correct.mp3';
const ERROR_AUDIO_SRC = '/cards/audio/error.mp3';
const WIN_AUDIO_SRC = '/cards/audio/success.mp3';
const FINISH_AUDIO_SRC = '/cards/audio/failure.mp3';

export const CardsPage: React.FC<CardsPageProps> = (props: CardsPageProps) => {
  const [cards, setCards] = useState([]);
  const location = useLocation();

  let path = location.pathname;

  const [title, setTitle] = useState('');

  useEffect(() => {
    const updateCards = async () => {
      const data = await getCardsFromApi();

      const cardsType: Cards | undefined = data.find((item: Cards) => item.href === path);

      if (cardsType) {
        setCards(cardsType.cards.map((item: Card) => item) as never);
        setTitle(cardsType.type);
      }
    };

    const newPath = location.pathname;
    path = newPath;

    updateCards();
  }, [location.pathname]);

  const [gameStatus, setGameStatus] = useState(false);
  const [audioForPlay, setAudioForPlay] = useState('');
  const cardsAudio = cards.map((card: Card) => card.audio);

  const audio = new Audio();
  const correctAudio = new Audio();
  const errorAudio = new Audio();
  const winAudio = new Audio();
  const finishAudio = new Audio();

  correctAudio.src = CORRECT_AUDIO_SRC;
  errorAudio.src = ERROR_AUDIO_SRC;
  winAudio.src = WIN_AUDIO_SRC;
  finishAudio.src = FINISH_AUDIO_SRC;

  let errors = 0;

  const getCards = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll('.card-container'));
  };

  const finishPlay = () => {
    if (errors > 0) finishAudio.play();
    else winAudio.play();
  };

  const howAudioPlays = (card: HTMLElement): void => {
    if (card.id === audio.src) {
      correctAudio.play();
      card.classList.add('completed');
      card.removeEventListener('click', () => howAudioPlays(card as HTMLElement));

      if (cardsAudio.length > 0) gamePlay();
      else {
        setGameStatus(false);
        const openCards = getCards();
        openCards.forEach((elem) => {
          elem.classList.remove('completed');
        });
        finishPlay();
        props.toFinish();
      }
    } else if (!card.classList.contains('completed')) {
      errors++;
      errorAudio.play();
    }
  };

  const playWord = (cardAudio: string): void => {
    audio.src = `./cards/${cardAudio}`;
    audio.play();

    const openCards = getCards();
    openCards.forEach((elem) => {
      elem.addEventListener('click', () => howAudioPlays(elem as HTMLElement));
    });
  };

  function gamePlay(): void {
    cardsAudio.sort(() => Math.random() - 0.5);
    const audioSrc = cardsAudio.pop() as string;
    setAudioForPlay(audioSrc);
    playWord(audioSrc);
  }

  const startGame = (): void => {
    errors = 0;
    setGameStatus(!gameStatus);
    gamePlay();
  };

  const repeatWord = (): void => {
    audio.src = `./cards/${audioForPlay}`;
    audio.play();
  };

  return (
    <div className="cards-page">
      <h2>{title}</h2>
      <CardsBoard cards={cards} />
      <GameButton startGame={startGame} repeatWord={repeatWord} gameStatus={gameStatus} />
    </div>
  );
};
