DROP DATABASE IF EXISTS `tangotwo`;
CREATE DATABASE `tangotwo`;

CREATE TABLE `tangotwo`.`DOTA_POS` (
    DOTA_POS_ID             INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_POS_NAME           VARCHAR(100)    NOT NULL UNIQUE
);

CREATE TABLE `tangotwo`.`DOTA_TEAM` (
    DOTA_TEAM_ID            INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_TEAM_NAME          VARCHAR(100)    NOT NULL,
    DOTA_TEAM_EARNINGS      FLOAT(24)       NOT NULL DEFAULT 0.00
);

CREATE TABLE `tangotwo`.`DOTA_PLAYER` (
    DOTA_PLAYER_ID          INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_PLAYER_FNAME       VARCHAR(100)    NOT NULL,
    DOTA_PLAYER_LNAME       VARCHAR(100)    NOT NULL,
    DOTA_PLAYER_HANDLE      VARCHAR(100)    NOT NULL UNIQUE,
    DOTA_PLAYER_IS_CAPTAIN  BOOLEAN         NOT NULL,
    DOTA_PLAYER_IS_COACH    BOOLEAN         NOT NULL,
    DOTA_PLAYER_EARNINGS    FLOAT(24)       NOT NULL DEFAULT 0.00,
    DOTA_POS_ID             INT             NULL,
    DOTA_TEAM_ID            INT             NULL,
    CONSTRAINT              PLAYER_POS_FK   FOREIGN KEY(DOTA_POS_ID) 
                                REFERENCES DOTA_POS(DOTA_POS_ID)
                                ON DELETE SET NULL,
    CONSTRAINT              PLAYER_TEAM_FK  FOREIGN KEY(DOTA_TEAM_ID) 
                                REFERENCES DOTA_TEAM(DOTA_TEAM_ID)
                                ON DELETE SET NULL
);

CREATE TABLE `tangotwo`.`DOTA_HERO` (
    DOTA_HERO_ID            INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_HERO_NAME          VARCHAR(100)    NOT NULL UNIQUE,
    DOTA_HERO_ATTR          VARCHAR(50)     NOT NULL
);

CREATE TABLE `tangotwo`.`DOTA_TOP_HERO` (
    TOP_HERO_ID             INT             AUTO_INCREMENT PRIMARY KEY,
    TOP_HERO_MATCHES_PLAYED INT             NOT NULL,
    TOP_HERO_MATCHES_WON    INT             NOT NULL,
    TOP_HERO_WIN_RATE       DECIMAL(5,4)    NOT NULL,
    DOTA_HERO_ID            INT             NOT NULL,
    DOTA_PLAYER_ID          INT             NOT NULL,
    CONSTRAINT              TOPH_HERO_FK    FOREIGN KEY(DOTA_HERO_ID)  
                                REFERENCES DOTA_HERO(DOTA_HERO_ID)
                                ON DELETE CASCADE,
    CONSTRAINT              TOPH_PLAYER_FK  FOREIGN KEY(DOTA_PLAYER_ID)
                                REFERENCES DOTA_PLAYER(DOTA_PLAYER_ID)
                                ON DELETE CASCADE
);

CREATE TABLE `tangotwo`.`DOTA_SERIES` (
    DOTA_SERIES_ID          INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_SERIES_BEST_OF     INT             NOT NULL DEFAULT 1,
    DOTA_TEAM_ID            INT,
    CONSTRAINT              SERIES_TEAM_FK  FOREIGN KEY(DOTA_TEAM_ID)  
                                REFERENCES DOTA_TEAM(DOTA_TEAM_ID)
                                ON DELETE SET NULL
);

CREATE TABLE `tangotwo`.`DOTA_MATCH` (
    DOTA_MATCH_ID           INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_MATCH_DATE         DATE            NOT NULL,
    DOTA_MATCH_TIME         TIME            NOT NULL,
    DOTA_MATCH_KILLS        INT             NOT NULL,
    DOTA_SERIES_ID          INT,
    DOTA_TEAM_ID            INT,
    CONSTRAINT              MATCH_SERIES_FK FOREIGN KEY(DOTA_SERIES_ID)
                                REFERENCES DOTA_SERIES(DOTA_SERIES_ID)
                                ON DELETE SET NULL,
    CONSTRAINT              MATCH_TEAM_FK   FOREIGN KEY(DOTA_TEAM_ID)  
                                REFERENCES DOTA_TEAM(DOTA_TEAM_ID)
                                ON DELETE SET NULL
);

CREATE TABLE `tangotwo`.`COMPETING_TEAM` (
    COMP_TEAM_ID            INT             AUTO_INCREMENT PRIMARY KEY,
    DOTA_TEAM_ID            INT             NOT NULL,
    DOTA_SERIES_ID          INT             NOT NULL,
    CONSTRAINT              COMPT_TEAM_FK   FOREIGN KEY(DOTA_TEAM_ID)  
                                REFERENCES DOTA_TEAM(DOTA_TEAM_ID)
                                ON DELETE CASCADE,
    CONSTRAINT              COMPT_SERIES_FK FOREIGN KEY(DOTA_SERIES_ID)
                                REFERENCES DOTA_SERIES(DOTA_SERIES_ID)
                                ON DELETE CASCADE
);
