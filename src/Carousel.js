import React, { useState, useEffect, useContext, createContext } from "react";
import {
  compose,
  partial,
  partialRight,
  pipe,
  filter,
  join,
  when,
  ifElse,
  identity,
  gt,
  lt
} from "ramda";
import "./styles.css";

///////////////////
// --- UTILS --- //
///////////////////

function decrement(i) {
  return i - 1;
}

function zeroify() {
  return 0;
}

function isOutOfTopBoundary(itemsCount) {
  return partialRight(gt, [itemsCount - 1]);
}

function isOutOfBottomBoundary() {
  return partialRight(lt, [0]);
}

function handleOutOfBottomBoundary(itemsCount) {
  return ifElse(
    isOutOfBottomBoundary(),
    partial(identity, [decrement(itemsCount)]),
    identity
  );
}

function isNotEmptyStr(str) {
  return str !== "";
}

const c = pipe(
  partial(filter, [isNotEmptyStr]),
  join(" ")
);

function classIf(cond, cls) {
  return !!cond ? cls : "";
}

///////////////////
// --- STATE --- //
///////////////////

export const CarouselContext = createContext({ idx: 0 });

export function CarouselProvider({ children }) {
  const [speed, setSpeed] = useState(500);
  const [idx, setIdx] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

  const next = partial(updateIdx, [idx + 1]);
  const prev = partial(updateIdx, [idx - 1]);
  const goTo = compose(updateIdx);

  useEffect(partial(updateIdx, [idx]), [itemsCount]);

  function updateIdx(nextIdx) {
    const setIdxInRange = ifElse(
      isOutOfTopBoundary(itemsCount),
      zeroify,
      handleOutOfBottomBoundary(itemsCount)
    );

    setIdx(setIdxInRange(nextIdx));
  }

  const defaultValue = {
    speed,
    setSpeed,
    idx,
    prev,
    next,
    goTo,
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

export function Carousel({ children, speed }) {
  const { idx, setItemsCount, setSpeed } = useCarousel();

  useEffect(() => setItemsCount(children.length), [children.length]);
  useEffect(() => setSpeed(speed), [speed]);

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {children.map((child, i) => {
          const isActive = i === idx;
          const isPrev = i < idx;
          const isNext = i > idx;
          const baseCloneProps = { active: isActive, key: i };
          const cloneProps = isActive
            ? baseCloneProps
            : { ...baseCloneProps, isPrev, isNext };

          return React.cloneElement(child, cloneProps);
        })}
      </div>
    </div>
  );
}

///////////////////
// --- SLIDE --- //
///////////////////

export function Slide({ children, isPrev, isNext, active }) {
  const { speed } = useCarousel();
  const className = c([
    "carousel-item",
    classIf(active, "carousel-item--active"),
    classIf(isPrev, "carousel-item--transition-prev"),
    classIf(isNext, "carousel-item--transition-next")
  ]);
  const translateXValue = active ? 0 : isPrev ? -100 : 100;
  const transitionSpeed = `${speed / 1000}s`;
  const translate = `translateX(${translateXValue}%)`;
  const ease = "ease-in-out 0s";
  const transition = `transform ${transitionSpeed} ${ease}, opacity ${transitionSpeed} ${ease}, z-index ${transitionSpeed} ${ease}`;

  return (
    <div className={className} style={{ transition, transform: translate }}>
      {children}
    </div>
  );
}
