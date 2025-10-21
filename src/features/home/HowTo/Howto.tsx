'use client';
import React, { useContext } from 'react';
import styles from './HowTo.module.css';
import Link from 'next/link';
import {
  ConfirmedIcon,
  CardIcon,
  SearchIcon,
  BoxIcon,
  BookIcon,
  RobotIcon,
} from '../../../../public/howTo-section/Icon';
import { MainContext } from '@/context';

export const HowTo = () => {
  const { setSideChatOpened } = useContext(MainContext);

  const handleChatClick = () => {
    setSideChatOpened(true);
  };
  return (
    <section
      id='howTo'
      className={`${styles.howTo} max-w-[90rem] mx-auto pt-[3.25rem] pb-[3.75rem] px-[1.25rem] md:px-[2.5rem] lg:py-[3.75rem] lg:px-[6rem]`}
    >
      <div className={`${styles.howToContainer} w-full flex flex-col gap-6`}>
        <div
          className={`${styles.howToTitle} w-full flex flex-col justify-center items-center gap-2.5 `}
        >
          <div className={`${styles.howToTitleText} `}>
            How to buy{' '}
            <span className={`${styles.howToTitleHighlighted}`}>safely?</span>
          </div>
          <div className={`${styles.howToText} text-center `}>
            Дотримуйтесь цих порад, щоб ваше придбання було приємним і безпечним
          </div>
        </div>
        <div
          className={`${styles.howToAdviceList} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3`}
        >
          <div
            className={`${styles.howToAdviceItem} flex lg:flex-col lg:items-center lg:text-center gap-2.5 px-5 py-6 rounded-[20px]`}
          >
            <div
              className={`${styles.howToAdviceItemIcon} flex items-center justify-center px-2.5 py-5 lg:p-2 rounded-2xl lg:w-[4.75rem] lg:h-[4.75rem]`}
            >
              <ConfirmedIcon
                className={`${styles.Icon} w-11 h-11 lg:w-14.5 lg:h-14.5 p-[4px]`}
              />
            </div>
            <div
              className={`${styles.howToAdviceItemDesc} flex flex-col gap-2.5`}
            >
              <div className={`${styles.howToAdviceItemTitle} `}>
                Перевіряйте продавця
              </div>
              <div className={`${styles.howToAdviceItemText} `}>
                Працюйте лише з перевіреними дилерами та продавцями з рейтингом.
              </div>
            </div>
          </div>
          <div
            className={`${styles.howToAdviceItem} flex lg:flex-col lg:items-center lg:text-center gap-2.5 px-5 py-6 rounded-[20px]`}
          >
            <div
              className={`${styles.howToAdviceItemIcon} flex items-center justify-center px-2.5 py-5 lg:p-2 rounded-2xl lg:w-[4.75rem] lg:h-[4.75rem]`}
            >
              <CardIcon
                className={`${styles.IconColor} w-11 h-11 lg:w-14.5 lg:h-14.5`}
              />
            </div>
            <div
              className={`${styles.howToAdviceItemDesc} flex flex-col gap-2.5`}
            >
              <div className={`${styles.howToAdviceItemTitle} `}>
                Захищайте оплату
              </div>
              <div className={`${styles.howToAdviceItemText} `}>
                Оплачуйте через платформи з escrow або з гарантією повернення
                коштів.
              </div>
            </div>
          </div>
          <div
            className={`${styles.howToAdviceItem} flex lg:flex-col lg:items-center lg:text-center gap-2.5 px-5 lg:px-3 py-6 rounded-[20px]`}
          >
            <div
              className={`${styles.howToAdviceItemIcon} flex items-center justify-center px-2.5 py-5 lg:p-2 rounded-2xl lg:w-[4.75rem] lg:h-[4.75rem]`}
            >
              <SearchIcon
                className={`${styles.Icon} w-11 h-11 lg:w-14.5 lg:h-14.5 p-[4px]`}
              />
            </div>
            <div
              className={`${styles.howToAdviceItemDesc} flex flex-col gap-2.5`}
            >
              <div className={`${styles.howToAdviceItemTitle} `}>
                Перевіряйте автентичність
              </div>
              <div className={`${styles.howToAdviceItemText} `}>
                Попросіть сертифікати, перевірте серійні номери годинника перед
                покупкою.
              </div>
            </div>
          </div>
          <div
            className={`${styles.howToAdviceItem} flex lg:flex-col lg:items-center lg:text-center gap-2.5 px-5 py-6 rounded-[20px]`}
          >
            <div
              className={`${styles.howToAdviceItemIcon} flex items-center justify-center px-2.5 py-5 lg:p-2 rounded-2xl lg:w-[4.75rem] lg:h-[4.75rem]`}
            >
              <BoxIcon
                className={`${styles.IconColor} w-11 h-11 lg:w-14.5 lg:h-14.5 p-2`}
              />
            </div>
            <div
              className={`${styles.howToAdviceItemDesc} flex flex-col gap-2.5`}
            >
              <div className={`${styles.howToAdviceItemTitle} `}>
                Застрахуйте доставку
              </div>
              <div className={`${styles.howToAdviceItemText} `}>
                Обирайте застраховану доставку з відстеженням, щоб захистити
                вашу покупку.
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.howToButtons} flex flex-col md:flex-row md:justify-center gap-4 lg:gap-8 md:px-1`}
        >
          <Link
            href='/guide'
            prefetch={false}
            className={`${styles.howToLink} w-full lg:max-w-[24%]`}
          >
            <button
              className={`${styles.howToGuideBtn} w-full py-[22px] lg:py-[18px] flex items-center justify-center rounded-[10px] gap-[10px] cursor-pointer`}
            >
              <BookIcon className={`${styles.GuideIcon} w-6 h-6`} />
              <div>Читати повний гайд</div>
            </button>
          </Link>
          <button
            onClick={handleChatClick}
            className={`${styles.howToChatBtn} w-full lg:max-w-[24%] py-[22px] lg:py-[18px] flex items-center justify-center rounded-[10px] gap-[10px] cursor-pointer`}
          >
            <RobotIcon className={`${styles.RobotIcon} w-6 h-6`} />
            <div>Запитай у Geni</div>
          </button>
        </div>
      </div>
    </section>
  );
};
