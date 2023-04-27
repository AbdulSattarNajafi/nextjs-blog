import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

import classes from './post-content.module.css';
import PostHeader from './post-header';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostContent = ({ post }) => {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const markdownComponent = {
        p: (paragraph) => {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0];
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.properties.alt}
                            width={600}
                            height={400}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },

        code: (code) => {
            const { className, children } = code;
            const language = className.replace(/^[^-]*-/, '');

            return (
                <SyntaxHighlighter
                    language={language}
                    style={atomDark}
                    children={children}
                ></SyntaxHighlighter>
            );
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={markdownComponent}>{post.content}</ReactMarkdown>
        </article>
    );
};

export default PostContent;
