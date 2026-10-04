DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user;

CREATE TABLE user(
    id INT PRIMARY KEY,
    name VARCHAR(10),
    email VARCHAR(254),
    followers INT DEFAULT 20,
    following INT
);

INSERT INTO user(id, name, email, following)
VALUES
(1,'Adam','adam@yahoo.in',145);

INSERT INTO user
VALUES
(2,'bob','bob112@yahoo.in',200,200),
(3,'casey','casey444@yahoo.in',300,306),
(4,'david','david123@yahoo.in',DEFAULT,450),
(5,'eva','eva456@yahoo.in',DEFAULT,520),
(6,'frank','frank789@yahoo.in',150,180);

ALTER TABLE user
ADD COLUMN age INT DEFAULT 18;

SELECT name, email
FROM user
WHERE age + 1 = 19;

CREATE TABLE post(
    id INT PRIMARY KEY,
    content VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

select name ,age, followers
from user
where name IN ('bob','frank','Aryan');

SELECT name , age,followers  
FROM user
order by followers asc; 

create Table student(
	name varchar(20),
    rollNo int,
    marks int
);

insert into student
values
('Aryan',67,85),
('Arpit',59,85),
('Ashish',68,89);
SET SQL_SAFE_UPDATES = 0;
DELETE FROM student;


insert into student
values
('Aryan',67,85),
('Arpit',59,85),
('Ashish',68,89);

select marks, count(marks)
from student
group by marks;

SET SQL_SAFE_UPDATES = 0;
update student
set marks = 100
where rollNo = 67;

SELECT * FROM STUDENT;
delete FROM STUDENT
WHERE MARKS = 89;

truncate table STUDENT;
