INSERT INTO sports
    (name)
VALUES
    ('Football'),
    ('BJJ'),
    ('Basketball'),
    ('Hockey');

INSERT INTO techniques
    (sport_key, total_number_of_occurrences, name)
VALUES
    ('Football', 2, 'Step over'),
    ('Football', 0, 'Nutmeg'),
    ('BJJ', 0, 'Bow and arrow choke'),
    ('Basketball', 0, 'Cross over');

INSERT INTO occurrences
    (date, athlete, game, timestamp, technique_id)
VALUES
    ('2011', 'Messi', 'Barca vs. Real Madrid', '56''', 1),
    ('2012', 'Ronaldo', 'Barca vs. Real Madrid', '40''', 1);