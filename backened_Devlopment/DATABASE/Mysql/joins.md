# SQL Joins — Notes

## Sample Tables

**Customers**

| id | name    |
|----|---------|
| 1  | Alice   |
| 2  | Bob     |
| 3  | Charlie |

**Orders**

| id | customer_id | item     |
|----|-------------|----------|
| 1  | 1           | Laptop   |
| 2  | 1           | Mouse    |
| 3  | 2           | Keyboard |
| 4  | 5           | Monitor  |

> Note: Charlie (id 3) has no orders. The order with `customer_id = 5` has no matching customer.

---

## 1. INNER JOIN
Returns only rows that match in **both** tables.

```sql
SELECT c.name, o.item
FROM Customers c
INNER JOIN Orders o ON c.id = o.customer_id;
```

**Result:**

| name  | item     |
|-------|----------|
| Alice | Laptop   |
| Alice | Mouse    |
| Bob   | Keyboard |

Charlie is dropped (no orders); the orphan order (customer_id 5) is dropped too.

---

## 2. LEFT JOIN (LEFT OUTER JOIN)
Returns **all rows from the left table**, plus matches from the right. Unmatched right side = `NULL`.

```sql
SELECT c.name, o.item
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customer_id;
```

**Result:**

| name    | item     |
|---------|----------|
| Alice   | Laptop   |
| Alice   | Mouse    |
| Bob     | Keyboard |
| Charlie | NULL     |

Charlie now shows up, with `NULL` since he has no orders.

---

## 3. RIGHT JOIN (RIGHT OUTER JOIN)
Opposite of LEFT — **all rows from the right table**, plus matches from the left.

```sql
SELECT c.name, o.item
FROM Customers c
RIGHT JOIN Orders o ON c.id = o.customer_id;
```

**Result:**

| name  | item     |
|-------|----------|
| Alice | Laptop   |
| Alice | Mouse    |
| Bob   | Keyboard |
| NULL  | Monitor  |

The orphan order (customer_id 5) shows up, with `NULL` for name since no customer matches.

---

## 4. FULL JOIN (FULL OUTER JOIN)
Returns **everything from both tables** — matched where possible, `NULL` where not.

```sql
SELECT c.name, o.item
FROM Customers c
FULL JOIN Orders o ON c.id = o.customer_id;
```

**Result:**

| name    | item     |
|---------|----------|
| Alice   | Laptop   |
| Alice   | Mouse    |
| Bob     | Keyboard |
| Charlie | NULL     |
| NULL    | Monitor  |

Both the unmatched customer and the unmatched order show up.

---

## 5. CROSS JOIN
No matching condition — every row from left is paired with **every** row from right (Cartesian product).

```sql
SELECT c.name, o.item
FROM Customers c
CROSS JOIN Orders o;
```

With 3 customers × 4 orders → **12 rows**, every possible combination, matched or not.

---

## 6. SELF JOIN
Not a different keyword — just a table joined to itself. Example: find customers sharing the same name (imagine a duplicate "Alice" with id 4).

```sql
SELECT a.name, b.name
FROM Customers a
JOIN Customers b ON a.name = b.name AND a.id <> b.id;
```

Useful for hierarchical or same-table comparisons (e.g. employees and their managers, both stored in one table).

---

## Quick Mental Model

| Join      | What it returns                          |
|-----------|-------------------------------------------|
| INNER     | Intersection only (matches in both)        |
| LEFT      | Everything on the left + matches           |
| RIGHT     | Everything on the right + matches          |
| FULL      | Everything from both                       |
| CROSS     | Every combination, no condition            |
| SELF      | A table matched against itself             |