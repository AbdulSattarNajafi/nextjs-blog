import Head from 'next/head';

import { getPostFile, getPostData } from '../../lib/posts-util';

import PostContent from '../../components/posts/post-detail/post-content';

const PostDetailPage = ({ post }) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name='description' content={post.excerpt} />
            </Head>
            <PostContent post={post} />
        </>
    );
};

export function getStaticProps(context) {
    const { slug } = context.params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const postFileNames = getPostFile();
    const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
}

export default PostDetailPage;
