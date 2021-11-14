/* #1 Select all Evil Geniuses players */
SELECT * FROM DOTA_PLAYER
WHERE DOTA_TEAM_ID = '1';

/* #2 Select all "Offlane" position players */
SELECT * FROM DOTA_PLAYER
WHERE DOTA_POS_ID = '3';

/* #3 Select the player that is the team captain of Team Secret */
SELECT * FROM DOTA_PLAYER
WHERE DOTA_TEAM_ID = '5' AND DOTA_PLAYER_IS_CAPTAIN = '1';

/* #4 Select all players that are team coaches */
SELECT * FROM DOTA_PLAYER
WHERE DOTA_PLAYER_IS_COACH = '1';

/* #5 Select all players with tournament earnings over $3 millon */
SELECT * FROM DOTA_PLAYER
WHERE DOTA_PLAYER_EARNINGS > '3000000';

/* #6 Select the total tournament earnings of all players from Team OG */
SELECT SUM(DOTA_PLAYER_EARNINGS) AS TOTAL_EARNINGS FROM DOTA_PLAYER
WHERE DOTA_TEAM_ID = '3'

/* #7 Select the total tournament earnings of all teams */
SELECT SUM(DOTA_TEAM_EARNINGS) AS TOTAL_EARNINGS FROM DOTA_TEAM

/* #8 Select all agility heroes */
SELECT * FROM DOTA_HERO
WHERE DOTA_HERO_ATTR = 'Agility';

/* #9 Select all matches that Evil Geniuses have won */
SELECT * FROM DOTA_MATCH
WHERE DOTA_TEAM_ID = '1';

/* #10 Select all series that are Fnatic vs Team Secret */
SELECT DOTA_SERIES.* FROM COMPETING_TEAM
JOIN DOTA_SERIES ON DOTA_SERIES.DOTA_SERIES_ID = COMPETING_TEAM.DOTA_SERIES_ID
WHERE COMPETING_TEAM.DOTA_TEAM_ID = '2' OR COMPETING_TEAM.DOTA_TEAM_ID = '5'
GROUP BY COMPETING_TEAM.DOTA_SERIES_ID HAVING COUNT(*) = 2;

/* #11 Select all matches that are Evil Geniuses vs Team OG */
SELECT DOTA_MATCH.* FROM (SELECT DOTA_SERIES.* FROM COMPETING_TEAM
JOIN DOTA_SERIES ON DOTA_SERIES.DOTA_SERIES_ID = COMPETING_TEAM.DOTA_SERIES_ID
WHERE COMPETING_TEAM.DOTA_TEAM_ID = '1' OR COMPETING_TEAM.DOTA_TEAM_ID = '2'
GROUP BY COMPETING_TEAM.DOTA_SERIES_ID HAVING COUNT(*) = 2) AS DOTA_SERIES
JOIN DOTA_MATCH ON DOTA_MATCH.DOTA_SERIES_ID = DOTA_SERIES.DOTA_SERIES_ID

/* #12 Select the top hero combinations of the player, Puppey */
SELECT DOTA_PLAYER_HANDLE, DOTA_PLAYER_FNAME, DOTA_PLAYER_LNAME, DOTA_HERO.*, DOTA_TOP_HERO.* FROM DOTA_TOP_HERO
JOIN DOTA_PLAYER ON DOTA_PLAYER.DOTA_PLAYER_ID = DOTA_TOP_HERO.DOTA_PLAYER_ID
JOIN DOTA_HERO ON DOTA_HERO.DOTA_HERO_ID = DOTA_TOP_HERO.DOTA_HERO_ID
WHERE DOTA_PLAYER.DOTA_PLAYER_ID = '19'

/* #13 Select Team OG's top hero combinations */
SELECT DOTA_PLAYER_HANDLE, DOTA_PLAYER_FNAME, DOTA_PLAYER_LNAME, DOTA_HERO.*, DOTA_TOP_HERO.* FROM DOTA_TOP_HERO
JOIN DOTA_PLAYER ON DOTA_PLAYER.DOTA_PLAYER_ID = DOTA_TOP_HERO.DOTA_PLAYER_ID
JOIN DOTA_HERO ON DOTA_HERO.DOTA_HERO_ID = DOTA_TOP_HERO.DOTA_HERO_ID
WHERE DOTA_PLAYER.DOTA_TEAM_ID = '3'

/* #14 Select players' top hero combinations that involve the hero "Rubick" */
SELECT DOTA_PLAYER_HANDLE, DOTA_PLAYER_FNAME, DOTA_PLAYER_LNAME, DOTA_HERO.*, DOTA_TOP_HERO.* FROM DOTA_TOP_HERO
JOIN DOTA_PLAYER ON DOTA_PLAYER.DOTA_PLAYER_ID = DOTA_TOP_HERO.DOTA_PLAYER_ID
JOIN DOTA_HERO ON DOTA_HERO.DOTA_HERO_ID = DOTA_TOP_HERO.DOTA_HERO_ID
WHERE DOTA_HERO.DOTA_HERO_ID = '108'

/* #15 Select players' top hero combinations that involve the hero strength heroes */
SELECT DOTA_PLAYER_HANDLE, DOTA_PLAYER_FNAME, DOTA_PLAYER_LNAME, DOTA_HERO.*, DOTA_TOP_HERO.* FROM DOTA_TOP_HERO
JOIN DOTA_PLAYER ON DOTA_PLAYER.DOTA_PLAYER_ID = DOTA_TOP_HERO.DOTA_PLAYER_ID
JOIN DOTA_HERO ON DOTA_HERO.DOTA_HERO_ID = DOTA_TOP_HERO.DOTA_HERO_ID
WHERE DOTA_HERO.DOTA_HERO_ATTR = 'Strength'

/* #16 Select intelligence top hero combinations of support positions */
SELECT DOTA_POS.*, DOTA_HERO.* FROM DOTA_TOP_HERO
JOIN DOTA_PLAYER ON DOTA_PLAYER.DOTA_PLAYER_ID = DOTA_TOP_HERO.DOTA_PLAYER_ID
JOIN DOTA_POS ON DOTA_POS.DOTA_POS_ID = DOTA_PLAYER.DOTA_POS_ID
JOIN DOTA_HERO ON DOTA_HERO.DOTA_HERO_ID = DOTA_TOP_HERO.DOTA_HERO_ID
WHERE (DOTA_POS.DOTA_POS_ID = '4' OR DOTA_POS.DOTA_POS_ID = '5') AND DOTA_HERO.DOTA_HERO_ATTR = 'Intelligence'

/* #17 Select all team captain's top hero combinations */
SELECT DOTA_PLAYER_HANDLE, DOTA_PLAYER_FNAME, DOTA_PLAYER_LNAME, DOTA_HERO.*, DOTA_TOP_HERO.* FROM DOTA_TOP_HERO
JOIN DOTA_PLAYER ON DOTA_PLAYER.DOTA_PLAYER_ID = DOTA_TOP_HERO.DOTA_PLAYER_ID
JOIN DOTA_HERO ON DOTA_HERO.DOTA_HERO_ID = DOTA_TOP_HERO.DOTA_HERO_ID
WHERE DOTA_PLAYER.DOTA_PLAYER_IS_CAPTAIN = '1'

/* #18 Select all teams that contain coaches */
SELECT DOTA_TEAM.* FROM DOTA_PLAYER
JOIN DOTA_TEAM ON DOTA_TEAM.DOTA_TEAM_ID = DOTA_PLAYER.DOTA_TEAM_ID
WHERE DOTA_PLAYER.DOTA_PLAYER_IS_COACH

/* #19 Select the team(s) with the most match wins */
SELECT DOTA_TEAM.*, TEAM_MATCH_WINS.MATCH_WINS FROM (SELECT DOTA_TEAM_ID, COUNT(DOTA_TEAM_ID) AS MATCH_WINS FROM DOTA_MATCH
GROUP BY (DOTA_TEAM_ID)) AS TEAM_MATCH_WINS
JOIN DOTA_TEAM ON DOTA_TEAM.DOTA_TEAM_ID = TEAM_MATCH_WINS.DOTA_TEAM_ID
WHERE TEAM_MATCH_WINS.MATCH_WINS = (SELECT MAX(MATCH_WINS) MATCH_WINS FROM (SELECT DOTA_TEAM_ID, COUNT(DOTA_TEAM_ID) AS MATCH_WINS FROM DOTA_MATCH
GROUP BY (DOTA_TEAM_ID)) AS TEAM_MATCH_WINS)

/* #20 Select the team(s) with the least match wins */
SELECT DOTA_TEAM.*, TEAM_MATCH_WINS.MATCH_WINS FROM (SELECT DOTA_TEAM_ID, COUNT(DOTA_TEAM_ID) AS MATCH_WINS FROM DOTA_MATCH
GROUP BY (DOTA_TEAM_ID)) AS TEAM_MATCH_WINS
JOIN DOTA_TEAM ON DOTA_TEAM.DOTA_TEAM_ID = TEAM_MATCH_WINS.DOTA_TEAM_ID
WHERE TEAM_MATCH_WINS.MATCH_WINS = (SELECT MIN(MATCH_WINS) MATCH_WINS FROM (SELECT DOTA_TEAM_ID, COUNT(DOTA_TEAM_ID) AS MATCH_WINS FROM DOTA_MATCH
GROUP BY (DOTA_TEAM_ID)) AS TEAM_MATCH_WINS)