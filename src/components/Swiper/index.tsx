import { PeriodDate } from '../../mock-data/types'
import { gsap } from 'gsap'
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Divider from '../Divider'
import useMediaQuery from '../../hooks'

import classes from './swiper.module.scss'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'
import './pagination.scss'

type Props = {
  dates: PeriodDate[]
  title?: string
}

export default function DateSwiper(props: Props) {
  const elementRef = useRef(null)

  const { dates, title } = props
  const isMobile = useMediaQuery()
  const [datesToRender, setDatesToRender] = useState<PeriodDate[]>([])
  const [titleToRender, settitleToRender] = useState('')

  useEffect(() => {
    gsap.to(elementRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'none',
      onComplete: () => {
        setDatesToRender(dates)
        settitleToRender(title || '')
        gsap.to(elementRef.current, {
          opacity: 1,
          delay: 0.4,
          duration: 0.8,
          ease: 'none',
          onStart: () => {
            if (!isMobile) return
            gsap.fromTo(
              elementRef.current,
              { y: 40 },
              { y: 0, duration: 0.2, ease: 'none' },
            )
          },
        })
      },
    })
  }, [dates, isMobile, title])

  return (
    <div className={classes.container}>
      <div className={classes.customPagination} />
      <div ref={elementRef} className={classes.wrapper}>
        {isMobile && (
          <>
            <h2 className={classes.title}>{titleToRender}</h2>
            <Divider />
          </>
        )}
        <Swiper
          style={{ minHeight: isMobile ? 122 : 132 }}
          modules={[Navigation, Pagination]}
          navigation={{
            disabledClass: classes.navigationHidden,
            nextEl: '.next-button',
            prevEl: '.previous-button',
          }}
          pagination={
            isMobile
              ? {
                  clickable: true,
                  el: `.${classes.customPagination}`,
                }
              : false
          }
          slidesPerView='auto'
          spaceBetween={isMobile ? 25 : 80}
          centeredSlides={false}
        >
          {datesToRender.map((v, i) => (
            <SwiperSlide
              key={`${v.year}-${i}`}
              className={classes.slide}
              style={{ maxWidth: isMobile ? 166 : 320 }}
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
    </div>
  )
}
