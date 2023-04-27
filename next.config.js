const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    // Development Server
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_userName: 'sattar',
                mongodb_password: 'sattar_mongodb',
                mongodb_clusterName: 'cluster0',
                mongodb_database: 'blog-dev',
            },
        };
    }

    // Deployment Server
    return {
        env: {
            mongodb_userName: 'sattar',
            mongodb_password: 'sattar_mongodb',
            mongodb_clusterName: 'cluster0',
            mongodb_database: 'blog',
        },
    };
};
