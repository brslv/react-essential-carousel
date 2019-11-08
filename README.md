# react-essential-carousel

![size](https://badgen.net/bundlephobia/min/react-essential-carousel)
![zip size](https://badgen.net/bundlephobia/minzip/react-essential-carousel)

## Info

The `react-essential-carousel` is a very simple, entirely decoupled carousel component, which provides only the needed few essential component to incorporate a carousel functionality in your app.

It depends only on `ramda` and has a `peerDependency` on `react` and `react-dom` versions `^16.11.0`, since it's a react-only component, which uses hooks under the hood.

## Installation

Install the package:

`npm install --save react-essential-carousel`

## Usage

Wrap up your `App` component in a `CarouselProvider` in order to provide some context to the carousel.

```js
import React from "react";
import ReactDOM from "react-dom";
import { CarouselProvider } from "react-essential-carousel";
import App from "./App";
import { CarouselProvider } from "react-essential-carousel";

ReactDOM.render(
  <CarouselProvider>
    <App />
  </CarouselProvider>,
  document.getElementById("root")
);
```

Compose your carousel, using the `Carousel` and `Slide` components. Spice it up using the `prev` and `next` functions, as every carousel on the web needs a way to slide those sliders. :)

```js
import { Carousel, Slide, useCarousel } from "react-essential-carousel";
import "react-essential-carousel/lib/styles.css";

export function App() {
  const { prev, next } = useCarousel();

  return (
    <CarouselProvider>
      <Carousel speed={500 /* this is in ms */}>
        <Slide>
          <div>Slide 1</div>
        </Slide>
        <Slide>
          <div>Slide 2</div>
        </Slide>
        <Slide>
          <div>Slide 3</div>
        </Slide>
      </Carousel>

      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </CarouselProvider>
  );
}
```

## Philosophy

- Modern. Uses react `hooks`, `context` and simple functional components.
- Lightweight core, minimalistic code, no fluff;
- Keeps things as simple as possible. There are no additional sliding effects, other than the default one, using css `transition`s;
- Decoupled. The carousel and it's navigation is decoupled. You could place the `prev`-`next` buttons in a totally different place on the page.

## Copyrights

MIT License

Copyright (c) 2019 Borislav Grigorov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
