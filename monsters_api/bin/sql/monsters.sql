CREATE TABLE monsters(
  id serial,
  name character varying(50),
  personality character varying(50)
);

CREATE TABLE habitats(
  id serial,
  name character varying(50),
  climate character varying(50),
  temperature int
);

CREATE TABLE lives(
  monster character varying(50),
  habitat character varying(50)
);

INSERT INTO monsters(name, personality)
VALUES
('Fluffy', 'aggressive'),
('Orc', 'mean'),
('Gollum', 'insane');

INSERT INTO habitats(name, climate, temperature)
VALUES
('desert', 'dry', 100),
('Mordor', 'acid rain', 110),
('Gondor', 'plains', 80);

INSERT INTO lives(monster, habitat)
VALUES
('Fluffy', 'desert'),
('Orc', 'Mordor'),
('Gollum', 'Gondor');
