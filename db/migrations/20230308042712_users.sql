-- migrate:up
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login_id VARCHAR(50) NOT NULL,
    password VARCHAR(300) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birthdate VARCHAR(30) NULL,
    phone_number VARCHAR(300) NOT NULL,
    address VARCHAR(100) NULL,
    email VARCHAR(100) NOT NULL,
    privacy_term_essential boolean NOT NULL,
    privacy_term_optional boolean NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down
