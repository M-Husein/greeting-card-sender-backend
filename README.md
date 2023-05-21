# Node.js Rest APIs with Express & MySQL

## Project setup

Clone or download this repo.

First is Important copy or rename file ***.env.example*** to ***.env*** and configuration your database.

### Create MySQL table

Before connecting Node.js Application with MySQL, we need a table first.
So run the SQL script below to create sent_email table:

```sql
CREATE TABLE IF NOT EXISTS `sent_email` (
  id bigint(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  sender_name varchar(255) NOT NULL,
  sender_email varchar(255) NOT NULL,
  recipient_name varchar(255) NOT NULL,
  recipient_email varchar(255) NOT NULL,
  message text NOT NULL,
  created_at timestamp NULL,
  updated_at timestamp NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Or create a table manually with the following specifications:

| Name            | Type      | Length/Set | Allow Null | Default        |
| --------------- | --------- | ---------- | ---------- | -------------- |
| id              | BIGINT    | 20         |            | AUTO_INCREMENT |
| sender_name     | VARCHAR   | 255        |            |                |
| sender_email    | VARCHAR   | 255        |            |                |
| recipient_name  | VARCHAR   | 255        |            |                |
| recipient_email | VARCHAR   | 255        |            |                |
| message         | TEXT      |            |            |                |
| created_at      | TIMESTAMP |            | ✅         | NULL           |
| updated_at      | TIMESTAMP |            | ✅         | NULL           |

Then install dependencies:

```bash
npm install
```

### Run
```bash
node server.js
```
