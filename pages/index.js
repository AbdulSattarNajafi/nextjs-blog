import Head from 'next/head';

import { getFeaturedPosts } from '../lib/posts-util';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';

const Homepage = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Max's Blog</title>
                <meta name='description' content='I post about programming and web development' />
            </Head>
            <Hero />
            <FeaturedPosts posts={posts} />
        </>
    );
};

export function getStaticProps() {
    const featuredPosts = getFeaturedPosts();

    return {
        props: { posts: featuredPosts },
    };
}

export default Homepage;
