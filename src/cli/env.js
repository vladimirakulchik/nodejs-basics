import process from 'process';

export const parseEnv = () => {
    const prefix = 'RSS_';

    const env = Object.entries(process.env);
    const rssEnv = env.map(([key, value]) => {
        return `${key}=${value}`;
    }).filter((item) => item.startsWith(prefix));

    const formattedEnv = rssEnv.join('; ');

    if (formattedEnv) {
        console.log(formattedEnv);
    }
};

parseEnv();
