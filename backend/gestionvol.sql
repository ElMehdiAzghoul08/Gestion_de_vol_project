use gestion_vol;
CREATE TABLE Client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(255) NOT NULL
);
CREATE TABLE vol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    villeDepart VARCHAR(255) NOT NULL,
    villeArrivee VARCHAR(255) NOT NULL,
    heureDepart TIME NOT NULL,
    heureArrivee TIME NOT NULL,
    nombrePlaces INT NOT NULL
);
CREATE TABLE Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    vol_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(id),
    FOREIGN KEY (vol_id) REFERENCES vol(id),
    CONSTRAINT unique_reservation UNIQUE (client_id, vol_id)
);

CREATE TABLE Paiement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    montant INT NOT NULL,
    statut VARCHAR(255) NOT NULL,
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(id),
    CONSTRAINT unique_paiement UNIQUE (client_id)
);

CREATE TABLE Administrateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password INT NOT NULL,
    nom VARCHAR(255) NOT NULL,
	prenom VARCHAR(255) NOT NULL,
    vol_id INT NOT NULL,
    FOREIGN KEY (vol_id) REFERENCES vol(id),
	Reservation_id INT NOT NULL,
    FOREIGN KEY (Reservation_id) REFERENCES Reservation(id),
    CONSTRAINT unique_administrateur UNIQUE (vol_id,Reservation_id)
);

alter user 'root'@'localhost' identified with mysql_native_password by 'root123';
