import React, { useState, useRef } from 'react';
import { sliderLists } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {
  const contentRef = useRef();
  const [currentindex, setCurrentIndex] = useState(0);

  const total = sliderLists.length;

  const getCocktail = (offset) => {
    return sliderLists[(currentindex + offset + total) % total];
  };

  const currentCocktail = getCocktail(0);
  const prevCocktail = getCocktail(-1);
  const nextCocktail = getCocktail(1);

  const goToSlide = (index) => {
    const newIndex = (index + total) % total;
    setCurrentIndex(newIndex);
  };

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '#title',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power1.out' }
        );

        gsap.fromTo(
          '.cocktail',
          { opacity: 0, xPercent: -100 },
          { xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' }
        );

        gsap.fromTo(
          '.details h2',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power1.inOut' }
        );

        gsap.fromTo(
          '.details p',
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power1.inOut' }
        );
      }, contentRef);

      return () => ctx.revert(); // cleanup on unmount or change
    },
    { dependencies: [currentindex], scope: contentRef }
  );

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

      <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>

      <nav aria-label="Cocktail Navigation" className="cocktail-tabs">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentindex;
          return (
            <button
              key={cocktail.id}
              className={`border-b-2 px-2 ${
                isActive ? 'text-white border-white' : 'text-white/50 border-white/50'
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content" ref={contentRef}>
        <div className="arrows">
          <button className="text-left" onClick={() => goToSlide(currentindex - 1)}>
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
          </button>
          <button className="text-left" onClick={() => goToSlide(currentindex + 1)}>
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt={currentCocktail.name} />
        </div>

        <div className="recipe">
          <div className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
