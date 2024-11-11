import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BigButton from './BigButton';
import { AnimatedBackground } from 'animated-backgrounds';

const HomePage = () => {
  const [changingText, setChangingText] = useState('education');
  const [fadeTransition, setFadeTransition] = useState(true);
  const words = ['education', 'your life', 'business', 'everything'];
  const colors = ['text-indigo-400', 'text-teal-400', 'text-yellow-400', 'text-pink-400'];
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeTransition(false);
      setTimeout(() => {
        setChangingText((prev) => {
          const currentIndex = words.indexOf(prev);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setFadeTransition(true);
      }, 300); // Duration of the fade-out transition
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getColorForWord = (word) => colors[words.indexOf(word)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative text-gray-800">
      <AnimatedBackground animationName="geometricShapes"  style={{ opacity: 0.5 }} />

      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-500 mb-4 leading-snug">
          AI Tools to make{' '}
          <span
            className={`transition-opacity duration-300 ${
              fadeTransition ? 'opacity-100' : 'opacity-0'
            } ${getColorForWord(changingText)}`}
          >
            {changingText}
          </span>{' '}
          simple
        </h1>
        <p className="text-lg text-indigo-900 mt-4 max-w-lg mx-auto leading-relaxed">
          Unlock the power of AI to simplify your work, studies, and daily tasks with our easy-to-use AI powered Writer.
        </p>
      </header>

      {/* How it Works Section */}
<section className="mt-21 md:mt-10 max-w-6xl mx-auto text-center">
  <div className="bg-none">
    <h2 className="text-3xl font-bold text-blue-600 mb-8">How it Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-gray-700 text-lg">
      
      {/* Step 1 */}
      <div className="flex justify-center">
        <span className="p-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl shadow-lg font-semibold transform transition-all hover:scale-105 hover:shadow-2xl w-full md:w-3/4 lg:w-3/3">
          Type in your topic or question.
        </span>
      </div>

      {/* Step 2 */}
      <div className="flex justify-center">
        <span className="p-6 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl shadow-lg font-semibold transform transition-all hover:scale-105 hover:shadow-2xl w-full md:w-3/4 lg:w-3/3">
          Choose a tone, structure, or style.
        </span>
      </div>

      {/* Step 3 */}
      <div className="flex justify-center">
        <span className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl shadow-lg font-semibold transform transition-all hover:scale-105 hover:shadow-2xl w-full md:w-3/4 lg:w-3/3">
          Click <strong>Generate</strong> and get a well-structured essay!
        </span>
      </div>

      {/* Step 4 */}
      <div className="flex justify-center">
        <span className="p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl shadow-lg font-semibold transform transition-all hover:scale-105 hover:shadow-2xl w-full md:w-3/4 lg:w-3/3">
          Edit, refine, save, or download your essay.
        </span>
      </div>
    </div>
  </div>
</section>
      {/* Call-to-Action Button */}
      <div className="mt-16 flex justify-center">
        <Link to="/essay-generator">
          <BigButton
            text="Start Writing Your Essay"
            label="Start Writing"
            
          />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;