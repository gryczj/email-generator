CREATE TABLE users (
  user_id varchar(255) NOT NULL PRIMARY KEY,
  username varchar(255) NOT NULL UNIQUE,
  pwd varchar(255) NOT NULL,
  open_ai_key varchar(255) NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL
);

INSERT INTO users(user_id, username, pwd, open_ai_key, created_at, updated_at) VALUES(
  '3768d96d-fe14-4d2d-8e31-95b5f8c6603a', 'john.doe@gmail.com', 'pwd', 'sk-zhxhxhsjsjsjsjsjsj', '2024-02-19 10:23:54', '2024-02-19 10:23:54'
);