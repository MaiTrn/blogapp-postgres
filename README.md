#To connect to the database
heroku run psql -h <host-of-postgres-addon> -p 5432 -U <username> <dbname> -a <app-name>
Format of the databse connect string: postgres://<username>:<password>@ec2-54-83-137-206.compute-1.amazonaws.com:5432/<databasename>
