"use client";
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

interface ScrollAnimationProps {
    children: React.ReactNode;
    animationName: string;
    threshold?: number;
    triggerOnce?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, animationName, threshold = 0.1, triggerOnce = true }) => {
    const { ref, inView, entry } = useInView({
        threshold,
        triggerOnce,
    });

    useEffect(() => {
        if (inView && entry?.target) {
            // Add animation classes when the component is in view
            entry.target.classList.add('animate__animated', `animate__${animationName}`, 'animate__slow');
            // Make it visible
            (entry.target as HTMLElement).style.opacity = '1';
        }
    }, [inView, entry, animationName]);

    // Apply the initial hidden state using a class
    return <div ref={ref} className="animate-on-scroll" style={{ opacity: 0 }}>{children}</div>;
};

export default ScrollAnimation;