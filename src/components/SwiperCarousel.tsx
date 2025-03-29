import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import { AppScreenshot } from '@/hooks/useAppData';

// Import Swiper styles - make sure these come before any custom styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperCarouselProps {
    screenshots: AppScreenshot[];
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ screenshots }) => {
    // Add CSS directly to ensure the component renders with proper dimensions
    useEffect(() => {
        // Force a browser reflow to ensure Swiper initializes correctly
        window.dispatchEvent(new Event('resize'));
    }, []);

    if (screenshots.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-96 mb-8">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                className="h-full w-full rounded-xl"
            >
                {screenshots.map((screenshot, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <div className="w-full h-full p-2">
                            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <Image
                                    src={screenshot.url}
                                    alt={screenshot.alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority={index < 3} // Prioritize loading the first few images
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperCarousel; 