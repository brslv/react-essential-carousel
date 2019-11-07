import React, {useState, useEffect, useContext, createContext} from 'react';
import {partial, pipe, filter, join, when, gt} from 'ramda';
import './styles.css';

///////////////////
// --- UTILS --- //
///////////////////

function isNotEmptyStr(str) {
  return str !== '';
}

const c = pipe(partial(filter, [isNotEmptyStr]), join(' '));

function classIf(cond, cls) {
  return !!cond ? cls : ''
}

///////////////////
// --- STATE --- //
///////////////////

export const CarouselContext = createContext({idx: 0});

export function CarouselProvider({children}) {
  const [speed, setSpeed] = useState(500);
  const [idx, setIdx] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

  const next = partial(updateIdx, [idx + 1]);
  const prev = partial(updateIdx, [idx - 1]);

  // If the items count changes, reset the idx to an in-range value (the last item).
  useEffect(() => {
    when(gt(itemsCount), partial(setIdx, [itemsCount - 1]));
  }, [itemsCount]);

  function updateIdx(nextIdx) {
    let derived = nextIdx;
    if (nextIdx < 0) {
      derived = 0;
    } else if (nextIdx > (itemsCount - 1)) {
      derived = itemsCount - 1;
    }
    setIdx(derived);
  }

  const defaultValue = {
    speed,
    setSpeed,
    idx,
    prev,
    next,
    itemsCount,
    setItemsCount
  };

  return (
    <CarouselContext.Provider value={defaultValue}>
      {children}
    </CarouselContext.Provider>
  );
}

export function useCarousel() {
  return useContext(CarouselContext);
}

//////////////////////
// --- CAROUSEL --- //
//////////////////////

export function Carousel({children, speed}) {
  const {idx, setItemsCount, setSpeed} = useCarousel();

  useEffect(() => setItemsCount(children.length), [children.length]);
  useEffect(() => setSpeed(speed), [speed]);

  function isPrev(i) {
    return i === idx - 1;
  }

  function isNext(i) {
    return i === idx + 1;
  }

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {children.map((child, i) => {
          const key = i;

          if (i === idx) {
            return React.cloneElement(child, {active: true, key});
          }

          return React.cloneElement(child, {active: false, isPrev: isPrev(i), isNext: isNext(i), key});
        })}
      </div>
    </div>
  );
}

///////////////////
// --- SLIDE --- //
///////////////////

export function Slide({children, isPrev, isNext, active}) {
  const {speed} = useCarousel();
  const className = c([
    'carousel-item',
    classIf(active, 'carousel-item--active'),
    classIf(isPrev, 'carousel-item--transition-prev'),
    classIf(isNext, 'carousel-item--transition-next')
  ]);
  const transitionSpeed = speed / 1000;
  const transition = `transform ${transitionSpeed}s, opacity ${transitionSpeed}s, z-index ${transitionSpeed}s`;

  return (
    <div className={className} style={{transition}}>
      {children}
    </div>
  );
}