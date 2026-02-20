import { useState, useEffect } from 'react';

export const useOverflow = (ref) => {
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (ref.current) {
                // A4 height is 1123px. We check if scrollHeight is greater than clientHeight
                // or specifically 1123 if we are using that as a fixed boundary.
                const hasOverflow = ref.current.scrollHeight > ref.current.clientHeight;
                setIsOverflowing(hasOverflow);
            }
        };

        const observer = new ResizeObserver(checkOverflow);
        if (ref.current) {
            observer.observe(ref.current);
        }

        checkOverflow();

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return isOverflowing;
};
