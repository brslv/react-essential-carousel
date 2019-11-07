## Info

The react-essential-carousel is a very simple, entirely decoupled carousel component, which provides only the needed essential levers to incorporate a carousel functionality in your app.

It depends only on ```ramda``` and has a ```peerDependency``` on react and react-dom, since it's a react-only component.

## Usage

Install the package:

```npm install --save react-essential-carousel```

Import the needed components:

```js
import { CarouselProvider, Carousel, useCarousel } from 'react-essential-carousel';
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

Well, that's it. :)

Enjoy.