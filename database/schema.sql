CREATE TABLE IF NOT EXISTS holidays (
  id SERIAL,
  holidayName VARCHAR(50) NOT NULL,
  holidayDate VARCHAR(30) NOT NULL,
  theme TEXT,
  PRIMARY KEY (id)
);

CREATE INDEX idx_holidays ON holidays(id);