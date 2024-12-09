import React from 'react';
import HeroBanner from './HeroBanner';
import CategoryHighlights from './CategoryHighlights';
import TopPicks from './TopPicks';
import HomeBlogs from './HomeBlogs';

const Home = () => {
  return (
    <div className="pt-[15vh]"> {/* Adjust padding-top to 15% of the viewport height */}
      <HeroBanner />
      <CategoryHighlights />
      <TopPicks />
      <HomeBlogs />
    </div>
  );
};

export default Home;
