import Circle from '../components/Circle'
import Container from '../components/Container'
import { periods } from '../mock-data'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import classNames from 'classnames'
import { PeriodDate } from '../mock-data/types'
import { useRef, useState } from 'react'

import styles from './classes.module.scss'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'
import useMediaQuery from '../hooks/useMediaQuery'

export default function OnlyDates() {
  const [periodIndex, setPeriodIndex] = useState(0)
  const [dates, setDates] = useState<PeriodDate[]>(periods[periodIndex].dates)

  const isMobile = useMediaQuery()

  return (
    <Container>
      <Circle numberOfCircles={5} />
      <div
        style={{
          position: 'relative',
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        <img
          className={classNames(
            'previous-button',
            styles.navigationButton,
            styles.previousButton,
          )}
          src='/assets/icons/previous.svg'
          alt='previous-button'
        />
        <img
          className={classNames(
            'next-button',
            styles.navigationButton,
            styles.nextButton,
          )}
          src='/assets/icons/next.svg'
          alt='next-button'
        />

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            disabledClass: styles.navigationHidden,
            nextEl: '.next-button',
            prevEl: '.previous-button',
          }}
          // pagination
          slidesPerView='auto'
          spaceBetween={80}
          centeredSlides={false}
        >
          {dates.map((v, i) => (
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
              <p className={styles.year}>{v.year}</p>
              <p className={styles.description}>{v.eventDescription}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  )
}
