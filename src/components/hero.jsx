import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React from 'react'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'

const hero = () => {
    const videoref = useRef();
    const inmobile = useMediaQuery({maxWidth: 767});


    useGSAP(() => {
        // 1. Split Texts
        const herosplit = new SplitText('.title', { type: 'chars,words' });
        const paragraphsplit = new SplitText('.subtitle', { type: 'lines' });
    
        herosplit.chars.forEach((char) => char.classList.add('text-gradient'));
    
        // 2. Animate Hero Text
        gsap.from(herosplit.chars, {
          yPercent: 100,
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.05,
        });
    
        // 3. Animate Paragraph
        gsap.from(paragraphsplit.lines, {
          opacity: 0,
          yPercent: 100,
          duration: 1.8,
          ease: 'expo.out',
          stagger: 0.06,
          delay: 1,
        });
    
        // 4. Parallax Leaves
        gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
          .to('.right-leaf', { y: 200 }, 0)
          .to('.left-leaf', { y: -200 }, 0);
    
        // 5. Video Scroll Animation
        const startval = inmobile ? 'top 50%' : 'center 60%';
        const endval = inmobile ? '120% top' : 'bottom top';
    
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: 'video',
            start: startval,
            end: endval,
            scrub: true,
            pin: true,
          },
        });
    
        if (videoref.current) {
          videoref.current.onloadedmetadata = () => {
            tl.to(videoref.current, {
              currentTime: videoref.current.duration,
            });
          };
        }
      }, []);
  return (
    <>
    <section id='hero' className='noisy'>
<h1 className='title'> MOJITO</h1>
<img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
<img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />
    <div className="body">
<div className="content">
<div className="space-y-5  hidden md:block">
    <p>Cool. Crisp. Classic.</p>
    <p className='subtitle'>
Sip the Spirit <br /> of Summer

    </p>


</div>
<div className="view-cocktails">
<p className="subtitle">
Every cocktail on our menu is a blend of premium ingredients, 
creative flair, and timeless recipes — designed to delight your senses. 
</p>
<a href="#cocktails">View Cocktails</a>

</div>

</div>

    </div>
    
    
    </section>
    <div className="video absolute inset-0">
        <video ref={videoref} src="./videos/output.mp4"
        muted
        playsInline
        preload='auto'
        />


    </div>
    
    </>
  )
}

export default hero
