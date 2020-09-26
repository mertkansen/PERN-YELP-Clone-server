create database yelpdb

-- Restaurant TABLE
create table restaurants (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(50) NOT NULL,
	price_range INT NOT NULL CHECK(price_range >= 1 and price_range <= 5)
);

alter table products ADD COLUMN featured boolean;

alter table products DROP COLUMN featured;

drop table products;

drop database yelpdb;

insert into restaurants (name, location, price_range) values 
('deneme', 'TR', 2),('deneme1', 'TR', 3),('deneme3', 'TR', 4);

select * from products;

select * from restaurants order by id asc

-- Reviews TABLE

CREATE TABLE reviews (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
	name VARCHAR(50) NOT NULL,
	review TEXT NOT NULL,
	rating INT NOT NULL CHECK (rating >= 1 and rating <= 5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (7, 'mertkan', 'that one was good', 4);

DELETE from reviews where restaurant_id = 14;


-- AGGREGATE Functions

select * from restaurants;
select count(*) from restaurants; -- 6
select min(price_range) from restaurants; -- 2

select * from reviews;
select count(*) from reviews; --27
select max(rating) from reviews;
select avg(rating) from reviews; -- 2.8620689655172414
select trunc(avg(rating), 1) as average_review from reviews; -- 2.8

select name as username, rating as restaurant_rating from reviews;

-- all of the avg rating for restaurant 2
select trunc(avg(rating), 1) from reviews where restaurant_id = 15;
select trunc(avg(rating), 1) as average_rating from reviews where restaurant_id = 15;

-- total number of reviews
select count(rating) from reviews where restaurant_id = 15;

-- Group some data together
select location, count(location) from restaurants group by location;

-- getting review counts for rest with their id's
select restaurant_id, count(restaurant_id) from reviews group by restaurant_id;

-- getting avg rating for every restaurant with rating count
select restaurant_id, trunc(avg(rating), 1) as avg_rating, count(rating) from reviews group by restaurant_id;


-- JOIN Ex

-- inner join
select * from restaurants inner join reviews on restaurants.id = reviews.restaurant_id;

-- left join
-- this one returned every restaurant (because its on the left side), even if they dont have any reviews.
select * from restaurants left join reviews on restaurants.id = reviews.restaurant_id;

-- right join

select * from restaurants right join reviews on restaurants.id = reviews.restaurant_id;

 -- output: all the restaurants with how many reviews there were for every one and avg rating of those reviews
select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;


-- one above but for a specific restaurant with id
select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = 15;

