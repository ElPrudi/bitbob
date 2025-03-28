# More Bit Tricks

This file holds a plethora of bit tricks that are too specific for a function. Most of them can be up to double as fast as normal multiplication or division of integers.

## Faster multiplication

| Times x     |  Algorithm                           |
|-------------|--------------------------------------|
| 2           | `x << 1`                             |
| 3           | `(x << 1) + x`                       |
| 4           | `x << 2`                             |
| 5           | `(x << 2) + x`                       |
| 6           | `(x << 2) + (x << 1)`                |
| 7           | `(x << 2) + (x << 1) + x`            |
| 8           | `x << 3`                             |
| 9           | `(x << 3) + x`                       |
| 10          | `(x << 3) + (x << 1)`                |
| 11          | `(x << 3) + (x << 1) + x`            |
| 12          | `(x << 3) + (x << 2)`                |
| 13          | `(x << 3) + (x << 2) + x`            |
| 14          | `(x << 3) + (x << 2) + (x << 1)`     |
| 15          | `(x << 3) + (x << 2) + (x << 1) + x` |
| 16          | `x << 4`                             |
| 17          | `(x << 4) + x`                       |
| 18          | `(x << 4) + (x << 1)`                |
| 19          | `(x << 4) + (x << 1) + x`            |
| 20          | `(x << 4) + (x << 2)`                |
| 21          | `(x << 4) + (x << 2) + x`            |
| 22          | `(x << 4) + (x << 2) + (x << 1)`     |
| 23          | `(x << 4) + (x << 2) + (x << 1) + x` |
| 24          | `(x << 4) + (x << 3)`                |
| 25          | `(x << 4) + (x << 3) + x`        |
| 26          | `(x << 4) + (x << 3) + (x << 1)` |
| 27          | `(x << 4) + (x << 3) + (x << 1) + x` |
| 28          | `(x << 4) + (x << 3) + (x << 2)` |
| 29          | `(x << 4) + (x << 3) + (x << 2) + x` |
| 30          | `(x << 4) + (x << 3) + (x << 2) + (x << 1)` |
| 31          | `(x << 4) + (x << 3) + (x << 2) + (x << 1) + x` |
| 32          | `x << 5`                         |
| 33          | `(x << 5) + x`                   |
| 34          | `(x << 5) + (x << 1)`            |
| 35          | `(x << 5) + (x << 1) + x`        |
| 36          | `(x << 5) + (x << 2)`            |
| 37          | `(x << 5) + (x << 2) + x`        |
| 38          | `(x << 5) + (x << 2) + (x << 1)` |
| 39          | `(x << 5) + (x << 2) + (x << 1) + x` |
| 40          | `(x << 5) + (x << 3)`            |
| 41          | `(x << 5) + (x << 3) + x`        |
| 42          | `(x << 5) + (x << 3) + (x << 1)` |
| 43          | `(x << 5) + (x << 3) + (x << 1) + x` |
| 44          | `(x << 5) + (x << 3) + (x << 2)` |
| 45          | `(x << 5) + (x << 3) + (x << 2) + x` |
| 46          | `(x << 5) + (x << 3) + (x << 2) + (x << 1)` |
| 47          | `(x << 5) + (x << 3) + (x << 2) + (x << 1) + x` |
| 48          | `(x << 5) + (x << 4)`            |
| 49          | `(x << 5) + (x << 4) + x`        |
| 50          | `(x << 5) + (x << 4) + (x << 1)` |
| 51          | `(x << 5) + (x << 4) + (x << 1) + x` |
| 52          | `(x << 5) + (x << 4) + (x << 2)` |
| 53          | `(x << 5) + (x << 4) + (x << 2) + x` |
| 54          | `(x << 5) + (x << 4) + (x << 2) + (x << 1)` |
| 55          | `(x << 5) + (x << 4) + (x << 2) + (x << 1) + x` |
| 56          | `(x << 5) + (x << 4) + (x << 3)` |
| 57          | `(x << 5) + (x << 4) + (x << 3) + x` |
| 58          | `(x << 5) + (x << 4) + (x << 3) + (x << 1)` |
| 59          | `(x << 5) + (x << 4) + (x << 3) + (x << 1) + x` |
| 60          | `(x << 5) + (x << 4) + (x << 3) + (x << 2)` |
| 61          | `(x << 5) + (x << 4) + (x << 3) + (x << 2) + x` |
| 62          | `(x << 5) + (x << 4) + (x << 3) + (x << 2) + (x << 1)` |
| 63          | `(x << 5) + (x << 4) + (x << 3) + (x << 2) + (x << 1) + x` |
| 64          | `x << 6`                         |
| 65          | `(x << 6) + x`                   |
| 66          | `(x << 6) + (x << 1)`            |
| 67          | `(x << 6) + (x << 1) + x`        |
| 68          | `(x << 6) + (x << 2)`            |
| 69          | `(x << 6) + (x << 2) + x`        |
| 70          | `(x << 6) + (x << 2) + (x << 1)` |
| 71          | `(x << 6) + (x << 2) + (x << 1) + x` |
| 72          | `(x << 6) + (x << 3)`            |
| 73          | `(x << 6) + (x << 3) + x`        |
| 74          | `(x << 6) + (x << 3) + (x << 1)` |
| 75          | `(x << 6) + (x << 3) + (x << 1) + x` |
| 76          | `(x << 6) + (x << 3) + (x << 2)` |
| 77          | `(x << 6) + (x << 3) + (x << 2) + x` |
| 78          | `(x << 6) + (x << 3) + (x << 2) + (x << 1)` |
| 79          | `(x << 6) + (x << 3) + (x << 2) + (x << 1) + x` |
| 80          | `(x << 6) + (x << 4)`            |
| 81          | `(x << 6) + (x << 4) + x`        |
| 82          | `(x << 6) + (x << 4) + (x << 1)` |
| 83          | `(x << 6) + (x << 4) + (x << 1) + x` |
| 84          | `(x << 6) + (x << 4) + (x << 2)` |
| 85          | `(x << 6) + (x << 4) + (x << 2) + x` |
| 86          | `(x << 6) + (x << 4) + (x << 2) + (x << 1)` |
| 87          | `(x << 6) + (x << 4) + (x << 2) + (x << 1) + x` |
| 88          | `(x << 6) + (x << 4) + (x << 3)` |
| 89          | `(x << 6) + (x << 4) + (x << 3) + x` |
| 90          | `(x << 6) + (x << 4) + (x << 3) + (x << 1)` |
| 91          | `(x << 6) + (x << 4) + (x << 3) + (x << 1) + x` |
| 92          | `(x << 6) + (x << 4) + (x << 3) + (x << 2)` |
| 93          | `(x << 6) + (x << 4) + (x << 3) + (x << 2) + x` |
| 94          | `(x << 6) + (x << 4) + (x << 3) + (x << 2) + (x << 1)` |
| 95          | `(x << 6) + (x << 4) + (x << 3) + (x << 2) + (x << 1) + x` |
| 96          | `(x << 6) + (x << 5)`            |
| 97          | `(x << 6) + (x << 5) + x`        |
| 98          | `(x << 6) + (x << 5) + (x << 1)` |
| 99          | `(x << 6) + (x << 5) + (x << 1) + x` |
| 100         | `(x << 6) + (x << 5) + (x << 2)` |
| 128         | `x << 7` |
| 129         | `(x << 7) + x` |
| 256         | `x << 8` |
| 257         | `(x << 7) + x` |
| 512         | `x << 9` |
| 513         | `(x << 9) + x` |
| 1024        | `x << 10` |
| 1025        | `(x << 10) + x` |
...

## Faster division

Note: There are no algorithms to divide by arbitrary numbers (AFAIK).

| `/ x`       |  Algorithm                           |
|-------------|--------------------------------------|
| 2           | `x >> 1`                             |
| 4           | `x >> 2`                             |
| 4           | `x >> 3`                             |
| 16          | `x >> 4`                             |
| 32          | `x >> 5`                             |
...

## Math alternatives

| Math              |  Algorithm                           |
|-------------------|--------------------------------------|
| `Math.trunc`      | `x \| 0`                             |


## Misc

| Math              |  Algorithm                           |
|-------------------|--------------------------------------|
| `% x`             | `& (x - 1)`                          |

- Getting the fraction of a number: `x - (x \| 0)`
