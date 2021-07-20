-- OWNERS ONLY WHO HAVE ACTIVE MEMBERSHIP
select * from users where type ='O' and active_membership='t';

-- WALKERS ONLY THAT ARE ACTIVE MEMBERSHIP
select * from users where type ='W' and active_membership='t';

-- NEED TO CATER FOR DISTANCE BASED QUERIES (Require API for postcode distance calculator). 

-- SELECT OPEN BOOKINGS
select * from bookings where booking_status = 'O';

-- SELECT ASSIGNED BOOKINGS
select * from bookings where booking_status = 'A';

-- SELECT FINISHED BOOKINGS
select * from bookings where booking_status = 'F';

-- UPDATE AN OPEN BOOKING REQUIRES BOOKING STATUS TO BE UPDATED AND USER ID TO BE UPDATED

-- NEED TO ESTABLISH QUERIES THAT AGGREGATE THE SERVICE FEES ETC