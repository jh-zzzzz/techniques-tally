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
    ('Basketball', 0, 'Crossover');

INSERT INTO occurrences
    (id, date, athlete, game, timestamp, created_at, technique_id)
VALUES
    ('093675fb-8516-49f4-a8ee-544bfd9f0809', '2011-01-01', 'Messi', 'Barca vs. Real Madrid', '56''', '2024-03-14 17:55:26.265', 1),
    ('e9be6ef4-ba06-4620-9151-bbeb41c16177', '2012-06-01', 'Ronaldo', 'Barca vs. Real Madrid', '40''', '2024-03-14 17:55:26.265', 1);