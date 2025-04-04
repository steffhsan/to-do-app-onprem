CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    done BOOLEAN DEFAULT false,
    archived BOOLEAN DEFAULT false,
    date TEXT
);
