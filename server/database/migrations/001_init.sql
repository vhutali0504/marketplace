-- 001_init.sql
-- Sprint 1: foundations — universities, campuses, users, OTPs
-- Later sprints add: categories/vendors/listings (002), jobs/applications (003),
-- orders/reviews (004), matching the sprint plan.

BEGIN;

CREATE TABLE universities (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(150) NOT NULL UNIQUE,
  short_name VARCHAR(20)
);

CREATE TABLE campuses (
  id            SERIAL PRIMARY KEY,
  university_id INT NOT NULL REFERENCES universities(id),
  name          VARCHAR(100) NOT NULL,
  UNIQUE (university_id, name)
);

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  phone         VARCHAR(15) NOT NULL UNIQUE,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255),
  password_hash TEXT NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'customer',  -- customer | vendor | both
  campus_id     INT REFERENCES campuses(id),
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- OTPs stored hashed, single-use, expiring (NFR-S4)
CREATE TABLE otps (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES users(id),
  code_hash  TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  attempts   INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_campus ON users(campus_id);
CREATE INDEX idx_otps_user ON otps(user_id);

-- Seed: pilot university and campuses
INSERT INTO universities (name, short_name)
VALUES ('University of Johannesburg', 'UJ');

INSERT INTO campuses (university_id, name)
SELECT id, campus FROM universities,
  (VALUES ('Auckland Park Kingsway (APK)'),
          ('Auckland Park Bunting Road (APB)'),
          ('Doornfontein (DFC)'),
          ('Soweto (SWC)')) AS c(campus)
WHERE short_name = 'UJ';

COMMIT;
