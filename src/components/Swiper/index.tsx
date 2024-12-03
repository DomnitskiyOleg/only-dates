import { PeriodDate } from '../../mock-data/types'

import classes from './swiper.module.scss'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import classNames from 'classnames'

type Props = {
  dates: PeriodDate[]
}

export default function DateSwiper(props: Props) {
  const { dates } = props
  return (
    <div className={classes.wrapper}>
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
