import { PeriodDate } from '../../mock-data/types'
import { gsap } from 'gsap'
import classes from './swiper.module.scss'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'


import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

type Props = {
  dates: PeriodDate[]
}

export default function DateSwiper(props: Props) {
  const elementRef = useRef(null)
  const { dates } = props

  const [datesToRender, setDatesToRender] = useState<PeriodDate[]>([])

  useEffect(() => {
    gsap.to(elementRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'none',
      onComplete: () => {
        setDatesToRender(dates)
        gsap.to(elementRef.current, {
          opacity: 1,
          delay: 0.4,
          duration: 1,
          ease: 'none',
        })
      },
    })
  }, [dates])
  return (
    <div ref={elementRef} className={classes.wrapper}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          disabledClass: classes.navigationHidden,
          nextEl: '.next-button',
          prevEl: '.previous-button',
        }}
        // pagination
        slidesPerView='auto'
        spaceBetween={80}
        centeredSlides={false}
      >
        {datesToRender.map((v, i) => (
          <SwiperSlide
            key={`${v.year}-${i}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              maxWidth: 320,
              gap: 15,
            }}
          >
            <p className={classes.year}>{v.year}</p>
            <p className={classes.description}>{v.eventDescription}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* buttons */}
      <img
        className={classNames(
          'previous-button',
          classes.navigationButton,
          classes.previousButton,
        )}
        src='/assets/icons/previous.svg'
        alt='previous-button'
      />
      <img
        className={classNames(
          'next-button',
          classes.navigationButton,
          classes.nextButton,
        )}
        src='/assets/icons/next.svg'
        alt='next-button'
      />
      {/* buttons */}
    </div>
  )
}
