# OurFitness

OurFitness is the place that can help you reminder your workout. We allow
users to set goals to see their progress.

## To run the frontend and backend in developing mode

cd to backend and frontend then run.
Frontend -> ourfitnessweb/frontend
Backtend -> ourfitnessweb/backend

```
    npm run dev
```

### All of the responses will be wrapped with this data before sending

| Parameter |  Type   | Description              |
| --------- | :-----: | :----------------------- |
| success   | boolean | the status of request    |
| msg       | string  | message for each request |
| data      |  JSON   | the actual data          |

## API endpoints

### Login

URL

`POST /auth/LoginForm`
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `email` | `string` | email address |
| `password` | `string` | password must be at least 8 characters with uppercase letter, lowercase letter and number. |

Example

```
   {
     "usernameOrEmail" : "tartartar",
     "password" : "123"
   }

```
