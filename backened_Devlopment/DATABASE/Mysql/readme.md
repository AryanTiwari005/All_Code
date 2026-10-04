# MySQL Notes — Complete Beginner's Reference

A clean, corrected, and expanded reference for common MySQL commands, using one consistent sample table: `students`.

---

## 1. Working with Databases

### Show all databases
Lists every database available on your SQL server.
```sql
SHOW DATABASES;
```

### Create a new database
```sql
CREATE DATABASE school;
```

### Select (use) a database
Tells SQL which database you want to work inside. You must do this before creating or using tables.
```sql
USE school;
```

### Show all tables in a database
Once you're inside a database (after `USE`), this lists all its tables.
```sql
SHOW TABLES;
```

### Delete a database
```sql
DROP DATABASE school;
```

---

## 2. Working with Tables

### Create a new table
You define the table name, then list each column with its data type and any rules (constraints).

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    grade VARCHAR(10)
);
```
**Explanation:**
- `id INT PRIMARY KEY` → a whole number column that uniquely identifies each row.
- `name VARCHAR(50)` → text, max 50 characters.
- `age INT` → whole number.
- `grade VARCHAR(10)` → short text.

### Describe a table
Shows the structure (columns, data types, constraints) of a table.
```sql
DESCRIBE students;
-- or
DESC students;
```

### Delete a table completely (structure + data)
```sql
DROP TABLE students;
```

### Empty a table but keep its structure
```sql
TRUNCATE TABLE students;
```

---

## 3. ALTER — Changing a Table's Structure

`ALTER TABLE` modifies an existing table (add/remove/rename/change columns).

### Add a new column
```sql
ALTER TABLE students ADD COLUMN city VARCHAR(50);
```

### Drop (remove) a column
```sql
ALTER TABLE students DROP COLUMN city;
```

### Change a column's data type (keep the same name)
```sql
ALTER TABLE students MODIFY COLUMN age SMALLINT;
```

### Rename a column *and* optionally change its type
`CHANGE` requires **both** the old column name and the new column name (this was missing in the earlier notes).
```sql
ALTER TABLE students CHANGE age student_age INT;
```

### Rename the whole table
```sql
ALTER TABLE students RENAME TO learners;
```

> 📝 **MODIFY vs CHANGE:** `MODIFY` changes the datatype/constraints only. `CHANGE` can rename the column *and* change its datatype — you must always give the old name and new name with `CHANGE`.

---

## 4. Inserting Data

```sql
INSERT INTO students (id, name, age, grade)
VALUES (1, 'Riya', 16, 'A');
```
This adds a student named Riya, age 16, with grade A.

### Insert multiple rows at once
```sql
INSERT INTO students (id, name, age, grade) VALUES
(2, 'Rahul', 17, 'B'),
(3, 'Raj', 16, 'A'),
(4, 'Meena', 18, 'B'),
(5, 'Aman', 17, 'A');
```

---

## 5. Reading (Selecting) Data

**Sample data used from here on:**

| id | name  | age | grade |
|----|-------|-----|-------|
| 1  | Riya  | 16  | A     |
| 2  | Rahul | 17  | B     |
| 3  | Raj   | 16  | A     |
| 4  | Meena | 18  | B     |
| 5  | Aman  | 17  | A     |

### Select everything
```sql
SELECT * FROM students;
```

### Select specific columns
```sql
SELECT name, age FROM students;
```

### Alias — give a column a readable name
The correct syntax puts the alias in the `SELECT` list, not after `FROM` (corrected from the earlier notes).
```sql
SELECT name AS student_name, age AS student_age
FROM students;
```

### Filter rows (WHERE)
```sql
SELECT * FROM students WHERE age = 16;
```

### Pattern matching (LIKE)
`%` = any number of characters, `_` = exactly one character.
```sql
SELECT * FROM students WHERE name LIKE 'R%';   -- starts with R
SELECT * FROM students WHERE name LIKE '%a';   -- ends with a
SELECT * FROM students WHERE name LIKE '_iya'; -- 4 letters, ends in "iya"
```

### Unique values (DISTINCT)
Removes duplicate values from the result.
```sql
SELECT DISTINCT grade FROM students;
```

---

## 6. ORDER BY — Sorting Results

`ORDER BY` always runs **near the end** of a query — after filtering and grouping.

### Sort ascending (default)
```sql
SELECT * FROM students ORDER BY age;
```
Smallest to largest.

### Sort descending
```sql
SELECT * FROM students ORDER BY age DESC;
```
Largest to smallest.

### Sort by multiple columns
Sorts by the first column, then uses the second to break ties.
```sql
SELECT * FROM students ORDER BY grade ASC, age DESC;
```
Groups students by grade (A→Z), and within the same grade, oldest first.

### Sort by column position
```sql
SELECT name, age FROM students ORDER BY 2 DESC;
```
`2` means the 2nd selected column (`age`).

### Sort by an alias or expression
```sql
SELECT name, age, age*12 AS age_in_months
FROM students
ORDER BY age_in_months DESC;
```

### Limit sorted results (top N)
```sql
SELECT * FROM students ORDER BY age DESC LIMIT 3;
```
Top 3 oldest students.

---

## 7. GROUP BY — Grouping Data

`GROUP BY` collapses rows that share the same value into a single summary row, usually paired with an **aggregate function** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).

> ⚠️ **Correction:** `GROUP BY` cannot be written on its own like `GROUP BY column_name FROM table_name;` — it must follow a `SELECT ... FROM ...` statement, and every non-aggregated column you `SELECT` must appear in the `GROUP BY` list.

### Basic GROUP BY with COUNT
```sql
SELECT age, COUNT(*) AS total_students
FROM students
GROUP BY age;
```
Result:
| age | total_students |
|-----|-----------------|
| 16  | 2               |
| 17  | 2               |
| 18  | 1               |

*(This matches the intent of the original example — counting how many students share each age.)*

### GROUP BY with SUM
```sql
SELECT grade, SUM(age) AS total_age
FROM students
GROUP BY grade;
```

### GROUP BY with AVG
```sql
SELECT grade, AVG(age) AS average_age
FROM students
GROUP BY grade;
```

### GROUP BY with MIN and MAX
```sql
SELECT grade, MIN(age) AS youngest, MAX(age) AS oldest
FROM students
GROUP BY grade;
```

### GROUP BY multiple columns
```sql
SELECT grade, age, COUNT(*) AS total
FROM students
GROUP BY grade, age;
```
Groups by every unique combination of grade **and** age.

### GROUP BY + ORDER BY together
```sql
SELECT grade, COUNT(*) AS total_students
FROM students
GROUP BY grade
ORDER BY total_students DESC;
```
Grades ranked by how many students are in them, most first.

---

## 8. HAVING — Filtering Groups

`HAVING` is used to filter results **after** `GROUP BY` has already grouped and aggregated the data. It's the "WHERE clause for groups."

> 📝 **Key difference:**
> - `WHERE` filters **individual rows**, **before** grouping happens. It cannot use aggregate functions like `COUNT()`, `SUM()`, `AVG()`.
> - `HAVING` filters **groups**, **after** grouping/aggregation happens. It's built specifically to work with aggregate functions.

### Basic HAVING example
```sql
SELECT grade, COUNT(*) AS total_students
FROM students
GROUP BY grade
HAVING COUNT(*) > 1;
```
Groups students by grade, then keeps only the grades that have **more than 1 student**.

Result (using our sample data):
| grade | total_students |
|-------|-----------------|
| A     | 3               |
| B     | 2               |

*(Grades with only 1 student would be dropped from this result.)*

### HAVING with AVG
```sql
SELECT grade, AVG(age) AS average_age
FROM students
GROUP BY grade
HAVING AVG(age) > 16;
```
Only shows grades where the average student age is above 16.

### HAVING with SUM
```sql
SELECT grade, SUM(age) AS total_age
FROM students
GROUP BY grade
HAVING SUM(age) >= 30;
```
Only shows grades where the combined age of all students in that group is 30 or more.

### HAVING with multiple conditions
```sql
SELECT grade, COUNT(*) AS total_students, AVG(age) AS average_age
FROM students
GROUP BY grade
HAVING COUNT(*) >= 2 AND AVG(age) > 16;
```
Keeps only groups that satisfy **both** conditions.

### WHERE + GROUP BY + HAVING together
```sql
SELECT grade, COUNT(*) AS total_students
FROM students
WHERE age >= 16
GROUP BY grade
HAVING COUNT(*) >= 2;
```
Step by step: filter students aged 16+ first (`WHERE`), then group by grade (`GROUP BY`), then keep only grades with 2 or more students in that filtered group (`HAVING`).

### HAVING + ORDER BY together
```sql
SELECT grade, COUNT(*) AS total_students
FROM students
GROUP BY grade
HAVING COUNT(*) > 1
ORDER BY total_students DESC;
```
Filters groups with `HAVING`, then sorts the remaining groups by student count, highest first.

> ⚠️ **Common mistake:** Writing `WHERE COUNT(*) > 1` — this will throw an error. Aggregate functions can only be filtered using `HAVING`, never `WHERE`.

---

## 9. Updating Data

```sql
UPDATE students
SET grade = 'A+'
WHERE id = 1;
```
Updates only Riya's (`id = 1`) grade to "A+".

> ⚠️ If you forget `WHERE`, **every row** gets updated.

---

## 10. Deleting Data

### Delete specific rows
```sql
DELETE FROM students WHERE id = 1;
```

### Delete all rows but keep the table
```sql
DELETE FROM students;
```
*(Corrected: it's `DELETE FROM table_name;`, not `DELETE FROM TABLE table_name;` — `TABLE` is not part of the correct syntax here.)*

### Delete with ORDER BY and LIMIT (MySQL-specific)
Useful when you want to delete only a certain number of matching rows, in a specific order — e.g., delete the 2 youngest students.
```sql
DELETE FROM students
WHERE grade = 'B'
ORDER BY age ASC
LIMIT 2;
```

> ⚠️ Always double-check your `WHERE` clause before running `DELETE` — there's no undo without a backup.

---

## 11. Execution Order (important to memorize)

MySQL doesn't run your query top-to-bottom the way you type it. The actual logical order is:

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

This is why:
- You **can't** use a `SELECT` alias inside `WHERE`, but you often **can** use it in `ORDER BY`.
- `WHERE` can't use aggregate functions (`COUNT`, `SUM`, etc.) — use `HAVING` instead.

---

## Quick Reference Table

| Command | Purpose |
|---|---|
| `SHOW DATABASES;` | List all databases |
| `CREATE DATABASE db_name;` | Create a new database |
| `USE db_name;` | Select a database to work in |
| `SHOW TABLES;` | List all tables in the current database |
| `DROP DATABASE db_name;` | Delete a database |
| `CREATE TABLE table_name (...);` | Create a new table |
| `DESCRIBE table_name;` | Show a table's structure |
| `DROP TABLE table_name;` | Delete a table and its data |
| `TRUNCATE TABLE table_name;` | Delete all rows, keep table structure |
| `ALTER TABLE table_name ADD column_name datatype;` | Add a new column |
| `ALTER TABLE table_name DROP COLUMN column_name;` | Remove a column |
| `ALTER TABLE table_name MODIFY COLUMN column_name datatype;` | Change a column's datatype (same name) |
| `ALTER TABLE table_name CHANGE old_name new_name datatype;` | Rename a column and/or change its datatype |
| `INSERT INTO table_name (...) VALUES (...);` | Add a new row |
| `SELECT * FROM table_name;` | Get all data |
| `SELECT col1, col2 FROM table_name;` | Get specific columns |
| `SELECT col AS alias FROM table_name;` | Add a human-readable alias |
| `SELECT DISTINCT column_name FROM table_name;` | Get unique values from a column |
| `SELECT * FROM table_name WHERE condition;` | Get filtered rows |
| `SELECT * FROM table_name WHERE col LIKE 'pattern';` | Get rows matching a pattern |
| `SELECT * FROM table_name ORDER BY col;` | Sort ascending (default) |
| `SELECT * FROM table_name ORDER BY col DESC;` | Sort descending |
| `SELECT col, COUNT(*) FROM table_name GROUP BY col;` | Group rows and aggregate |
| `SELECT col, COUNT(*) FROM table_name GROUP BY col HAVING condition;` | Filter groups **after** aggregation (e.g. `HAVING COUNT(*) > 1`) |
| `UPDATE table_name SET col = value WHERE condition;` | Update matching rows |
| `DELETE FROM table_name WHERE condition;` | Delete matching rows |
| `DELETE FROM table_name;` | Delete all rows, keep table structure |
| `DELETE FROM table_name WHERE condition ORDER BY col LIMIT n;` | Delete a limited number of matching rows |

---

### Common mistakes to avoid (from the original notes)
1. ❌ `DELETE FROM TABLE table_name;` → ✅ `DELETE FROM table_name;` (no `TABLE` keyword here)
2. ❌ `ALTER TABLE table_name change column_name datatype;` → ✅ `CHANGE` needs **both** old and new column names: `CHANGE old_name new_name datatype;`
3. ❌ `SELECT col AS alias FROM table;` written as `... AS alias from table` after the column with no `SELECT` shown → alias belongs right after the column name in the `SELECT` list.
4. ❌ `GROUP BY column_name FROM table_name;` on its own → ✅ must be part of a full `SELECT ... FROM ... GROUP BY ...` statement.
5. ❌ Using `COUNT()`/`SUM()` inside `WHERE` → ✅ use `HAVING` for conditions on aggregated/grouped data.