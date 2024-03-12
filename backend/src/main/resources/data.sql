INSERT INTO sports (name)
VALUES
    ('Football'),
    ('BJJ'),
    ('Basketball');

INSERT INTO techniques (sport_id, total_number_of_occurrences, name)
VALUES
    (1, 0, 'Step over'), -- football
    (1, 0, 'Nutmeg'),
    (2, 0, 'Bow and arrow choke'), -- bjj
    (3, 0, 'Cross over'); -- basketball