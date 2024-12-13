CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    photo VARCHAR(100) UNIQUE NOT NULL,
    position VARCHAR(50) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    flag VARCHAR(50) NOT NULL,
    club VARCHAR(50) NOT NULL,
    logo VARCHAR(50) NOT NULL,
    rating int not null
);
CREATE TABLE normal_player(
    id int PRIMARY KEY AUTO_INCREMENT,
    pace int(2) not null,
    passing int(2) not null,
    shooting int(2) not null,
    dribbling int(2) not null,
    defending int(2) not null,
    physical int(2) not null,
    id_joueur int not null,
    FOREIGN KEY (id_joueur) REFERENCES joueurs(id)
);
CREATE TABLE goalkeeper(
	id int PRIMARY KEY AUTO_INCREMENT,
    diving int(2) not null,
    handling int(2) not null,
    kicking int(2) not null,
    reflexes int(2) not null,
    speed int(2) not null,
    positioning int(2) not null,
    id_goal int not null,
    FOREIGN KEY (id_goal) REFERENCES joueurs(id)
);
CREATE TABLE teams(
    id int PRIMARY KEY AUTO_INCREMENT,
    name_teams VARCHAR(100) NOT NULL,
    id_nationnality int not null,
    FOREIGN KEY (id_nationnality) REFERENCES nationality(id) 
);
CREATE TABLE nationality(
    id int PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    id_player int NOT NULL,
    FOREIGN KEY (id_player) REFERENCES players(id)
);

-- INSERT des données
INSERT INTO players (name, photo, position, nationality, flag, club, logo, rating) VALUES
('Lionel Messi', 'https://cdn.sofifa.net/players/158/023/25_120.png', 'RW', 'Argentina', 'https://flagcdn.com/w320/ar.png', 'Inter Miami', 'https://upload.wikimedia.org/logo-inter-miami.png', 93),
('Gianluigi Donnarumma', 'https://cdn.sofifa.net/players/230/621/25_120.png', 'GK', 'Italy', 'https://cdn.sofifa.net/flags/it.png', 'Paris Saint-Germain', 'https://cdn.sofifa.net/meta/team/591/120.png', 89);
('Kylian Mbappé', 'https://cdn.sofifa.net/players/231/747/25_120.png', 'ST', 'France', 'https://flagcdn.com/w320/fr.png', 'Paris Saint-Germain', 'https://upload.wikimedia.org/logo-psg.png', 91),
('Robert Lewandowski', 'https://cdn.sofifa.net/players/188/545/25_120.png', 'ST', 'Poland', 'https://flagcdn.com/w320/pl.png', 'FC Barcelona', 'https://upload.wikimedia.org/logo-fc-barcelona.png', 91),
('Kevin De Bruyne', 'https://cdn.sofifa.net/players/192/985/25_120.png', 'CM', 'Belgium', 'https://flagcdn.com/w320/be.png', 'Manchester City', 'https://upload.wikimedia.org/logo-man-city.png', 91),
('Neymar Jr', 'https://cdn.sofifa.net/players/190/871/25_120.png', 'LW', 'Brazil', 'https://flagcdn.com/w320/br.png', 'Al Hilal', 'https://upload.wikimedia.org/logo-al-hilal.png', 89);

INSERT INTO normal_player (pace, passing, shooting, dribbling, defending, physical, id_joueur) VALUES
(85, 91, 86, 95, 40, 60, 1), 
(97, 80, 89, 92, 40, 77, 3),
(78, 77, 91, 86, 45, 82, 4), 
(74, 93, 84, 87, 64, 74, 5),
(91, 85, 85, 94, 37, 60, 6); 

INSERT INTO goalkeeper (diving, handling, kicking, reflexes, speed, positioning, id_goal) VALUES
(85, 88, 86, 87, 45, 85, 2);

INSERT INTO teams (name_teams, id_nationnality) VALUES
('Inter Miami', 1),
('Al Nassr', 2),
('Paris Saint-Germain', 3),
('FC Barcelona', 4),
('Manchester City', 5),
('Al Hilal', 6);

INSERT INTO nationality (nom, id_player) VALUES
('Argentina', 1),
('Portugal', 2),
('France', 3),
('Poland', 4),
('Belgium', 5),
('Brazil', 6);

