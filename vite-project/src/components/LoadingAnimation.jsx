import Lottie from 'react-lottie';
import '../styles/loading-animation.css';
import animationData from '../assets/animations/Animation - 1711113790578.json'; 
const LoadingAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet'
        }
    };

    return (
        <div className="loading-animation-container">
            <div className='loading-animation'>
                <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
            </div>
        </div>
    );
};

export default LoadingAnimation;
